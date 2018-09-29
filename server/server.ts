import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import {initializePassport} from './passport.config';
import {initializeRouting} from './router.config';
import {initializeFunction} from './typeorm.config';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const startServer = async () =>{
  await initializeFunction().then(()=> console.log('connected'));

  initializePassport();

  initializeRouting(app, passport);

  app.listen(app.get('port'), () => {   
    console.log(('App is running at http://localhost:%d in %s mode'),
      app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
  });
}

startServer();
  
module.exports = app;
