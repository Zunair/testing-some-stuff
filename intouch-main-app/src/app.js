const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const client = require('feathers/client');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const socketClient = require('feathers-socketio/client');
const io = require('socket.io-client');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const authentication = require('./authentication');

const mongodb = require('./mongodb');

// Microservices connect with sockets.
const testServiceSocket = io('http://localhost:3001');
const testMessageServiceSocket = io('http://localhost:3002');

const testServiceApp = client().configure(socketClient(testServiceSocket));
const testMessageServiceApp = client().configure(socketClient(testMessageServiceSocket));
// ---------------


const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Routing

// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Register microservices with main app
app.use('/test', testServiceApp.service('test'))
app.use('/messages', testMessageServiceApp.service('messages'))
// --------------------


// Set up Plugins and providers
app.configure(hooks());
app.configure(mongodb);
app.configure(rest());
app.configure(socketio());

app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);

const testService = testServiceApp.service('test')
testService.on('created', message => console.log('test-service Created a message: ', message));

const testMessageService = testMessageServiceApp.service('messages')
testMessageService.on('created', message => console.log('test-message-service Created a message: ', message));

module.exports = app;
