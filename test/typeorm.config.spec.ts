import * as chai from 'chai';
import * as sinon from 'sinon';
import * as typeorm from 'typeorm';
import { createConnection, Connection} from "typeorm";
import {connection} from '../server/typeorm.config';
import User from '../server/models/user.model';


const expect = chai.expect;


describe('test initialize typeorm',()=>{

    let testConnection:  any = {};

    beforeEach(async ()=>{
        //testConnection = sinon.mock(new Promise<typeorm.Connection>());

        /*testConnection = await typeorm.createConnection({
            name: "test",
            type: "sqljs",
            entities: [User]
        });*/

        /*sinon.stub(typeorm, 'createConnection').returns(
            new Promise<Connection>(()=>{ testConnection})
        )*/
    });

    it('returns database connection ',()=>{
        console.log(connection, testConnection);
        expect(connection).to.equal(testConnection);        
    });
});