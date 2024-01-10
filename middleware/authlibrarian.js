import {librarian} from '../db/db.js'
const authenticateLibrarian = async (req, res, next) => {
    const { username, password } = req.headers;
    const exist = await librarian.findOne({ username, password });
    if (exist) {
        next();
    } else {
        res.status(401).json({ msg: "Librarian not authenticated" });
    }
};

export default authenticateLibrarian;