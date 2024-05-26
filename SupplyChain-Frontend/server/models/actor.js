const mongoose = require('mongoose');

const actorSchema = mongoose.Schema({
                    actor_address: {type: String, require: true},
                    role: {type: String, require: true},
                    actor_name: {type: String, require: true}
                }, {collection: 'Actor'});

const Actor = mongoose.model('Actor',actorSchema);

module.exports = Actor;