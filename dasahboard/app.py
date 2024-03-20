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

class Tasks():
    ''' creating a class for all tasks '''
    id = db.Column(Integer, primary_key=True, auto_increment=True)
    name = db.Column(String(128))
    description = db.Column(String(255))
    user_id = users_id
    start_date = db.Column(String(128), nullable=False)  
    end_date = db.Column(String(128), nullable=False)  
    start_time = db.Column(String(128), nullable=False)  
    end_time = db.Column(String(128), nullable=False)
    category = db.Column(String(128), nullable=False)
    priority = db.Column(String(128), nullable=False)

class Category():
    ''' creating a class for all categories '''
    id = db.Column(Integer, primary_key=True, auto_increment=True)
    name = db.Column(String(128))
    colour = db.Column(String(128), unique=True, nullable=False)
    user_id = User_id
    
      
def create_tables():
    with app.app_context():
        db.create_all()
        
# This calls the function to create tables
create_tables(Tasks())
create_tables(Categories())

@app.route('/')
def home():
    # Render the dashboard HTML template
    return render_template('dashboard.html')

@app.route('/search', methods=['GET'])
def search():
    # Retrieve search results from the database(check syntax validity later)
    data = request.get_json()
    cursor.execute("SELECT * FROM tasks WHERE like %s_%s = {data}")
    searchResults = cursor.fetchall()
    return jsonify(searchResults)

@app.route('/tasks', methods=['POST'])
def create_task():
    # Create a new task
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    user_id = User_id
    start_date = data.get('start-date') 
    end_date = data.get('end-date') 
    start_time = data.get('start-time') 
    end_time = data.get('end-time')
    category = data.get('category')
    priority = data.get('priority')
    # Insert the new task into the database
    cursor.execute("INSERT INTO tasks (name, description, user_id, start_date, end_date, start_time, end_time, category, priority) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (name, description, user_id, start_date, end_date, start_time, end_time, category, priority))
    db.commit()
    return jsonify({"message": "Task created successfully"})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    # Update an existing task
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    user_id = User_id
    start_date = data.get('start-date') 
    end_date = data.get('end-date') 
    start_time = data.get('start-time') 
    end_time = data.get('end-time')
    category = data.get('category')
    priority = data.get('priority')
    description = data.get('description')
    # Update the task in the database
    cursor.execute("UPDATE tasks SET name=%s, description=%s, user_id=%s, start_date=%s, end_date=%s, start_time=%s, end_time=%s, category=%s, priority=%s, WHERE id=%s", (name, description, user_id, start_date, end_date, start_time, end_time, category, priority, id))
    db.commit()
    return jsonify({"message": "Task updated successfully"})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Delete a task
    # Delete the task from the database
    cursor.execute("DELETE FROM tasks WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Task deleted successfully"})

@app.route('/total_daily_tasks', strict_slashes=False)
def total_daily_tasks():
    startDate = request.form.get('start-date')
    totalTasks = Task.query.all(Task_start-date)

@app.route('/completed_daily_tasks', strict_slashes=False)
def completed_daily_tasks():
    startDate = request.form.get('start-date')
    totalTasks = Task.query.all(Task_start-date.cpmpleted)

@app.route('/categories', methods=['POST'])
def create_category():
    # Create a new category
    data = request.get_json()
    name = data.get('name')
    colour = data.get('colour')
    
    # Insert the new category into the database
    cursor.execute("INSERT INTO categories (name, colour) VALUES (%s, %s)", (name, colour))
    db.commit()
    return jsonify({"message": "Category created successfully"})

@app.route('/categories/<int:id>', methods=['PUT'])
def update_task(id):
    # Update an existing category
    data = request.get_json()
    name = data.get('name')
    colour = data.get('colour')
    
    # Update the caytegory in the database
    cursor.execute("UPDATE categories SET name=%s, colour=%s WHERE id=%s", (name, colour, id))
    db.commit()
    return jsonify({"message": "Category updated successfully"})

@app.route('/categories/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Delete the category from the database
    cursor.execute("DELETE FROM categories WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Category deleted successfully"})


# Close the cursor and database connection when the application exits
@app.teardown_appcontext
def close_db_connection(exception=None):
    cursor.close()
    db.close()

if __name__ == '__main__':
    app.run(debug=True)
