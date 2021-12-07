const Teacher = require('../models/Teacher.js');
const { age, date } = require('../../lib/utils.js');

module.exports = {
  index(req, res) {
    let {filter, page, limit} = req.query;

    page = page || 1;
    limit = limit || 2;

    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers){
        const pagination = {
          page,
          limit, 
          total(){
            return teachers[0] ? total = Math.ceil(teachers[0].count / limit) : total = 0
          }
        }

        return res.render('teachers/teachers.njk', { teachers, pagination, filter });
      }
    }

    Teacher.paginate(params)
  },

  create(req, res) {
    return res.render('teachers/create.njk');
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == '') {
        return res.send('Preencha todos os campos');
      }
    }

    Teacher.create(req.body, function (teacher) {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },

  show(req, res) {
    const id = +req.params.id;

    Teacher.find(id, function (teacher) {
      if (!teacher) res.send('Teacher not found!');

      teacher.age = age(teacher.birth_date);
      teacher.created_at = date(teacher.created_at).format;

      return res.render(`teachers/show.njk`, { teacher });
    });
  },

  edit(req, res) {
    const id = +req.params.id;

    Teacher.find(id, function (teacher) {
      teacher.birth_date = date(teacher.birth_date).iso;

      return res.render(`teachers/edit.njk`, { teacher });
    });
  },

  update(req, res) {
    Teacher.update(req.body, function () {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  delete(req, res) {
    const { id } = req.body;

    Teacher.delete(id, function () {
      return res.redirect(`/teachers`);
    });
  }
};
