import { Router } from "express";
import ministerioRouter from "./ministerio.routes.js";
import areaRouter from "./area.routes.js";
import autorizadorRouter from "./autorizador.routes.js";
import cursoRouter from "./curso.routes.js";
import medioDeInscripcionRouter from "./medioDeInscripcion.routes.js";
import tipoDeCapacitacionRouter from "./tipoDeCapacitacion.routes.js";
import plataformaDeDictadoRouter from "./plataformaDeDictado.routes.js";
import tutorRouter from "./tutor.routes.js";
import inscripcionRouter from "./inscripcion.routes.js";
import googleSheetsRouter from "./googleSheets.routes.js";
import userRouter from "./user.routes.js";
import loginRouter from "./login.routes.js";


const router = Router();


router.use('/api/ministerios',ministerioRouter);
router.use('/api/areas', areaRouter);
router.use('/api/autorizadores', autorizadorRouter);
router.use('/api/cursos', cursoRouter);
router.use('/api/mediosDeInscripcion', medioDeInscripcionRouter);
router.use('/api/tiposDeCapacitacion', tipoDeCapacitacionRouter);
router.use('/api/plataformasDeDictado', plataformaDeDictadoRouter);
router.use('/api/tutores', tutorRouter);
router.use('/api/inscripciones', inscripcionRouter);
router.use('/api/googleSheets', googleSheetsRouter);
router.use('/api/users', userRouter);
router.use('/api/login', loginRouter);


export default router