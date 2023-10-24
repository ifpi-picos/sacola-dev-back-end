const request = require('supertest');
require('dotenv').config();
const port = process.env.PORT || 5000;
const host = `http://localhost:${port}`;
const mongoose = require('mongoose');
const {configDotenv} = require("dotenv");
const mongoLocalPassword = process.env.MONGO_LOCAL_PASSWORD

describe('Teste de integração para o cadastro de usuário', () => {
    beforeAll(async () => {
        await mongoose.connect(`mongodb://conde:${mongoLocalPassword}@localhost:27017/appTest?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await mongoose.connection.collection('users').deleteMany({});
    });


    it('Deve retornar status 201 e um objeto com o usuário cadastrado', (done) => {
        request(host)
            .post('/api/v1/users')
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .send({
                _id: 'r3KqG4388aUeceKldqC3OQJt5wA3',
                name: 'Teste',
                username: 'teste',
                email: 'teste@gmail.com',
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    })});

describe('Teste de integração para obter um usuário específico', () => {
    let userId;

    beforeAll(async () => {
        await mongoose.connect(`mongodb://conde:${mongoLocalPassword}@localhost:27017/appTest?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await mongoose.connection.collection('users').deleteMany({});

        const user = {
            _id: 'r3KqG4388aUeceKldqC3OQJt5wA3',
            name: 'Teste',
            username: 'teste',
            email: 'teste@gmail.com',
        };

        const response = await request(host)
            .post('/api/v1/users')
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .send(user);

        userId = response.body._id;
    });

    it('Deve retornar um usuário específico com status 200', (done) => {
        request(host)
            .get(`/api/v1/user`)
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res.body.user._id).toBe('r3KqG4388aUeceKldqC3OQJt5wA3');
                expect(res.body.user.name).toBe('Teste');
                expect(res.body.user.username).toBe('teste');
                expect(res.body.user.email).toBe('teste@gmail.com');
                done();
            });
    });
});

describe('Teste de integração para deletar um usuário específico', () => {
    let userId;

    beforeAll(async () => {
        await mongoose.connect(`mongodb://conde:${mongoLocalPassword}@localhost:27017/appTest?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await mongoose.connection.collection('users').deleteMany({});

        const user = {
            _id: 'r3KqG4388aUeceKldqC3OQJt5wA3',
            name: 'Teste',
            username: 'teste',
            email: 'teste@gmail.com',
        };

        const response = await request(host)
            .post('/api/v1/users')
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .send(user);

        userId = response.body._id;
    });

    it('Deve deletar um usuário específico com status 204', (done) => {
        request(host)
            .delete(`/api/v1/user`)
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .expect(204) // 204 indica que o usuário foi deletado com sucesso
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe('Teste de integração para atualizar um usuário específico', () => {
    let userId;

    beforeAll(async () => {
        await mongoose.connect(`mongodb://conde:${mongoLocalPassword}@localhost:27017/appTest?authSource=admin`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await mongoose.connection.collection('users').deleteMany({});

        const user = {
            _id: 'r3KqG4388aUeceKldqC3OQJt5wA3',
            name: 'Teste',
            username: 'teste',
            email: 'teste@gmail.com',
        };

        const response = await request(host)
            .post('/api/v1/users')
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .send(user);

        userId = response.body._id;
    });

    it('Deve atualizar um usuário específico com status 200', (done) => {
        request(host)
            .put(`/api/v1/user`)
            .set('Authorization', 'Bearer ' + 'r3KqG4388aUeceKldqC3OQJt5wA3')
            .set('Client_Token', process.env.CLIENT_TOKEN)
            .send({
                name: 'NovoNome',
                username: 'novo-username',
                email: 'novo-email@gmail.com',
            })
            .expect(200) // 200 indica que o usuário foi atualizado com sucesso
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // Verifique se os dados foram atualizados corretamente
                expect(res.body.user.name).toBe('NovoNome');
                expect(res.body.user.username).toBe('novo-username');
                expect(res.body.user.email).toBe('novo-email@gmail.com');
                done();
            });
    });
});


