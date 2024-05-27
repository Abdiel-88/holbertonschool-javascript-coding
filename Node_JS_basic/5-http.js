const http = require('http');
const url = require('url');
const fs = require('fs');

const path = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const students = lines.slice(1).map((line) => line.split(',')).filter((student) => student.length === 4);
      const numberOfStudents = students.length;

      const fields = {};
      students.forEach((student) => {
        const [firstname, , , field] = student;
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      let output = `Number of students: ${numberOfStudents}\n`;
      for (const [field, names] of Object.entries(fields)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  res.setHeader('Content-Type', 'text/plain');

  if (parsedUrl.pathname === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (parsedUrl.pathname === '/students') {
    countStudents(path)
      .then((data) => {
        res.statusCode = 200;
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
