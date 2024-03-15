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
db_name = 'dothething'
db_host = 'localhost'

app = Flask(__name__)

# Connect to alx_flask_db
path = 'mysql://{}:{}@localhost/{}'.format(sys.argv[1], sys.argv[2], db_name)
app.config['SQLALCHEMY_DATABASE_URI'] = path

db = SQLAlchemy(app)

#defining user class for creating Users table
class User():
    ''' creating a class for all users '''
    id = db.Column(Integer, primary_key=True, auto_increment=True)
    name = db.Column(String(128))
    email = db.Column(String(128), unique=True, nullable=False)
    
# Create the database tables
def create_tables():
    with app.app_context():
        db.create_all()


create_tables(User())
# This calls the function to create tables


@app.route('/', strict_slashes=False)
def index():
    return render_template('homepage.html', strict_slashes=False)

# route to handle user registration
@app.route('/signup_page', methods=['GET', 'POST'])
def add_user():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        
        new_user = User(name=name, email=email)
        db.session.add(new_user)
        
        db.session.commit()
        
        return redirect('dashboard.html')
        flash('Welcome ' + name)
            
    except Exception as e:
        flash('Error! {}'.f(e))

        
# route to handle user login
@app.route('/login', methods=['POST'], strict_slashes=False)
def login():
    # retrieve log in details and check if email and password match any user records in the database
    try:
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.one(user_name=name, user_password=password)
        
        return redirect('dashboard.html')
        flash('Welcome ' + name)
        
    except Exception as e:
        flash('Error! {}'.f(e))
        

# Close the cursor and database connection when the application exits
@app.teardown_appcontext
def close_db_connection(exception=None):
    cursor.close()
    db.close()


if __name__ == '__main__':
    app.run(debug=True)
