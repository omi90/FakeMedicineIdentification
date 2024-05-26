const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
                    productid: {type : BigInt,require: true},
                    rawmaterialid: {type : BigInt,require: true},
                    product_name: String,
                    manufacturer_address: String,
                    wholesaler_address: String,
                    distributor_address: String,
                    pharmacist_address: String
                }, {collection: 'Product'});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;