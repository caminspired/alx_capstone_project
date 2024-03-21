from flask import Flask, request, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

# Check for command-line arguments
if len(sys.argv) != 3:
    print('Usage: python dashapp.py <db_username> <db_password> <db_name>')
    sys.exit(1)
    
db_username = sys.argv[1]
db_password = sys.argv[2]
db_name = 'dothething'
db_host = 'localhost'


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
db = SQLAlchemy(app)

# Define SQLAlchemy models
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    description = db.Column(db.String(255))
    user_id = db.Column(db.Integer)
    start_date = db.Column(db.String(128), nullable=False)  
    end_date = db.Column(db.String(128), nullable=False)  
    start_time = db.Column(db.String(128), nullable=False)  
    end_time = db.Column(db.String(128), nullable=False)
    category = db.Column(db.String(128), nullable=False)
    priority = db.Column(db.String(128), nullable=False)
    notification_date = db.Column(db.String(128))
    notification_time = db.Column(db.String(128))

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    colour = db.Column(db.String(128), nullable=False)
    user_id = db.Column(db.Integer)

# Create database tables
db.create_all()

@app.route('/')
def home():
    # Render the dashboard HTML template
    return render_template('dashboard.html')

@app.route('/search', methods=['GET'])
def search():
    # Implement search functionality here
    # Retrieve search query from request parameters
    search_query = request.args.get('query')

    # Perform search logic (e.g., query database)
    # Replace this with your actual search logic
    search_results = perform_search(search_query)

    # Return search results in JSON format
    return jsonify(search_results)

@app.route('/tasks', methods=['POST'])
def create_task():
    # Create a new task
    data = request.get_json()
    new_task = Task(**data)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully"})

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    # Update an existing task
    task = Task.query.get(id)
    if task:
        data = request.get_json()
        for key, value in data.items():
            setattr(task, key, value)
        db.session.commit()
        return jsonify({"message": "Task updated successfully"})
    else:
        return jsonify({"error": "Task not found"}), 404

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    # Delete a task
    task = Task.query.get(id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    else:
        return jsonify({"error": "Task not found"}), 404

@app.route('/categories', methods=['POST'])
def create_category():
    # Create a new category
    data = request.get_json()
    new_category = Category(**data)
    db.session.add(new_category)
    db.session.commit()
    return jsonify({"message": "Category created successfully"})

@app.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    # Update an existing category
    category = Category.query.get(id)
    if category:
        data = request.get_json()
        for key, value in data.items():
            setattr(category, key, value)
        db.session.commit()
        return jsonify({"message": "Category updated successfully"})
    else:
        return jsonify({"error": "Category not found"}), 404

@app.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    # Delete a category
    category = Category.query.get(id)
    if category:
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": "Category deleted successfully"})
    else:
        return jsonify({"error": "Category not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
