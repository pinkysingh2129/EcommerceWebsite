const express = require('express');
const router = express.Router();
const { registerUser , loginUser, logoutUSer, authMiddleware} = require('../../controllers/auth/auth-controller');

// Register route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUSer);
router.get('/checkauth', authMiddleware , (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success : true,
        message : 'Authenticated user!',
        user,
    })

});
// Login route

module.exports = router;
