import { getTipoDeCapacitacion, getTipoDeCapacitacionByCod, postTipoDeCapacitacion, updateTipoDeCapacitacionByCod, deleteMedioDeComunicacionByCod } from "../controllers/tipoDeCapacitacion.controller.js";
import {Router} from "express";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";


const tipoDeCapacitacionRouter = Router();

tipoDeCapacitacionRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getTipoDeCapacitacion);
tipoDeCapacitacionRouter.get('/:cod', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getTipoDeCapacitacionByCod);
tipoDeCapacitacionRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), postTipoDeCapacitacion);
tipoDeCapacitacionRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), updateTipoDeCapacitacionByCod);
tipoDeCapacitacionRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]),deleteMedioDeComunicacionByCod);

export default tipoDeCapacitacionRouter

