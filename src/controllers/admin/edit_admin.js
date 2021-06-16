const {validateEditAdmin} = require('../../utils/validation/validateAdmin');
const {edit_admin}  = require('../../services/admin');
const {RENDER_BAD_REQUEST} = require('../../utils/utils'); 

const edit = async (req, res) => {
    try { 
        //validate Request Body
        try{
            await validateEditAdmin(req.body);
        }
        catch(e){
            return res.status(400).json({code:400,message:e.details[0].message.replace(/\"/g, "")})
        } 
         
        const {error, auth, error_message, data} = await edit_admin(req.body, req.params.id);

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
            message   : 'Admin Updated successfully',
            adminUser : data.admin
        });     
    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = edit;