import {Router} from 'express';
import {appendRowsNew} from '../controllers/googleSheets.controller.js';
const googleSheetsRouter = Router();
import passport from 'passport';
import { authorization } from '../../utils/authorization.js';

googleSheetsRouter.post('/', passport.authenticate('jwt', {session: false}), authorization(["todos"]), appendRowsNew);

export default googleSheetsRouter