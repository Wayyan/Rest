'use strict';
module.exports = function (app) {
    var controller = require('../controllers/todoController');
    app.route('/data')
        .get(controller.write_all_data)
        .post(controller.add_a_thing)
        .put(controller.update_a_thing)
        .delete(controller.delete_a_thing);

    app.route('/data/:dataId')
        .get(controller.read_a_thing);
}