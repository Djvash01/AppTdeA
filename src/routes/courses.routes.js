const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/applicant/', async (req, res)=>{
    const courses = await Course.find({status:'Disponible'});
    res.render('courses/applicant',{courses});
});

router.get('/', async (req, res)=>{
    const courses = await Course.find().sort({created_at:'desc'});
    res.render('courses/courses',{courses});
});

router.get('/:id', async (req, res) =>{
    const course = await Course.findOne({id:req.params.id});
    res.json(course);
});

router.post('/', async (req, res)=>{
    const {id,nameCourse,description,cost,mode,hours} = req.body;
    const course = new Course({id,nameCourse,description,cost,mode,hours});
    const answer=[];
    try{
        await course.save();
        answer.push({status: 'success', description: 'Course saved'});
        const courses = await Course.find().sort({created_at:'desc'});
        res.render('courses/courses',{
            courses,
            answer
        });
    }catch(err){
        console.log('error',err);
        answer.push({status: 'danger', description: 'El id del curso ya esta en uso'});
        res.render('courses/courses',{answer});
    }
    
});

router.put('/enroll/:id', async (req, res) =>{
    const {dni, name, email, phone} = req.body;
    if(!(dni && name && email && phone)){
        res.json({status:'failed', description:'Los datos ingresados no son validos'});
    }else{
        const course = await Course.findOne({id:req.params.id});
        const enrolled = course.enrollees.find(enrolled=>enrolled.dni===dni);
        if(enrolled){
            res.json({status:'failed', description:'Usted ya se encuentra inscrito en este curso'});
        }else{
            course.enrollees.push(req.body);
            await Course.findByIdAndUpdate(course._id,course);
            res.json({status:'enrrollment succes'});
        }
        
    }
    
});

router.put('/:id', async (req,res)=>{
    const answer=[];
    await Course.findByIdAndUpdate(req.params.id,{status:''});
    const courses = await Course.find().sort({created_at:'desc'});
    answer.push({status: 'warning', description: 'El curso fue cerrado'});
    res.render('courses/courses',{
        courses,
        answer
    });
});

router.put('/delete/:id', async (req,res)=>{
    const {dni} =req.body;
    const course = await Course.findOne({id:req.params.id});
    const enrolled = course.enrollees.find(enrolled=>enrolled.dni===dni);
    let index = course.enrollees.indexOf(enrolled);
    if(index!==-1){
        course.enrollees.splice(index,1);
        await Course.findByIdAndUpdate(course._id,course);
        res.json({status:'Enrolled Deleted'});
    }else{
        res.json({status:'failed', description:'No se encontro estudiante con ese dni'});

    }
    
});

router.delete('/:id', async (req, res) =>{
    res.json('Received');
});

module.exports = router;
