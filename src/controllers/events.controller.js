const eventsCtrl= {};

const Event = require('../models/event');

eventsCtrl.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

eventsCtrl.addEvent = (req, res) =>{
    res.render('events/new-event');
}

eventsCtrl.createEvents = async(req, res) => {
    const {title,content, startDate, finishDate, supervisor} = req.body;
    const newEvent = new Event({
        title, 
        content,  
        supervisor
    });
    console.log(newEvent);
    await newEvent.save();
    res.json({message:'Event saved'});
};

eventsCtrl.getEvent = async (req, res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    res.json(event);
};

eventsCtrl.updateEvent = async (req, res) => {
    const {id} = req.params;
    const {title,content, startDate, finishDate, supervisor} = req.body;
    await Event.findOneAndUpdate({_id:id},{
        title,
        content, 
        startDate, 
        finishDate, 
        supervisor
    });
    res.json({message:'Event updated'});
};

eventsCtrl.deleteEvent = async (req, res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    res.json({message:'Event deleted'});
};

module.exports = eventsCtrl;