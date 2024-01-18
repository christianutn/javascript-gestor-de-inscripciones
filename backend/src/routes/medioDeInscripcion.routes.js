import { getMediosDeInscripcion, getMedioDeInscripcionByCod, postMedioDeInscripcion, updateMedioDeInscripcionByCod, deleteMedioDeInscripcionByCod } from "../controllers/medioDeInscripcion.controller.js";
import {Router} from "express";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";

const medioDeInscripcionRouter = Router();


medioDeInscripcionRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getMediosDeInscripcion);
medioDeInscripcionRouter.get('/:cod', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getMedioDeInscripcionByCod);
medioDeInscripcionRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), postMedioDeInscripcion);
medioDeInscripcionRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), updateMedioDeInscripcionByCod);
medioDeInscripcionRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]),deleteMedioDeInscripcionByCod);

export default medioDeInscripcionRouter
