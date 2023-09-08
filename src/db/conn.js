const mongoose = require("mongoose")

async function main() {

    const mongoPassword = "aqPfieucDnRKzWui"

    try {
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            `mongodb+srv://condearmand:${mongoPassword}@cluster0.3nrm5es.mongodb.net/?retryWrites=true&w=majority`
        )

        console.log("Conectado com o banco!")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main