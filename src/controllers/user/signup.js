const {validate} = require('../../utils/validation/validation');
const {signup_user}  = require('../../services/user');
const {RENDER_BAD_REQUEST} = require('../../utils/utils'); 

const signup = async (req, res) => {
    try { 
        //validate Request Body for user signup
        try{
            await validate(req.body);
        }
        catch(e){
            return res.status(400).json({code:400,message:e.details[0].message.replace(/\"/g, "")})
        } 
         
        const {error, auth, error_message, data} = await signup_user(req.body);

        if (error) {
            return res.status(400).json({
                code : 400,
                message: error_message 
            })
        }

        if (!auth) {
            return res.status(403).json({
                code : 403,
                message: error_message
            })
        }
 
        res.status(200).json({
            code      : 200,
            message   : 'Admin Added successfully',
            adminUser : data.admin
        });     
    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = signup;