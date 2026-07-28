const db = require('../config/db');
const jwt = require('jsonwebtoken')

const login = (req,res) => {
    const {login,password}= req.body;

    const sql = 'SELECT * FROM users WHERE email = ? OR username = ?'; //login in by username or mail

    db.query(sql, [login, login], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if(result.length === 0) {
            return res.status(401).json({
                message: 'user not found'
            });
        }

        const user = result[0];

        if(password!== user.password) {
            return res.status(401).json({
                message: 'Invalid Password'
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "thecadcompany_secret",
            {
                expiresIn: '1d'
            }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                username:user.username,
                role: user.role
            }
        });

    });
};

module.exports ={login}

