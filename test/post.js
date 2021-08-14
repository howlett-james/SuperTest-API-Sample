require('dotenv').config();
import { expect } from 'chai';
import request from '../config/common';
import { createRandomUser, createRandomUserfaker } from '../helper/user_helper';
const faker = require('faker');

const Token = process.env.User_Token;

describe('User Posts', () => {
    let postID,UserID;

    before(async() => {
        // UserID = await createRandomUser();
        UserID = await createRandomUserfaker();
    });

    it.only('/posts', async() => {
        const data ={   
            user_id: UserID,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
        }
        
        const PostRes = await request
            .post('posts')
            .set("Authorization",`Bearer ${Token}`)
            .send(data);

        // console.log(data)
        expect(PostRes.body.data).to.deep.include(data);
        postID = PostRes.body.data.id;
    });
        
    
    it('GET /posts/:id', async() => {
        await request
        .get(`posts/${postID}`)
        .set("Authorization",`Bearer ${Token}`)
        .expect(200)
    });
    describe('Negative Tests', () => {
        it('401 Authentication Failed', async() => {
            const data ={   
                user_id: UserID,
                title: "My Sample Title",
                body: "My sample blog title post"
            }
            
            const PostRes = await request.post('posts').send(data);
            
        expect(PostRes.body.code).to.eq(401);
        expect(PostRes.body.data.message).to.eq("Authentication failed")
        });

        it('422 Validation Failed', async() => {
            const data ={   
                user_id: UserID,
                title: "My Sample Title"
                
            }
            
            const PostRes = await request
            .post('posts')
            .set('Authorization',`Bearer ${Token}`)
            .send(data);
        
        expect(PostRes.body.code).to.eq(422);
        expect(PostRes.body.data[0].field).to.eq("body")
        expect(PostRes.body.data[0].message).to.eq("can't be blank")
        });
    });
});
