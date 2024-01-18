import {Router} from "express";
import { getAutorizadores, getAutorizadorById, postAutorizador, deleteAutorizadorById, updateAutorizadorById } from "../controllers/autorizador.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";
const autorizadorRouter = Router();

autorizadorRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getAutorizadores)
autorizadorRouter.get('/:id', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getAutorizadorById)
autorizadorRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), postAutorizador)
autorizadorRouter.delete('/:id', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteAutorizadorById)
autorizadorRouter.put('/:id', passport.authenticate('jwt', {session: false}), authorization(["todos"]), updateAutorizadorById)


export default autorizadorRouter