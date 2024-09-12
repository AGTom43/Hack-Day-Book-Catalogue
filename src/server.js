const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());  // Enable CORS
app.use(bodyParser.json());

app.get('/reviews', (req, res) => {
  fs.readFile(path.join(__dirname, 'reviews.txt'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read file' });
    }
    res.json({ content: data });
  });
});

app.get('/books', (req, res) => {
  fs.readFile(path.join(__dirname, 'catalogued_books.txt'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read file' });
    }
    res.json({ content: data });
  });
});

// Your review endpoint here
app.post('/api/reviews', (req, res) => {
  const { bookId, reviewerName, sentiment, review, date } = req.body;
  const filePath = path.join(__dirname, 'reviews.txt');
  const newReview = `${bookId},${reviewerName},${sentiment},${review},${date}\n`;

  fs.appendFile(filePath, newReview, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save review' });
    }
    res.status(200).json({ message: 'Review saved successfully!' });
  });
});

// Your review endpoint here
app.post('/api/books', (req, res) => {
  const { bookId, loggerName, date } = req.body;
  const filePath = path.join(__dirname, 'catalogued_books.txt');
  const newReview = `${bookId},${loggerName},${date}\n`;

  fs.appendFile(filePath, newReview, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to save book' });
    }
    res.status(200).json({ message: 'Book saved successfully!' });
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});