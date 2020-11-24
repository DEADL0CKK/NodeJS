const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.create_an_user = (req, res) => {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            let new_user = new User({
                ...req.body,
                password: hash
            });
            console.log(new_user)
            new_user.save((error, user) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({
                        message: "Erreur serveur."
                    })
                } else {
                    res.status(201);
                    res.json({
                        message: `Utilisateur crée :  ${user.email}`
                    })
                }
            })
        }
    })





}

exports.login_an_user = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    res.json({
                        message: "Erreur serveur."
                    })
                } else {
                    jwt.sign({
                            email: user.email,
                            role: "user"
                        },
                        process.env.JWT_TOKEN, {
                            expiresIn: '30 days'
                        }, (error, token) => {
                            if (error) {
                                res.status(400);
                                console.log("ERREURR", error);
                                res.json({
                                    message: "Mot de passe ou email erroné."
                                })
                            } else {
                                console.log({
                                    token
                                })
                                res.json({
                                    token
                                })
                            }
                        })

                }
            });

        }

    })
}