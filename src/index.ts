import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as multer from 'multer';
import * as morgan from 'morgan';
var upload = multer();

import routes from './routes';

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(morgan('combined'));
    app.use(cors());
    app.use('/', express.static('client/build'));
    app.use('/:id', express.static('client/build'));
    app.use('/uploads/', express.static('uploads'));
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Set all routes from routes folder
    app.use('/api/', routes);
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch((error) => console.log(error));
