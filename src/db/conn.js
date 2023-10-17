const mongoose = require("mongoose")

async function main() {

    const mongoPassword = process.env.MONGO_PASSWORD

    try {
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            `mongodb+srv://condearmand:${mongoPassword}@cluster0.3nrm5es.mongodb.net/?retryWrites=true&w=majority`
        )

        // await mongoose.connect(
        //     `mongodb://conde:montepicos@localhost:27017/tests?authSource=admin`
        // )

        console.log("Conectado com o banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main