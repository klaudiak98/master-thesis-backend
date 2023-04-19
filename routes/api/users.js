const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles'); 

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin),usersController.getAllUsers)
    // .post(verifyRoles(ROLES_LIST.Admin), usersController.createNewUser)
    // .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router.route('/update')
    .patch(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User),usersController.updateUser)

router.route('/delete')
    .post(verifyRoles(ROLES_LIST.Admin),usersController.deleteUser)

router.route('/me')
    .get(usersController.getUserByEmail)

module.exports = router;