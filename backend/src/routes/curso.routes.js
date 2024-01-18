import { Router } from "express";
import { getCursos, postCurso, updateCursoByCod, deleteCursoByCod, getCursoById } from "../controllers/curso.controller.js";
import passport from "passport";
import { authorization } from "../../utils/authorization.js";

const cursoRouter = Router();



cursoRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getCursos)
cursoRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), postCurso)
cursoRouter.put('/:cod', passport.authenticate('jwt', {session: false}), authorization(["todos"]), updateCursoByCod)
cursoRouter.delete('/:cod', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteCursoByCod)
cursoRouter.get('/:id', passport.authenticate('jwt', {session: false}), authorization(["todos"]), getCursoById)

export default cursoRouter