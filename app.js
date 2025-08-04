const express = require('express');
const app = express();
const port = 3000;
const { logger } = require('./middlewares/loggerMiddleware');
const tasksRoute = require('./routes/tasksRoutes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger)

app.use("/tasks", tasksRoute);

// Health check endpoint
app.get('/ping', (req, res) => { 
    res.status(200).send("Pong");
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;