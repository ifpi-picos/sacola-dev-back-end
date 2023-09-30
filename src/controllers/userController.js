const UserModel = require('../models/user');
const {verifyIfUserExists} = require('./verifications');


// Funções do controller
const userController = {
    // Função para criar um novo usuário
    async createUser(userDTO) {
        try {
            const user = await UserModel.findById(userDTO._id);
            if (!user) {
                return await UserModel.create(userDTO);
            } else {
                throw new Error('Usuário já cadastrado!');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Função para buscar um usuário pelo id
    async getUser(id) {
        try {
            if (!id) throw new Error('Id não informado!');
            const user = await UserModel.findById(id);

            if (!user) {
                throw new Error('Usuário não encontrado!');
            }

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Função para buscar todos os usuários
    async getAllUsers(userDTO) {
        try {
            const users = await UserModel.find();
            if (users) {
                return users;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Função para atualizar um usuário
    async updateUser(userDTO) {
        const {id, name, username, email, photo} = userDTO;
        try {
            await verifyIfUserExists(id);
            const user = await UserModel.findById(id);
            if (user) {
                user.name = name;
                user.username = username;
                user.email = email;
                user.photo = photo;
                await user.save();
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Função para deletar um usuário
    async deleteUser(id) {
        try {
            if (await verifyIfUserExists(id)) {
                throw new Error('Usuário não encontrado!');
            }

            const user = await UserModel.findById(id);
            if (user) {
                await UserModel.findByIdAndDelete(id);
                return user;
            }

        } catch (error) {
            throw new Error(error.message);
        }
    },
}

module.exports = userController;