const Student = require('../models/Student.js');
const { age, date, grade } = require('../../lib/utils.js');

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
      callback(students){
        const pagination = {
          page,
          limit, 
          total(){
            return students[0] ? total = Math.ceil(students[0].count / limit) : total = 0
          }
        }

        return res.render('students/students.njk', { students, pagination, filter });
      }
    }

    Student.paginate(params)
  },

  create(req, res) {
    Student.selectTeacherOptions(function(teachers){
      return res.render('students/create.njk', {teachers});
    })
   
  },

  post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == '') {
        return res.send('Preencha todos os campos');
      }
    }

    Student.create(req.body, function(student){
      return res.redirect(`/students/${student.id}`)
    })
  },

  show(req, res) {
    const id = +req.params.id;

    Student.find(id, function(student){

      if(!student) res.send("Student not found!")

      student.age = age(student.birth_date)
      student.birthday = date(student.birth_date).birthday
      student.academic_year = grade(student.academic_year)
      
      return res.render(`students/show.njk`, {student})
    })
  },

  edit(req, res) {
    const id = +req.params.id;

    Student.find(id, function(student){

      student.birth_date = date(student.birth_date).iso;

      Student.selectTeacherOptions(function(students){
        return res.render(`students/edit.njk`, {student, students})
      })
    })
  },

  update(req, res) {
    Student.update(req.body, function(){
      return res.redirect(`/students/${req.body.id}`);
    })
  },

  delete(req, res) {
    const { id } = req.body;

    Student.delete(id, function(){
      return res.redirect(`/students`);
    })  
  }
};
