import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import {initializePassport} from './passport.config';
import {connection} from './typeorm.config';

import * as homeController from './controllers/home-controller';
import { UserDao } from './dao/user.dao';
import User from './models/user.model';
import { Connection } from 'typeorm';

dotenv.config();

const app = express();

connection.then((conn:Connection)=>{
  //console.log("mysql connected", conn.getRepository(User))
  let user = new User('abc@gmail.com ','John', 'Doe');
  user.password = 'abc';
  UserDao.save(user);
});



app.set('port', process.env.PORT || 3000);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err: any, req: express.Request, res: express.Response, nextFn: express.NextFunction)=>{
  res.status(err.status || 400);
  res.json({
    message: err.message,
    error: err
  });
})
initializePassport();
app.get('/',passport.authenticate('basic', { session: false }), homeController.index);
app.post('/login', passport.authenticate('login'))

app.listen(app.get('port'), () => {   
    console.log(('App is running at http://localhost:%d in %s mode'),
      app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
  });
  
  module.exports = app;