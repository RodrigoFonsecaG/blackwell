const data = require('../src/data')


exports.index = (req, res) => {
    return res.render("courses/courses.njk", {courses: data.courses});
}

exports.show = (req, res) => {
    const id = req.params.id

    const foundCourse = data.courses.find((course) => {
        return id == course.id
    })

    return res.render("courses/description.njk", {course: foundCourse})
}