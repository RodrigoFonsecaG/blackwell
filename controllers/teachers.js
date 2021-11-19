const fs = require('fs');
const data = require('../src/data')
const {age, date} = require('../src/utils.js')

exports.index = (req, res) => {
    return res.render("teachers/teachers.njk", {teachers: data.teachers});
}

exports.create = (req, res) => {
    return res.render("teachers/create.njk");
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
    let lastMember = data.teachers[data.teachers.length - 1];
    if (lastMember) {
      id = lastMember.id + 1
    }

    
    let {avatar_url,name, birth, schooling, class_type, areas} = req.body

    const created_at = Date.now();
    birth = Date.parse(req.body.birth)

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        created_at,
        schooling,
        class_type,
        areas
    })


    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect("/teachers")
    })


}

exports.show = (req, res) => {
    const id = +req.params.id

    const foundTeacher = data.teachers.find(teacher => teacher.id === id);

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        created_at : Intl.DateTimeFormat('pt-BR', {timeZone: 'UTC'}).format(foundTeacher.created_at),
        age: age(foundTeacher.birth),
        areas: foundTeacher.areas.split(',')
    }

    return res.render("teachers/show.njk", {teacher})
}

exports.edit = (req, res) => {
    const id = +req.params.id

    const foundTeacher = data.teachers.find(teacher => teacher.id === id);

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render("teachers/edit.njk", {teacher})
}

exports.update = (req, res) => {
    const {id} = req.body
    let index = 0;


    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if(+id === teacher.id){
            index = foundIndex;
            return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: +req.body.id
    }


    data.teachers[index] = teacher;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = (req, res) => {
    const {id} = req.body

    const teacher = data.teachers.filter(teacher => {
        return teacher.id != id
    })

    
    data.teachers = teacher;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2),function(err){
        if(err) return res.send(err)

        return res.redirect(`/teachers`)
    })
}