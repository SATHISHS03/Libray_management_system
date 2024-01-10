
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://sathishselvag03:oovfNIBNjpRZF2n3@sathishdb.dcnsrjv.mongodb.net/test');

const librarianschema = mongoose.Schema({
    username: String,
    password: String
});

const userschema = mongoose.Schema({
    username: String,
    password: String,
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }]
});

const booksschema = mongoose.Schema({
    Book_name: String,
    Published: String, 
    Quantity: Number
});

const librarian = mongoose.model('librarian', librarianschema);
const user = mongoose.model('User', userschema);
const books = mongoose.model('books', booksschema);

export { librarian, user, books };



