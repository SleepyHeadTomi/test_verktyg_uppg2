// Importerar app-objektet från server-filen
const app = require("./server.js");

// Startar servern vid port 3000
app.listen(3000, function() {
    console.log("Server started at port 3000!");
});