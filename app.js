const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('assets'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

mongoClient.connect('url', (err, db) => {

        if (!err) {
            let todo = req.body.todo;
            let collection = db.collection('dogsCollection');

            const find = collection.find();

            find.toArray((err, results) => {

                res.render('index', {
                    list: results
                });
            });
        }
        db.close();
    });

});

app.post('/addTodo', (req, res) => {

    mongoClient.connect('url', (err, db) => {
        
        if (!err) {
            let todo = req.body.todo;
            let collection = db.collection('dogsCollection');

            collection.insert({
                reminder: todo
            });
            
        }
        db.close();
        })
    res.sendStatus(200);
});

app.post('/removeTodo', (req, res)=> {
    
    mongoClient.connect('url', (err, db) => {
        
        if (!err) {
            let todo = req.body.todo;

        }
    });

});
    



app.listen(3000, () => {
    console.log('Ouvindo na 3000');
});
