import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import {initializePassport} from './passport.config';
import {initializeRouting} from './router.config';
import {connection} from './typeorm.config';

import { Connection } from 'typeorm';

dotenv.config();

const app = express();

connection.then((conn:Connection)=> console.log("mysql connected"));

app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initializePassport();

initializeRouting(app, passport);

app.listen(app.get('port'), () => {   
  console.log(('App is running at http://localhost:%d in %s mode'),
    app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

  
module.exports = app;