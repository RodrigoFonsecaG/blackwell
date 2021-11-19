const fs = require('fs');
const data = require('../src/data')
const {age, date, grade} = require('../src/utils.js')

exports.index = (req, res) => {
    return res.render("students/students.njk", {students: data.students});
}

exports.create = (req, res) => {
    return res.render("students/create.njk");
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(let key of keys){
        if(req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    //id unico
 
    let id = 1;
    let lastMember = data.students[data.students.length - 1];
    if (lastMember) {
      id = lastMember.id + 1
    }

    
    let {avatar_url,name, birth, academic_load, academic_year, email} = req.body

    birth = Date.parse(req.body.birth)

    data.students.push({
        id,
        name,
        email,
        avatar_url,
        birth,
        academic_load,
        academic_year
    })


    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect("/students")
    })


}

exports.show = (req, res) => {
    const id = +req.params.id

    const foundStudent = data.students.find(student => student.id === id);

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        birthday: date(foundStudent.birth).birthday,
        grade: grade(foundStudent.academic_year),
    }

    return res.render("students/show.njk", {student})
}

exports.edit = (req, res) => {
    const id = +req.params.id

    const foundStudent = data.students.find(student => student.id === id);

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit.njk", {student})
}

exports.update = (req, res) => {
    const {id} = req.body
    let index = 0;


    const foundStudent = data.students.find((student, foundIndex) => {
        if(+id === student.id){
            index = foundIndex;
            return true
        }
    })

    if(!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: +req.body.id
    }


    data.students[index] = student;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = (req, res) => {
    const {id} = req.body

    const student = data.students.filter(student => {
        return student.id != id
    })

    
    data.students = student;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect(`/students`)
    })
}