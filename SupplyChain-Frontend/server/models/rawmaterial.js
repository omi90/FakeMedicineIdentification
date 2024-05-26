const mongoose = require('mongoose');

const rawmaterialSchema = mongoose.Schema({
                    rawmaterialid: {type: BigInt,require: true},
                    rawmaterialname: {type: String,require: true},
                    supplier_address: {type: String,require: true}
                }, {collection: 'RawMaterial'});

const RawMaterial = mongoose.model('RawMaterial',rawmaterialSchema);

module.exports = RawMaterial;