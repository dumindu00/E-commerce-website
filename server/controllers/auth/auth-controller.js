const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')


// register

const register = async(req, res) => {
    const {userName, email, password} = req.body

    try {
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

const login = async(req, res) => {

    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some error occurred',
        })
    }
}


// logout



// auth-middle
