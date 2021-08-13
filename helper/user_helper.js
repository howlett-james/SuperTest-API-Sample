import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const faker = require('faker')

const Token =
    '2719e848f891dcc82938d0df6045b6bc6a735c4c641060d5015739aa58821f28';
export const createRandomUserfaker = async()=>{
    const UserData ={
        email:faker.internet.email(),
        name: faker.name.firstName(),
        gender:"male",
        status:"active"
    };
    const res = await request
        .post('users')
        .set("Authorization",`Bearer ${Token}`)
        .send(UserData)

    console.log(res.body)   
        return res.body.data.id;
};

export const createRandomUser = async()=>{
    const UserData ={
        email:`testsample${Math.floor(Math.random()*999)}@gmail.com`,
        name:"Logan",
        gender:"male",
        status:"active"
    };
    const res = await request
        .post('users')
        .set("Authorization",`Bearer ${Token}`)
        .send(UserData)
        
        return res.body.data.id;
};
