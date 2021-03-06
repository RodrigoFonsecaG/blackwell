const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({extended:true}))

server.use(methodOverride('_method'));

server.use(routes)

server.use(function(req, res) {
    res.status(404).render("not-found.njk");
});

nunjucks.configure("src/app/views", {
    express:server,
    noCache: true
})

server.listen(process.env.PORT || 5000);

