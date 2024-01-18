import {Router} from "express";
import {getTutores, getTutorByCuil, postTutor, updateTutorByCuilByCuil, deleteTutorByCuil } from "../controllers/tutor.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";
const tutorRouter = Router();

tutorRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getTutores);
tutorRouter.get('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getTutorByCuil);
tutorRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), postTutor);
tutorRouter.put('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["todos"]), updateTutorByCuilByCuil);
tutorRouter.delete('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteTutorByCuil);


export default tutorRouter