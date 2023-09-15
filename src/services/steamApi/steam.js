//59E03C9C7E314A2ED499E82FEB427EBD
const SteamAPIKey = process.env.STEAM_API;
const SteamAPIKeyLocal = '59E03C9C7E314A2ED499E82FEB427EBD';

const steam = {
    async getGamesOwned(steamId) {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${SteamAPIKey}&steamid=${steamId}&format=json`;
        const response = await fetch(url);
        return await response.json();
    }
}

module.exports = steam;