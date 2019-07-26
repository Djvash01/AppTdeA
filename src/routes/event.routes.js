const {Router} = require('express');
const router = Router();
const {getEvents,addEvent, createEvents, getEvent, updateEvent, deleteEvent} = require('../controllers/events.controller');

router.route('/add')
    .get(addEvent);

router.route('/')
    .get(getEvents)
    .post(createEvents);

router.route('/:id') 
    .get(getEvent)
    .delete(deleteEvent)
    .put(updateEvent);

module.exports = router;