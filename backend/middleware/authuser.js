import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
    try {
        // console.log("Auth middleware");

        const { token } = req.headers;

        if (!token) {
            
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = token_decode.id;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default authuser;