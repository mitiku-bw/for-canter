import express from 'express';
import cors from 'cors';
import bodyParser from  'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import socketIO from 'socket.io';
import Product from './models/product';

const app = express();
const router = express.Router();

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io =  socketIO(server);

io.on('connection', (socket) => {
    socket.emit('hello', {
        greeting: 'Hello user!'
    });
});

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://canter:canter0@ds119685.mlab.com:19685/canter-test');

const connection = mongoose.connection;//Bind connection to error event (to get notification of connection errors)
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


connection.once('open', () => {
    console.log('Mongodb database connection established successfully!');
});

router.route('/products').get((req, res) =>{
    Product.find((err, products) => {
        if(err)
            console.log(err);
        else
            res.json(products);
    });
});
router.route('/products/:id').get((req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if(err)
            console.log(err);
        else
            res.json(product);
    });
});
router.route('/products/add').post((req, res) => {
    let product = new Product(req.body); 

    product.save()
    .then(product => {
        res.status(200).json({'product': 'Added successfully'})
    .catch(err => {
        res.status(400).send('Failed to create new record');
    });
});

/*     product.save()
        .then(product => {
            res.status(200).json({'product': 'Added successfully'})
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
    }); */
});
router.route('/products/update:id').post((req, res) => {

    Product.findById(req.params.id, (err, product) => {
        if(!product)
            return next(new Error('Could not load document'));
        else{
            product.id = req.body.id;
            product.name = req.body.name;
            product.category = req.body.category;
            product.code = req.body.price;
            product.price = req.body.price;
            product.details.key = req.body.datails.key;
            product.details.value = req.body.datails.value;

            product.save().then(product=>{
                res.json('Update Done!');
            }).catch(err =>{
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/products/delete/:id').get((req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, product) => {
        if(err)
            res.json(err);
        else
            res.json('Removed successfully!');
    });
});

app.use('/', router);

app.get('/', (req, res) => res.send('Hello world!'));

server.listen(port, () => console.log(`API running on localhost:${port}`));
