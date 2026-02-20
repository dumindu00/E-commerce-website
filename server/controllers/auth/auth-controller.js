const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


// register

const registerUser = async(req, res) => {
    const {userName, email, password} = req.body

    try {

        const checkUser = await User.findOne({email});
        if (checkUser) return res.json({success : false, message:"User Already Exists!" }) 

        const hashPassword = await bcrypt.hash(password, 12);   // this will hash the password
        const newUser = new User({ userName, email, password: hashPassword }) // this will create new user (but using same old one)

        await newUser.save() // this will save user and user data in database
        res.status(200).json({
            success : true,
            message: "User Registration successful",
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occurred',
        })
        
    }

}



// login

const loginUser = async(req, res) => {

    const { email, password } = req.body
    
    try {

        const checkUser = await User.findOne({ email });
        if(!checkUser) return res.json({
            success : false,
            message : "User doesn't exists! Please register first!"
        })

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch) return res.json({
            success : false,
            message: "Wrong password try again!"
        })

        const token = jwt.sign({
            id : checkUser._id, role : checkUser.role, email : checkUser.email
        }, 'CLIENT_SECRET_KEY', {expiresIn : '60m'})


        res.cookie('token', token, {httpOnly: true, secure : false}).json({
            success : true,
            message : 'Logged in Successfully',
            
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occurred',
        })
    }
}


// logout



// auth-middleware


module.exports = { registerUser, loginUser }
