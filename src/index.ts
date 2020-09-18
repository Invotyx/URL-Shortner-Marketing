import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import {User} from './entity/User';
import {Subscription} from './entity/Subscription';
import {Plan} from './entity/Plan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as multer from 'multer';
import * as morgan from 'morgan';
var upload = multer();

var cron = require('node-cron');

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
    //SET CORN JOB

    cron.schedule('* * * * *', async() => {
      const users = await getRepository(User).find()
      users.map(async user => {
        const subscription = await user.getCurrentSubscriptionPlan();
        if(subscription.expires_at != null && subscription.expires_at < new Date){
          const plan = await getRepository(Plan).findOne({
            where:{
              title:'Cause'
            }
          })
          let new_plan = new Subscription();
                new_plan.plan = plan;
                new_plan.expires_at = null,
                // new_plan.payment_method="google",
                new_plan.user = user;
                await getRepository(Subscription).save(new_plan);
        }
      })
      console.log('running a task every minute');
    });
    //Set all routes from routes folder
    app.use('/api/', routes);
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch((error) => console.log(error));
