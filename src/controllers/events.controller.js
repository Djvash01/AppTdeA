const eventsCtrl= {};

const Event = require('../models/event');

eventsCtrl.getEvents = async (req, res) => {
    const events = await Event.find();
    res.render('events/all-events',{events});
};

eventsCtrl.addEvent = (req, res) =>{
    res.render('events/new-event');
}

eventsCtrl.editEvent =async (req, res) =>{
    const {id} = req.params;
    const event = await Event.findById(id);
    res.render('events/edit-event', {event});
}

eventsCtrl.createEvents = async(req, res) => {
    const {title,content, startDate, finishDate, supervisor} = req.body;
    const newEvent = new Event({
        title, 
        content,  
        supervisor,
        startDate,
        finishDate
    });
    console.log(newEvent);
    await newEvent.save();
    const events = await Event.find();
    res.render('events/all-events',{events});
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
    res.redirect('/api/events');
};

eventsCtrl.deleteEvent = async (req, res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect('/api/events');
};

module.exports = eventsCtrl;