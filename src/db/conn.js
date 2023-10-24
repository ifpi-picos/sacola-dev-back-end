const mongoose = require("mongoose")

async function main() {

    const mongoPassword = process.env.MONGO_PASSWORD
    const mongoLocalPassword = process.env.MONGO_LOCAL_PASSWORD

    try {
        mongoose.set("strictQuery", true)

        if (mongoLocalPassword === undefined) {
            await mongoose.connect(
                `mongodb+srv://condearmand:${mongoPassword}@cluster0.3nrm5es.mongodb.net/?retryWrites=true&w=majority`
            )
            console.log("Conectando com o banco hospedado na nuvem...")
        } else {
            await mongoose.connect(
                `mongodb://conde:${mongoLocalPassword}@localhost:27017/appTest?authSource=admin`
            )
            console.log("Conectando com o banco local...")
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main