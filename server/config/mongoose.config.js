const mongoose = require('mongoose');

module.exports = {
    configureDB: () => {
        mongoose.connect("mongodb://localhost/ProductosDB")
            .then(() => console.log("Established a connection to the database"))
            .catch((err) => console.log("Something went wrong when connecting to the database", err))
            //console.log(mongoose.connection.readyState)
    }
}