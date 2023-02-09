import jwt from 'jsonwebtoken'

const secret = 'JWTSECRETTOP'

function verifyToken(req,res,next){
    const token = req.headers['x-access-token'] || req.query.token;
   
    if(!token)  return res.status(401).json({
        auth: false,
        message: 'No token provided'
    })

    jwt.verify(token,secret,(err,decoded) =>{
        if(err) return res.status(404).json({message: 'Invalid token or expired'})
        req.user = decoded
        next()
    })


}

export default verifyToken;