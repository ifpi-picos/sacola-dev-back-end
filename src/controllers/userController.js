const UserModel = require('../models/user');

const userController = {
    async createUser(req, res) {
        const { _id, name, username, email, photo } = req.body;
        try {
            const user = await UserModel.create({ _id, name, username, email, photo });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, username, email, photo } = req.body;
        try {
            const user = await UserModel.findById(id);
            if (user) {
                user.name = name;
                user.username = username;
                user.email = email;
                user.photo = photo;
                await user.save();
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            if (user) {
                await UserModel.findByIdAndDelete(id);
                res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;