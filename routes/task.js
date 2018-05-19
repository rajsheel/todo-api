var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// POST request to create a new client.
router.post('/create', taskController.task_create_post);

// GET request to get client, use with query parameters of id or name but not both.
router.get('/search', taskController.task_search);


// POST request to delete an existing client.
router.post('/delete', taskController.task_delete_post);

module.exports = router;

