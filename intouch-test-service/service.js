const feathers = require('feathers');
const bodyParser = require('body-parser');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const memory = require('feathers-memory');

// Create a feathers instance.
const app = feathers()
    // Enable REST services
    .configure(rest())
    // Enable REST services
    .configure(socketio())
    // Turn on JSON parser for REST services
    .use(bodyParser.json())
    // Turn on URL-encoded parser for REST services
    .use(bodyParser.urlencoded({ extended: true }));

// Create an in-memory Feathers service with a default page size of 2 items
// and a maximum size of 4
app.use('/test', memory({
    paginate: {
        default: 5,
        max: 5
    }
}));

const service = app.service('test');
service.on('created', message => console.log('Created a message in test microservice'));
// Start the server.
const port = 3001;

app.listen(port, function () {
    console.log(`Feathers test listening on port ${port}`);
});