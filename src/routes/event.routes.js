const {Router} = require('express');
const router = Router();
const {isAuthorized} = require('../helpers/auth');
const {getEvents,addEvent, createEvents, getEvent, updateEvent, deleteEvent, editEvent} = require('../controllers/events.controller');

router.route('/add')
    .get(isAuthorized,addEvent);

    router.route('/edit/:id')
    .get(isAuthorized, editEvent);

router.route('/')
    .get(getEvents)
    .post(isAuthorized, createEvents);

router.route('/:id') 
    .get(getEvent)
    .delete(deleteEvent)
    .put(updateEvent);

module.exports = router;