import { Router } from "express";
import { getPlataformaDeDictado, getPlataformaDeDictadoByCod, postPlataformaDeDictado, updatePlataformaDeDictadoByCod, deletePlataformaDeDictadoByCod } from "../controllers/pataformaDeDictado.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";
const plataformaDeDictadoRouter = Router();

plataformaDeDictadoRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getPlataformaDeDictado);
plataformaDeDictadoRouter.get('/:cod', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getPlataformaDeDictadoByCod);
plataformaDeDictadoRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), postPlataformaDeDictado);
plataformaDeDictadoRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), updatePlataformaDeDictadoByCod);
plataformaDeDictadoRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]),deletePlataformaDeDictadoByCod);


export default plataformaDeDictadoRouter