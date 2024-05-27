const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve({});
        return;
      }

      const students = lines.slice(1).map((line) => line.split(',')).filter((student) => student.length === 4);
      const fields = {};

      students.forEach((student) => {
        const [firstname, , , field] = student;
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      resolve(fields);
    });
  });
}

module.exports = readDatabase;
