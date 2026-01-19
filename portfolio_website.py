# Import necessary Flask components
from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

# Create a Flask application instance
# __name__ tells Flask where to look for resources like templates and static files
app = Flask(__name__)

# SECRET_KEY is used for session management and security
# In production, use environment variables instead of hardcoding
app.config['SECRET_KEY'] = 'your_secret_key_here'

# PROJECTS is a list of dictionaries containing all project information
# This data will be passed to the frontend templates and displayed on the website
# Each project has: id, title, description, technologies used, status, and image
PROJECTS = [
    # Project 1: Auto Clicker
    {
        'id': 1,
        'title': 'Auto Clicker',
        'description': 'Automated mouse clicker with randomized click speeds (1-2 seconds). Works across all applications with hotkey toggle.',
        'technologies': ['Python', 'pyautogui', 'pynput'],
        'status': 'Complete',
        'image': 'autoclicker.png'
    },
    # Project 2: Linear Regression
    {
        'id': 2,
        'title': 'Linear Regression Model',
        'description': 'Machine learning model implementing linear regression for predictive analysis on housing data.',
        'technologies': ['Python', 'scikit-learn', 'pandas', 'numpy'],
        'status': 'Complete',
        'image': 'linear_regression.png'
    },
    # Project 3: Movie Recommender
    {
        'id': 3,
        'title': 'Movie Recommender System',
        'description': 'Intelligent movie recommendation engine using collaborative filtering and content-based approaches.',
        'technologies': ['Python', 'Machine Learning', 'pandas'],
        'status': 'Complete',
        'image': 'movie_recommender.png'
    },
    # Project 4: Housing Analysis
    {
        'id': 4,
        'title': 'Housing Data Analysis',
        'description': 'Comprehensive exploratory data analysis of housing market data with visualizations and insights.',
        'technologies': ['Jupyter', 'pandas', 'matplotlib', 'seaborn'],
        'status': 'Complete',
        'image': 'housing.png'
    }
]

# ROUTE 1: Home page
# @app.route('/') defines the URL path that this function handles
# When someone visits http://localhost:5000/, this function runs
# render_template() loads the HTML file from the templates folder and sends it to the browser
# We pass projects=PROJECTS so the template can access the project data
@app.route('/')
def index():
    return render_template('index.html', projects=PROJECTS)

# ROUTE 2: Projects page
# Displays all projects in a grid layout
@app.route('/projects')
def projects():
    return render_template('projects.html', projects=PROJECTS)

# ROUTE 3: Individual project detail page
# <int:project_id> captures the project ID from the URL (e.g., /project/1)
# We search for the project matching that ID and display its details
@app.route('/project/<int:project_id>')
def project_detail(project_id):
    # Use next() to find the first project with matching ID, or None if not found
    project = next((p for p in PROJECTS if p['id'] == project_id), None)
    if project is None:
        return render_template('404.html'), 404  # Return 404 error if project not found
    return render_template('project_detail.html', project=project)

# ROUTE 4: About page
# Simple page with information about you
@app.route('/about')
def about():
    return render_template('about.html')

# ROUTE 5: Contact page - handles both GET (display form) and POST (submit form)
# methods=['GET', 'POST'] means this route accepts both types of HTTP requests
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # POST request means the form was submitted
        # request.get_json() reads the data sent from the frontend
        data = request.get_json()
        # TODO: Add email sending logic here using a service like Gmail or SendGrid
        return jsonify({'message': 'Message received! I\'ll get back to you soon.'}), 200
    return render_template('contact.html')

# ROUTE 6: API endpoint to get all projects as JSON
# This endpoint returns project data in JSON format for frontend APIs or mobile apps
@app.route('/api/projects')
def api_projects():
    return jsonify(PROJECTS)

# ERROR HANDLERS
# These functions handle errors that occur during routing and rendering

# Handle 404 errors (page not found)
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

# Handle 500 errors (server errors)
@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

# Main entry point
# if __name__ == '__main__' ensures this code only runs when the file is executed directly
# (not when imported as a module in another file)
if __name__ == '__main__':
    # debug=True: reloads the server when you make code changes
    # host='localhost': only accessible from your computer
    # port=5000: the port to run the server on (http://localhost:5000)
    app.run(debug=True, host='localhost', port=5000)
