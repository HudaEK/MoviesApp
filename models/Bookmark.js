var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
    // Campo 'user' que almacena el ObjectId de un documento del modelo 'User'
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    addeddate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);