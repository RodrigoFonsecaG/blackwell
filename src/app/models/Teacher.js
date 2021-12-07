const db = require('../../config/db');
const { age, date } = require('../../lib/utils.js');

module.exports = {
  create(data, callback) {
    const query = `
    INSERT INTO teachers(
    avatar_url, 
    name, 
    birth_date,
    education_level,
    class_type,
    subjects_taught,
    created_at
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`;

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(Date.now()).iso
    ];

    db.query(query, values, function (err, results) {
      if (err) throw err;

      callback(results.rows[0]);
    });
  },

  all(callback) {
    const query = `
      SELECT * FROM teachers
      ORDER BY teachers.name
      `;

    db.query(query, function (err, results) {
      if (err) throw err;

      callback(results.rows);
    });
  },

  find(id, callback) {
    const query = `SELECT * FROM teachers WHERE id = $1`;

    db.query(query, [id], function (err, results) {
      if (err) throw err;

      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE teachers SET
      avatar_url = ($1),
      name = ($2),
      birth_date = ($3),
      education_level = ($4),
      class_type = ($5),
    subjects_taught = ($6)
    WHERE id = $7
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.birth_date,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id
    ];

    db.query(query, values, function (err, results) {
      if (err) throw err;

      callback();
    });
  },

  delete(id, callback){
      db.query(`DELETE FROM teachers WHERE id = $1`, [id], function (err, results) {
          if(err) throw err;

          callback();
      })
  },

  findBy(filter, callback){
    const query = `SELECT * FROM teachers WHERE name ILIKE '%${filter}%' OR subjects_taught LIKE '%${filter}%' `

    db.query(query, function (err, results) {
      if(err) throw err;

      callback(results.rows);
    })
  },

  paginate(params){
    const {filter, limit, offset, callback} = params;

    let query = ``,
    filterQuery = '',
    totalQuery = '(SELECT count(*) FROM teachers) AS total'
  

    if(filter){
      filterQuery =`WHERE name ILIKE '%${filter}%' OR subjects_taught ILIKE '%${filter}%' `

      totalQuery = `(SELECT count(*) FROM teachers
      ${filterQuery}
      ) AS total`
    }


    query = `SELECT * FROM teachers, ${totalQuery}
    ${filterQuery}
    ORDER BY teachers.name LIMIT $1 OFFSET $2` 


    db.query(query, [limit, offset], function(err, results) {
      if(err) throw err;

      callback(results.rows);
    })
  }
};
