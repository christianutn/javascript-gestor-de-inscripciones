import { Router } from "express";
import { getInscripciones, getInscripcionById, postIncripcion, deleteInscripcionById, updateInscripcionById, getUltimaInscripcion } from "../controllers/inscripcion.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";


const inscripcionRouter = Router();

inscripcionRouter.get('/ultima-inscripcion', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getUltimaInscripcion);
inscripcionRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getInscripciones);
inscripcionRouter.get('/:id', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getInscripcionById);
inscripcionRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), postIncripcion);
inscripcionRouter.delete('/:id', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), deleteInscripcionById);
inscripcionRouter.put('/:id', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), updateInscripcionById);



export default inscripcionRouter