const fs = require('fs');

function countStudents(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error('Cannot load the database');
  }
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');
    const fieldCounts = {};
    let totalStudents = 0;
    lines.forEach((line, index) => {
      if (index === 0 || line.trim() === '') {
        return;
      }
      const [firstName, lastName, age, field] = line.split(',');
      if (!firstName || !lastName || !age || !field) {
        return;
      }
      if (!fieldCounts[field]) {
        fieldCounts[field] = { count: 0, names: [] };
      }
      fieldCounts[field].count += 1;
      fieldCounts[field].names.push(firstName);
      totalStudents += 1;
    });
    console.log(`Number of students: ${totalStudents}`);
    for (const [field, { count, names }] of Object.entries(fieldCounts)) {
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
