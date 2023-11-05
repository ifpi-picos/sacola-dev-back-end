const UserModel = require("../models/user");
const {verifyIfUserExists} = require('../utils/verifications');
const {getSteamGameById} = require("../services/steamApi/steam");

const steamController = {
    //Função para adicionar o steamId do usuário
    async addSteamId(id, steamId) {
        try {
            await verifyIfUserExists(id);
            const user = await UserModel.findById(id);
            if (user) {
                user.storeKeys.steam = steamId;
                await user.save();
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    //Função para pegar o steamId do usuário
    async getSteamId(id) {
        try {
            await verifyIfUserExists(id);
            const user = await UserModel.findById(id);
            if (user) {
                return user.storeKeys.steam;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    //Função para adicionar os jogos steam do usuário
    async addSteamGames(id, games) {
        try {
            await verifyIfUserExists(id);
            const user = await UserModel.findById(id);
            if (user) {
                user.userGames.games = {steam_game_count: games.response.game_count, steam: games.response.games};
                user.userGames.games_total = games.response.game_count;
                await user.save();
                return user;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getSteamGameInfo(steamGameId) {
        try {
            return await getSteamGameById(steamGameId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = steamController;