const http = require('http');
const app = require("./app");

//initializing server
const server = http.createServer(app);

//assigning port
let port = process.env.PORT||3000;
server.listen(port);

//adding event listeners
server.on('listening', () => {
    console.log(`Listening to port ${port}...`);
})

server.on('error', err => {
    console.log(err);
})