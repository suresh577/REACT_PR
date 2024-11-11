const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, images)
app.use(express.static('public'));

// Route to display the login page
app.get('/login', (req, res) => {
    res.render('login');  // Render login.ejs
});

// Route to display the signup page
app.get('/signup', (req, res) => {
    res.render('signup');  // Render signup.ejs
});

// Handle POST request for login (you can add actual login logic here)
app.post('/login', (req, res) => {
    // Handle the login logic, e.g., check user credentials
    console.log(req.body);  // Just log for now
    res.send('Logged in');  // Send response (you can redirect or render another page here)
});

// Handle POST request for signup (you can add actual signup logic here)
app.post('/signup', (req, res) => {
    // Handle user signup logic (e.g., saving user info in a database)
    console.log(req.body);  // Just log for now
    res.send('Signed up');  // Send response (you can redirect to login or show success)
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
