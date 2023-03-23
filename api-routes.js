
const userController = require('../backend/controller/userController');
const router = require('express').Router();
// Contact routes
router.route('/createUser')
    .post(userController.createUser);
router.put('/updateUserData/:userID',userController.updateUserData); 
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getUsersById/:userID',userController.getUsersById);
router.delete('/delete',userController.deleteUser);

// Export API routes
module.exports = router;