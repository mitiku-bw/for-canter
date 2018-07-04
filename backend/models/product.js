import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Product = new Schema({
    id: { type: Number },
    name: { type: String },
    category: { type: String},
    code: { type: String }, 
    price: { type : Number },
    details: [
                {
                    key: { type: String },
                    value: { type: String }
                }
            ]
        }, {
            collection: 'products'
    });

export default mongoose.model('Product', Product);