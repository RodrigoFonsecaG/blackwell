const express = require('express')
const routes = express.Router();

const courses = require('./app/controllers/courses.js');
const teachers = require('./app/controllers/teachers.js')
const students = require('./app/controllers/students.js')

routes.get("/", (req, res) => {
    return res.redirect("/teachers");
})

routes.get("/about", (req, res) => {
    return res.render("about.njk");
})


routes.get("/courses", courses.index)
routes.get("/courses/:id", courses.show)


routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.post("/teachers", teachers.post)
routes.get("/teachers/:id", teachers.show)
routes.get("/teachers/:id/edit", teachers.edit)
routes.put("/teachers", teachers.update)
routes.delete("/teachers", teachers.delete)


routes.get("/students", students.index)
routes.get("/students/create", students.create)
routes.post("/students", students.post)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit)
routes.put("/students", students.update)
routes.delete("/students", students.delete)

module.exports = routes;