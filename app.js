const  express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    morgan = require('morgan');

const todosRouter = require('./controllers/todos');
const middleware = require('./utils/middleware');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', (req, res) => res.send('Welcome to todo app'));
app.use('/api/todos', todosRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(port, () => console.log(`Server is running on ${port}`));

module.exports = app;