import {    user} from '../db/db.js'
const authenticateUser = async (req, res, next) => {
    const { username, password } = req.headers;
    const exist = await user.findOne({ username, password });
    if (exist) {
        next();
    } else {
        res.status(401).json({ msg: "User not authenticated" });
    }
};

export default authenticateUser;