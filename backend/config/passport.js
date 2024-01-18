import local from 'passport-local' //Importo la estrategia
import jwt from 'passport-jwt'
import passport from 'passport'
import { validatePassword, createHash } from '../utils/bcrypt.js'
import { userModel } from '../src/models/user.models.js'
import 'dotenv/config'

//Defino la estregia a utilizar
const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt //Extrar de las cookies el token


const initializePassport = () => {

    const cookieExtractor = req => {
 

        //En lugar de tomar de las cookies directamente todo de la peticion
        let token = req.headers.authorization ? req.headers.authorization : {}

        //Si token comienza con Bearer se quita. Se implenta para implementación de Swagger que en autorization devuelve
        // el req.headers.authorization con el Bearer delante,  distinto a como lo pasamos por poarte del cliente
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }

        

        return token

    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //El token va a venir desde cookieExtractor
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => { //jwt_payload = info del token (en este caso, datos del cliente)
        try {
            
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }

    }))


    
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'cuil' }, async (req, username, password, done) => {
            //Registro de usuario
            
            const { cuil, nombre, apellido, correo, rol } = req.body
            console.log("INFO:", cuil, nombre, apellido, correo, rol, password)
            try {
                const user = await userModel.findOne({ cuil: cuil })
            
                if (user) {
                    //Caso de error: usuario existe
                    return done(null, false)
                    
                }

                //Crear usuario

                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    cuil: cuil,
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    password: passwordHash,
                    rol: rol
                })

                
                return done(null, userCreated)

            } catch (error) {
                
                return done(error)
            }
        }))

    passport.use('login', new LocalStrategy(
        { usernameField: 'cuil', passReqToCallback: true }, async (req, cuil, password, done) => {
            try {
                
                const user = await userModel.findOne({ cuil: cuil })
                

                if (!user) {
                    
                    return done(null, false)
                }
                
                if (validatePassword(password, user.password)) {
                    
                    return done(null, user)
                }
                
                return done(null, false)

            } catch (error) {
                return done(error)
            }
        }))


    

}

export default initializePassport