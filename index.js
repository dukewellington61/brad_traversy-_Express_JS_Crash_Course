const express = require('express');
const path = require('path');
// express-handlebars -> template engine
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger.js');
const members = require('./Members');


const app = express();

// Init middleware --> everytime a request is made, this middleware is gonna run
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'})); /* sets template engine to handlebars, layout is called 'main'  */
app.set('view engine', 'handlebars'); /* sets view engine to handlebars */

// Body Parser Middleware - to parse data in body of post and put request into json
app.use(express.json());
app.use(express.urlencoded({ extended: false })); /* to access data send from a html form */

// Homepage Route (if static folder is put above this the index.html in the publich folder is beeing rendered)
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members: members
}));

// Set static folder
// app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));