# Portfolio Website

A modern, responsive portfolio website built with Flask to showcase my Python development and machine learning projects.

## 🌟 Features

- **Clean, Responsive Design** - Mobile-friendly interface with modern CSS styling
- **Project Showcase** - Dynamic project gallery with detailed individual project pages
- **Interactive Navigation** - Smooth page transitions with dedicated sections:
  - Home page with hero section
  - Projects portfolio grid
  - About page
  - Contact form
- **RESTful API** - JSON endpoints for project data
- **Error Handling** - Custom 404 and 500 error pages

## 🛠️ Technologies Used

- **Backend**: Python, Flask 2.3.0
- **Frontend**: HTML5, CSS3, JavaScript
- **Template Engine**: Jinja2
- **Server**: Werkzeug 2.3.0

## 📂 Project Structure

```
├── portfolio_website.py     # Main Flask application
├── requirements.txt         # Python dependencies
├── templates/              # HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Home page
│   ├── projects.html      # Projects gallery
│   ├── project_detail.html # Individual project view
│   ├── about.html         # About page
│   ├── contact.html       # Contact form
│   ├── 404.html          # Custom error page
│   └── 500.html          # Server error page
└── static/               # Static assets
    ├── css/
    │   └── style.css     # Stylesheet
    └── js/
        └── main.js       # JavaScript functionality
```

## 🚀 Getting Started

### Prerequisites

- Python 3.7+
- pip package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the application
```bash
python portfolio_website.py
```

4. Open your browser and navigate to `http://localhost:5000`

## 📋 Featured Projects

The portfolio currently showcases:
- **Auto Clicker** - Automated mouse clicker with hotkey controls
- **Linear Regression Model** - ML model for housing price prediction
- **Movie Recommender System** - Intelligent recommendation engine
- **Housing Data Analysis** - Comprehensive data visualization and insights

## 🔮 Future Enhancements

- Add email functionality to contact form
- Integrate database for dynamic project management
- Add blog section
- Implement user authentication
- Add project filtering and search

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
