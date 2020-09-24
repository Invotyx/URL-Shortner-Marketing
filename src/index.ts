import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { User } from './entity/User';
import { Subscription } from './entity/Subscription';
import { Plan } from './entity/Plan';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as path from 'path';

import * as CampaignController from './controllers/CampaignController';

var cron = require('node-cron');

import routes from './routes';

//Connects to the Database -> then starts the express
createConnection()
  .then(async (connection) => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('combined'));
    app.use(cors());
    app.use(express.static('public'));
    app.use('/api/', routes);
    app.use('/:id', CampaignController.view);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'public', 'views'));
    app.use('/', (req, res) => {
      res.render('pages/home');
    });
    app.use(helmet());
    // app.use('/', express.static('client/build'));

    //CORN JOB

    cron.schedule('59 23 * * *', async () => {
      const users = await getRepository(User).find();
      await users.map(async (user) => {
        const subscription = await user.getCurrentSubscriptionPlan();
        if (!subscription) {
          console.log(`Subscription not found for user with id '${user.id}'`);
        } else if (subscription.expires_at != null) {
          let today = new Date().toISOString().split('T')[0];
          let expiry_date = new Date(subscription.expires_at)
            .toISOString()
            .split('T')[0];
          console.log(today, expiry_date);
          if (expiry_date < today) {
            const plan = await getRepository(Plan).findOne({
              where: {
                title: 'Cause',
              },
            });
            let new_plan = new Subscription();
            new_plan.plan = plan;
            (new_plan.expires_at = null),
              (new_plan.payment_method = subscription.payment_method),
              (new_plan.user = user);
            await getRepository(Subscription).save(new_plan);
          }
        }
      });
      console.log('running a task every day');
    });
    //Set all api from routes folder
    // app.use('/api/', routes);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}!`);
    });
  })
  .catch((error) => console.log(error));
