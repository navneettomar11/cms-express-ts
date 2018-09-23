import * as express from 'express';
import * as homeController from './controllers/home-controller';
import * as userController from './controllers/user-controller';

export const initializeRouting = (app: express.Express, passport: any) =>{
    app.get('/',passport.authenticate('basic', { session: false }), homeController.index);
    app.post('/register',userController.register);
    
    app.use((err: any, req: express.Request, res: express.Response, nextFn: express.NextFunction)=>{
        console.log(err);
        res.status(err.status || 400);
        res.json({
        message: err.message,
        error: err
        });
    });
  


}

