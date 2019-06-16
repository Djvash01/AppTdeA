const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/applicant/', async (req, res)=>{
    const courses = await Course.find({status:'Disponible'});
    res.render('courses/applicant',{courses});
});

router.get('/enrolles/', async (req,res)=>{
    const courses = await Course.find({status:'Disponible'});
    res.render('courses/enrolles',{courses});
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
        const courses = await Course.find().sort({created_at:'desc'});
        res.render('courses/courses',{answer,courses});
    }
    
});

router.put('/enroll/', async (req, res) =>{
    const {id, dni, name, email, phone} = req.body;
    const answer=[];
    const courses = await Course.find({status:'Disponible'});
    if(!(dni && name && email && phone)){
        answer.push({status:'danger', description:'Los datos ingresados no son validos'})
        res.render('courses/applicant',{courses,answer});
    }else{
        const course = await Course.findById(id);
        const enrolled = course.enrollees.find(enrolled=>enrolled.dni===dni);
        if(enrolled){
            answer.push({status:'danger', description:'Usted ya se encuentra inscrito en este curso'})
            res.render('courses/applicant',{courses, answer});
        }else{
            const applicant = {dni,name,email,phone};
            course.enrollees.push(applicant);
            await Course.findByIdAndUpdate(id,course);
            answer.push({status:'success', description:'Registro exitoso'})
            res.render('courses/applicant',{courses, answer});
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
    const answer=[];
    const course = await Course.findOne({id:req.params.id});
    const enrolled = course.enrollees.find(enrolled=>enrolled.dni===dni);
    let index = course.enrollees.indexOf(enrolled);
    if(index!==-1){
        course.enrollees.splice(index,1);
        await Course.findByIdAndUpdate(course._id,course);
        const courses = await Course.find({status:'Disponible'});
        answer.push({status:'warning', description:'Aspirante eliminado'})
        res.render('courses/enrolles',{courses, answer});
    }else{
        const courses = await Course.find({status:'Disponible'});
        answer.push({status:'danger', description:'No se encontro estudiante con ese dni'})
        res.render('courses/enrolles',{courses, answer});
    }
    
});

router.delete('/:id', async (req, res) =>{
    res.json('Received');
});

module.exports = router;
