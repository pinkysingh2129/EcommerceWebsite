const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');




const registerUser = async(req,res) => {
    const {username,email,password} = req.body;
    
    try {
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User ({
            username,
            email,
            password:hashPassword,
        })

        await newUser.save()
        res.status(200).json({
            success : true,
            message : 'Registeration Successful'
        })

    } catch(e) {
        console.error('Error during registration:', e);
        res.status(500).json({
            success : false,
            message : 'Some error occured '
        });
    }
};

const login  = async(req,res)=> {
    try {
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Some error occured '
        });
    }
}



module.exports = {registerUser };   
