const InstructorRepository = require('../repository/sequelize/InstructorRepository');
const config = require("../config/auth/key") 
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const email = req.body.email 
    const password = req.body.password 
    InstructorRepository.findByEmail (email) 
        .then(user => { 
            if (!user) {
                return res.status (401).send({ message: "Nieprawidłowy email" })
            }

            bcrypt.compare (password, user.password) 
                .then(isEqual => { 
                    if (!isEqual) {
                        return res.status (401).send({ message: "Nieprawidłowe hasło" })
                    }
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user.id,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status (200).json({ token: token, userId: user.id })
                })
                .catch(err => {
                    console.log(err) 
                    res.status (501)
                })
            })
}