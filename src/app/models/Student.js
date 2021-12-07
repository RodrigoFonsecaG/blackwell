const db = require('../../config/db');
const { age, date } = require('../../lib/utils.js');

module.exports = {
  create(data, callback) {
    const query = `
    INSERT INTO students(
    avatar_url, 
    name,
    email,
    birth_date,
    academic_year,
    academic_load,
    teacher_id
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.academic_year,
      data.academic_load,
      data.teacher
    ];

    db.query(query, values, function (err, results) {
      if (err) throw err;

      callback(results.rows[0]);
    });

  },

  all(callback) {
    const query = `
      SELECT * FROM students
      ORDER BY students.name
      `;

    db.query(query, function (err, results) {
      if (err) throw err;

      callback(results.rows);
    });
  },

  find(id, callback) {
    const query = `SELECT students.*, teachers.name AS teacher_name 
    FROM students 
    LEFT JOIN teachers ON (teachers.id = students.teacher_id)
    WHERE students.id = $1`;

    db.query(query, [id], function (err, results) {
      if (err) throw err;


      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE students SET
      avatar_url = ($1),
      name = ($2),
      email = ($3),
      birth_date = ($4),
      academic_year = ($5),
    academic_load = ($6),
    teacher_id = ($7)
    WHERE id = $8
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      data.birth_date,
      data.academic_year,
      data.academic_load,
      data.teacher,
      data.id
    ];

    db.query(query, values, function (err, results) {
      if (err) throw err;

      callback();
    });
  },

  delete(id, callback){
      db.query(`DELETE FROM students WHERE id = $1`, [id], function (err, results) {
          if(err) throw err;

          callback();
      })
  },

  selectTeacherOptions(callback){
    const query = `SELECT name, id FROM teachers`

    db.query(query, function (err, results) {
      if(err) throw err;


      callback(results.rows)
    })
  },

  paginate(params){
    const {filter, limit, offset, callback} = params;

    let query = ``,
    filterQuery = '',
    totalQuery = '(SELECT count(*) FROM students) AS total'
  

    if(filter){
      filterQuery =`WHERE name ILIKE '%${filter}%' OR subjects_taught ILIKE '%${filter}%' `

      totalQuery = `(SELECT count(*) FROM students
      ${filterQuery}
      ) AS total`
    }


    query = `SELECT * FROM students, ${totalQuery}
    ${filterQuery}
    ORDER BY students.name LIMIT $1 OFFSET $2` 


    db.query(query, [limit, offset], function(err, results) {
      if(err) throw err;

      callback(results.rows);
    })
  }
};
