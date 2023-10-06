const router = require('express').Router();
const steam = require('../services/steamApi/steam');
const userController = require('../controllers/userController');
const steamController = require('../controllers/steamController');
const verifyToken = require('../middlewares/verifyToken');


// Create a new user
router.post('/users', verifyToken, async (req, res) => {
    const {_id, name, username, email, photo} = req.body;

    try {
        if (!_id || !name || !username || !email) {
            throw new Error('Campos inválidos!');
        }
        const user = await userController.createUser(
            {
                _id,
                name,
                username,
                email,
                photo,
            });
        res.status(201).json({message: 'Usuário criado com sucesso!', user: user});
    } catch (error) {
        if (error.message === 'Usuário já cadastrado!') {
            res.status(409).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
});

// Get all users
router.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json({message: 'Usuários encontrados com sucesso!', users: users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get a user by id
router.get('/user', verifyToken, async (req, res) => {
    const uid = req.uid;
    try {
        const user = await userController.getUser(uid);
        res.status(200).json({message: 'Usuário encontrado com sucesso!', user: user});
    } catch (error) {
        if (error.message === 'Usuário não encontrado!') {
            res.status(404).json({message: error.message});
        } else{
            res.status(500).json({message: error.message});
        }
    }
});

// Update a user by id
router.put('/user', verifyToken, async (req, res) => {
    const {id} = req.params;
    const {name, username, email, photo} = req.body;
    try {
        const user = await userController.updateUser({id, name, username, email, photo});
        res.status(200).json({message: 'Usuário atualizado com sucesso!', user: user});
    } catch (error) {
        if (error.message === 'Usuário não encontrado!') {
            res.status(404).json({message: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
});

// Delete a user by id
router.delete('/user', verifyToken, async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userController.deleteUser(id);
        res.status(200).json({message: 'Usuário deletado com sucesso!', user: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Rota para adicionar o steamID do usuário
router.post('/users/:id/steam', verifyToken, async (req, res) => {
    const {id} = req.params;
    const {steamId} = req.body;
    try {
        const user = await steamController.addSteamId(id, steamId);
        res.status(200).json({message: 'SteamID adicionado com sucesso!', user: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Add steam games to user
router.post('/users/:id/games', verifyToken, async (req, res) => {
    const {id} = req.params;
    try {
        const userSteamId = await steamController.getSteamId(id);

        const userGames = await steam.getGamesOwned(userSteamId);

        const user = await steamController.addSteamGames(id, userGames);
        res.status(200).json({message: 'Jogos adicionados com sucesso!', user: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = router;