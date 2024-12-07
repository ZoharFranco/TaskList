import request from 'supertest';
import app from './app';


describe('GET /', () => {
    it('Should return 200 - check if alive', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });
});

describe('GET /home', () => {
    it('Should return 404 - the route not exist', async () => {
        const response = await request(app).get('/home');
        expect(response.status).toBe(404);
    });
});


describe('POST /register', () => {
    it('Should return 200 - valid register request', async () => {
        const response = await request(app).post('/register').send({"username": "moshe", "password": "try"});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "User registered successfully"})
    });
});


describe('POST /register -> /login', () => {
    it('Should return 200 - valid register request', async () => {
        const response = await request(app).post('/register').send({"username": "moshe", "password": "try"});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "User registered successfully"})
    });

    it('Should return 200 - valid login request', async () => {
        const response = await request(app).post('/login').send({"username": "moshe", "password": "try"});
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("refreshToken")
        expect(response.body).toHaveProperty("token")
    });
});


describe('POST /register -> POST /login -> POST /task', () => {
    it('Should return 200 - valid register request', async () => {
        const response = await request(app).post('/register').send({"username": "moshe", "password": "try"});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({"message": "User registered successfully"})
    });

    let token: any;

    it('Should return 200 - valid login request', async () => {
        const response = await request(app).post('/login').send({"username": "moshe", "password": "try"});
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("refreshToken")
        expect(response.body).toHaveProperty("token")
        token = response.body['token'];

    });

    it('Should return 200 - valid create task request', async () => {
        const response = await request(app).post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "title": "hello",
                "description": "aoeu"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("title")
        expect(response.body).toHaveProperty("description")

    });


    // I should use like fixtures but no time to learn it well
});


