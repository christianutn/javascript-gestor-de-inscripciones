import { Router } from "express";
import { getMinisterios, getMinisterioById, updateMinisterioByCod, deleteMinisterioByCod, postMinisterio } from "../controllers/ministerio.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";

const ministerioRouter = Router();


ministerioRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getMinisterios);
ministerioRouter.get('/:id', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getMinisterioById);
ministerioRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma"]), updateMinisterioByCod);
ministerioRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), postMinisterio);
ministerioRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteMinisterioByCod);


export default ministerioRouter