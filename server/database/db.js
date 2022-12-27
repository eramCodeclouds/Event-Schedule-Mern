const mongoose = require('mongoose');

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.slie3j2.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database Connected Successfully");
    } catch (e) {
        console.log(`Error while connect to the database ${e}`);
    }
}

module.exports = Connection;

