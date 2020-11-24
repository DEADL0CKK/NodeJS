const jwt = require('jsonwebtoken')

const JWT_TOKEN = process.env.JWT_TOKEN

exports.verify_token = (req,res,next) => {
    let token = req.headers['authorization']

    if(typeof token != 'undefined'){
        jwt.verify(token, JWT_TOKEN, (error) => {
            if(error){
                res.sendStatus(403)
            }
            else {
                next();
            }
        })
    } else {
        res.status(403)
        res.json({message:"Accès interdit mon pote !!!!!!"})
    }
}