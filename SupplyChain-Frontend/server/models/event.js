const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
                    address: {type: String, require: true},
                    blockHash: {type: String, require: true},
                    blockNumber: {type: BigInt, require: true},
                    data: {type: String, require: true},
                    logIndex: {type: BigInt, require: true},
                    transactionHash: {type: String, require: true},
                    returnValues: {type:Object, require: true},
                    event: {type: String, require: true},
                    signature: {type: String, require: true}
                }, {collection: 'Event'});

const Event = mongoose.model('Event',eventSchema);

module.exports = Event;