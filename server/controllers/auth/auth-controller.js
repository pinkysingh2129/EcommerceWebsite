const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) { return res.json({
                success: false,
                message: 'A user with this email already exists. Please use a different email.',
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Registration successful',
        });
    } catch (error) {
        console.error('Error during registration:', error);

        // Return error if something goes wrong
        res.status(500).json({
            success: false,
            message: 'User already exists.',
        });
    }
};

const loginUser = async (req, res) => {
    const {  email, password } = req.body;
    try {
        const checkUser = await User.findOne({email});
        if(!checkUser) {
            return res.json({
                success: false,
                message: 'user doesnt exist with this email.please register',
            })
        }
        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch) {
            return res.json({
                success: false,
                message: 'Incorrect password! Please try again',
            });
        }
        const token = jwt.sign({
            id: checkUser._id, role : checkUser.role, email : checkUser.email
        },'CLIENT_SECRET_KEY',{expiresIn : '60m'})

        res.cookie('token' , token,{httpOnly : true , secure : false }).json({
            success: true,
            message: 'Logged in successfully' ,
            user :{
            email : checkUser.email,
            role : checkUser.role,
            id : checkUser._id
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred.',
        });
    }
};


const logoutUSer = (req,res)=> {
    res.clearCookie('token').json({
        success : true,
        message : 'Logged out successfully!',
    })
}

const authMiddleware = async(req,res,next)=> {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
        success :false,
        message : 'Unauthorized user! '
    })

    try {
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user= decoded;
        next()
    }catch(error){
        res.json(401).json({
            success : false,
            message : 'unauthorised user!',
        });
    }
}
module.exports = { registerUser, loginUser, logoutUSer,authMiddleware};

