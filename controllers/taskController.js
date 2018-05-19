var Task = require('../models/task');

const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');


var async = require('async');

// Find matching client either by name or _id

exports.task_search = function(req, res, next) {


    Task.find()
        .exec(function(err, results) {
            if (err) {
                return handleError(res, err.message, "Failed to get task details");
            }
            if (results.length == 0) { // No results.
                var message = 'No Task Found';
                return handleError(res, "No Error - No Tasks Not Found", message, 400);

            } else {
                // Successful, so send.

                
                res.status(200).json(results);
                //console.log(results.client);
            }

        });

};


// Handle client create on POST.
exports.task_create_post = [

    // Validate fields.

    body('description', 'description must not be empty.').isLength({
        min: 1
    }).trim(),


    // Sanitize fields.
    sanitizeBody('*').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {


        // Extract the validation errors from a request.
        const errors = validationResult(req);
        //console.log(req.body);

        var task = new Task({
            description: req.body.description

        });

        if (!errors.isEmpty()) {
            // There are errors. Send the errors back.
            res.status(400).json({
                errors: errors.array()
            });
            return;
        } else {
            // Data from request is valid. Save Client.
            task.save(function(err) {
                if (err) {
                    return handleError(res, err.message, "Failed to add task");
                } else {
                    // Successful - redirect to new book record.
                        res.status(200).json({
                        message: "Task " + req.body.description + " added Successfully"
                    });
                }
            });
        }
    }
];


//Handles client delete requests
exports.task_delete_post = function(req, res, next) {

    if (req.query.id != null) {
        Task.findByIdAndRemove(req.query.id, function(err, task) {
            if (err) {
                return handleError(res, err.message, "Failed to delete task");
            } else if (!task) {
                // Not Successful, client not found .
                res.status(404).json({
                    message: "Task " + req.query.id + " Not Found"
                })
            } else {
                // Successful, so send.
                res.status(200).json({
                    message: "Task " + req.query.id + " deleted Successfully"
                });
            }
        });
    } else {
        var message = "Please provide id of the task to be deleted";
        res.status(200).json(message);
    }
};

//Generic Error Handling Function
function handleError(res, reason, message, code) {

    console.log("ERROR: " + reason);

    res.status(code || 500).json({
        "error": reason
    });

};