//rota que adiciona nossos jobs no banco 
const express = require('express');
const router = express.Router();
const  Job = require('../models/Job');

router.post('/test', (req, res) =>
    {
        res.send('deu certo!')
    }
);

// add job via post 
router.post('/add', (req, res) => {
    //corpo para o adicionamento
    let {title, salary, company, description, email, new_job} = req.body;

    // insert 
    Job.create(
        {
            title, 
            description, 
            salary,
            company,
            email, 
            new_job
        }
    )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router