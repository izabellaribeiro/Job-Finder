//rota que adiciona nossos jobs no banco 
const express = require('express');
const router = express.Router();
const  Job = require('../models/Job');

// add job via post 
router.post('/add', (req, res) => {
    //corpo para o adicionamento
    let {title, salary, company, descripition, email, new_job} = req.body;

    // insert 
    Job.create(
        {
            title, 
            descripition, 
            salary,
            company,
            email, 
            new_job
        }
    )
    .then(() => res.redirect('/'));
});