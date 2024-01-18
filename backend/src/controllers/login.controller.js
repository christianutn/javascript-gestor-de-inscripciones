import { generateToken } from '../../utils/jwt.js'
export const postLogin = async (req, res) => {
    
    const token = generateToken(req.user)
    res.status(200).send({ token })
}