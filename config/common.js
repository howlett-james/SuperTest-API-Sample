import data from '../config/data';
import supertest from 'supertest';
const request = supertest(data.baseURL);
export default request;