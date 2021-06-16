const {validateWebsiteSetting} = require('../../utils/validation/validateWebsiteSettings');
const {edit_website_setting}  = require('../../services/website_setting');
const {RENDER_BAD_REQUEST} = require('../../utils/utils'); 

const edit = async (req, res) => {
    try { 
        //validate Request Body
        try{
            await validateWebsiteSetting(req.body);
        }
        catch(e){
            return res.status(400).json({code:400,message:e.details[0].message.replace(/\"/g, "")})
        } 
         
        const {error, auth, error_message, data} = await edit_website_setting(req.body, req.params.id);

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
            message   : 'Settings Updated successfully',
        });     
    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = edit;