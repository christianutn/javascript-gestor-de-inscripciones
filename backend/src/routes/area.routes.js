import { Router } from "express";
import { getAreas, getAreaByCod, postArea, deleteAreaByCod, updateAreaByCod } from "../controllers/area.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";
const areaRouter = Router();

areaRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getAreas);
areaRouter.get('/:cod', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getAreaByCod);
areaRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), postArea);
areaRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteAreaByCod);
areaRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), updateAreaByCod);




export default areaRouter