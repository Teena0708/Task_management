const express = require('express')
const router = Router.express()
const User = require('../models/userSchema')


router.post('/api/user', async (req, res) => {
    const { name, email } = req.body;
    if(!name || !email){
        return res.status(400).json({
            message :"fields are reequired"
        })
    }

    const newUser = User.create({
        name:name,
        email :email
    })

}
);
