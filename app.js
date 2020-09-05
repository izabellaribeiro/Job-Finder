const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection'); // banco de dados oferecidos
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`);
})

//body parser 
app.use(bodyParser.urlencoded({extended: false}));

//handle bars 
app.set('views', path.join(__dirname,  'views'));
//arquivo principal de uso 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static folder 
app.use(express.static(path.join(__dirname, 'public')));


//db connection 

// sempre que for começar a aplicação ou algo do tipo vai ter que rolar uma autenticação. 
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!")
        //criação do app.db 
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar!")
    });

//routes 
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%' // PH -> PHP 

    if(!search) {
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {  
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err))
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}}, 
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs,search
            });
        })
    }

    
})

//jobs routes 

app.use('/jobs', require('./routes/jobs'));