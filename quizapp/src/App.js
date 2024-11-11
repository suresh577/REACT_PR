const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const collection = require('./mongodb');

// Middleware
app.use(express.urlencoded({ extended: true })); // middleware for form data
app.use(express.static('public'));

// Set view engine and template path
app.set('view engine', 'ejs');
const templatepath = path.join(__dirname, '../templates');
app.set("views", templatepath);

// Database Connection
const dbURL = process.env.DB_URL || "mongodb+srv://users:Lgn4EycvM3eIysGy@quizz.prf8a.mongodb.net/?retryWrites=true&w=majority&appName=quizz";
mongoose.connect(dbURL)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  collection.find()
    .then((result) => {
      res.render('login', { title: 'Login Page', blogs: result });
    })
    .catch((err) => {
      console.log("Error fetching data for login:", err);
    });
});

app.post('/login', (req, res) => {
  const data = new collection(req.body);
  data.save()
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      console.log("Error saving login data:", err);
    });
});

app.post('/home', async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render('home', { title: 'Home Page' });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log("Error in login validation:", err);
    res.redirect('/login');
  }
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// 404 Page
app.use((req, res) => {
  res.status(404).render('404');
});
