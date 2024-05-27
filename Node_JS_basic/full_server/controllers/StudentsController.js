const readDatabase = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const database = process.argv[2];

    readDatabase(database)
      .then((data) => {
        let response = 'This is the list of our students\n';
        const fields = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        fields.forEach((field) => {
          response += `Number of students in ${field}: ${data[field].length}. `
                                + `List: ${data[field].join(', ')}\n`;
        });

        res.status(200).send(response.trim());
      })
      .catch((error) => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const database = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(database)
      .then((data) => {
        if (data[major]) {
          res.status(200).send(`List: ${data[major].join(', ')}`);
        } else {
          res.status(200).send('List: ');
        }
      })
      .catch((error) => {
        res.status(500).send('Cannot load the database');
      });
  }
}

module.exports = StudentsController;
