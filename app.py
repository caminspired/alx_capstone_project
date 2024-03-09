from flask import Flask, request, jsonify
import MySQLdb

app = Flask(__name__)

# connecting to MySQL database
# this module contains SQL scripts that handles user registrastion from dothething app signup page

# Connect to the MySQL server
db = MySQLdb.connect(
    host = "localhost",
    user = argv[1],
    passwd = argv[2],
    db = dothething,
    port=3306
)

# Create a cursor object to interact with the database
cursor = db.cursor()

# Creating the users table
cursor.execute("""CREATE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    )""")

# route to handle user registration
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

# Inserting new user data into the database
try:
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    db.commit()
    return jsonify({"message": "User registration successful"}), 201

except MySQLdb.Error as e:
    print("Error:", e)
    db.rollback()
    return jsonify({"message": "User registration failed"}), 500

# Close the cursor and connection
finally:
    cursor.close()
    db.close()
