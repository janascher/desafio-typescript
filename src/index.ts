import * as dotenv from 'dotenv';
dotenv.config();
import { App } from './config/app';

const app = new App();

const PORT = parseInt(process.env.PORT || '8080');

app.listen(PORT);