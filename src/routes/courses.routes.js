const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/', async (req, res)=>{
    const courses = await Course.find();
    res.json(courses);
});

router.get('/:id', async (req, res) =>{
    const course = await Course.find({id:req.params.id});
    res.json(course);
});

router.post('/', async (req, res)=>{
    const {id,nameCourse,description,cost,mode,hours} = req.body;
    const course = new Course({id,nameCourse,description,cost,mode,hours});
    try{
        await course.save();
        res.json({status: 'Course saved'});
    }catch(err){
        console.log('error',err);
        res.json({status: 'Failed', description: 'El id del curso ya esta en uso'});
    }
    
});

router.put('/:id', async (req, res) =>{
    res.json('Received');
});

router.delete('/:id', async (req, res) =>{
    res.json('Received');
});

module.exports = router;
