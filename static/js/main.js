// Contact form handling
// This code runs when the page loads and waits for the form to be submitted

// querySelector() finds the first element matching the selector
// The ?. operator means "only run this if the element exists"
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    // e.preventDefault() stops the form from doing its default behavior (page reload)
    e.preventDefault();

    // Get the values the user typed into the form
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // try/catch block handles errors gracefully
    try {
        // fetch() sends data to the backend (like making an HTTP request)
        // This sends the form data to the /contact route
        const response = await fetch('/contact', {
            method: 'POST',  // POST request means we're sending data
            headers: {
                'Content-Type': 'application/json',  // Tell the server we're sending JSON
            },
            body: JSON.stringify(formData)  // Convert JavaScript object to JSON string
        });

        // Check if the response was successful (status 200-299)
        if (response.ok) {
            // Parse the response data
            const data = await response.json();
            alert(data.message);
            // Clear the form so the user can submit another message
            document.getElementById('contactForm').reset();
        } else {
            // Show error if something went wrong
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        // Catch any network or other errors
        console.error('Error:', error);
        alert('Error sending message');
    }
});

// Smooth scroll behavior for anchor links (links that start with #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Stop the default jump behavior
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smoothly scroll to the target element instead of jumping
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links when scrolling
// This could highlight which section you're on as you scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
});

// Console message - appears in browser developer tools console
console.log('Portfolio website loaded successfully!');
