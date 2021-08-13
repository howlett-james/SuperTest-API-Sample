import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest('https://gorest.co.in/public-api/');

const Token =
    '2719e848f891dcc82938d0df6045b6bc6a735c4c641060d5015739aa58821f28';
describe('USERS',()=>{
    let UserID;
    describe('POST', () => {
        it('/Users', () => {
            const data ={
                email:`testsample${Math.floor(Math.random()*999)}@gmail.com`,
                name:"Logan",
                gender:"male",
                status:"active"
            };
            return request
                .post('users')
                .set("Authorization",`Bearer ${Token}`)
                .send(data)
                .then((res)=>{
                    expect(res.body.data).to.deep.include(data);
                    UserID = res.body.data.id;
                    console.log(res.body);
            });
        });
    });

    describe('GET', () => {
        it('/Users',()=>{
            return request.get(`users?access-token=${Token}`).then((res)=>{
                expect(res.body.data).to.not.be.empty;
            });
        });
        it('/Users/:id',()=>{
            return request.get(`users/${UserID}?access-token=${Token}`).then((res)=>{
                expect(res.body.data.id).to.be.eq(UserID);  
            });
        });
        it('/Users with query params',()=>{
            const url = `users?access-token=${Token}&page=5&gender=female&status=active`
    
            return request.get(url).then((res)=>{
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach((data)=>{
                    expect(data.gender).to.be.eq('female');
                    expect(data.status).to.be.eq('active');
                });
            });
        });        
    });

    describe('PUT', () => {
        it('/Users/:id', () => {
            const data={
                name:`Victor_${Math.floor(Math.random()*999)}`
            }
            return request
            .put(`users/${UserID}`)
            .set("Authorization",`Bearer ${Token}`)
            .send(data).then((res)=>{
                expect(res.body.data).to.deep.include(data);
            })
        });
    });
    
    describe('DELETE', () => {
        it('/Users/:id', () => {
            return request
            .delete(`users/${UserID}`)
            .set("Authorization",`Bearer ${Token}`)
            .then(res=>{
                expect(res.body.data).to.be.eq(null);
            })
        });
    });   
});