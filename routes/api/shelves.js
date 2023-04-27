const express = require('express');
const router = express.Router();
const shelvesController = require('../../controllers/shelvesController');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles'); 

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin),shelvesController.getAllShelves)

router.route('/update')
    .put(verifyRoles(ROLES_LIST.User),shelvesController.updateShelf);

router.route('/my-shelf')
    .post(verifyRoles(ROLES_LIST.User),shelvesController.getShelf)

router.route('/check-book')
    .post(verifyRoles(ROLES_LIST.User),shelvesController.checkBookForUser);

router.route('/update-book')
    .put(verifyRoles(ROLES_LIST.User),shelvesController.updateBookForUser);

module.exports = router;