from flask import Flask, request, render_template, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import re
from sys import argv

# Check for command-line arguments
if len(sys.argv) != 3:
    print('Usage: python dashapp.py <db_username> <db_password> <db_name>')
    sys.exit(1)

db_username = sys.argv[1]
db_password = sys.argv[2]
db_name = "'dothething"
db_host = 'localhost'

app = Flask(__name__)

# Connect to alx_flask_db
path = 'mysql://{}:{}@localhost/{}'.format(sys.argv[1], sys.argv[2], db_name)
app.config['SQLALCHEMY_DATABASE_URI'] = path

db = SQLAlchemy(app)

class Category():
    ''' creating a class for all categories '''
    id = db.Column(Integer, primary_key=True, auto_increment=True)
    name = db.Column(String(128))
    colour = db.Column(String(128), unique=True, nullable=False)
    user_id = User_id
    
# Create the database tables
def create_tables():
    with app.app_context():
        db.create_all()
        
# This calls the function to create tables
create_tables(Category())

@app.route('/')
def home():
    # Render the dashboard HTML template
    return render_template('dashboard.html')

@app.route('/search', methods=['GET'])
def search():
    # Retrieve search results from the database
    data = request.get_json()
    cursor.execute("SELECT * FROM tasks WHERE like %s_%s = {data}")
    searchResults = cursor.fetchall()
    return jsonify(searchResults)
    

@app.route('/tasks', methods=['GET'])
def get_tasks():
    # Retrieve tasks from the database
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def create_task():
    # Create a new task
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    # Insert the new task into the database
    cursor.execute("INSERT INTO tasks (title, description) VALUES (%s, %s)", (title, description))
    db.commit()
    return jsonify({"message": "Task created successfully"})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    # Update an existing task
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    # Update the task in the database
    cursor.execute("UPDATE tasks SET title=%s, description=%s WHERE id=%s", (title, description, id))
    db.commit()
    return jsonify({"message": "Task updated successfully"})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Delete a task
    # Delete the task from the database
    cursor.execute("DELETE FROM tasks WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Task deleted successfully"})

# Close the cursor and database connection when the application exits
@app.teardown_appcontext
def close_db_connection(exception=None):
    cursor.close()
    db.close()

if __name__ == '__main__':
    app.run(debug=True)
