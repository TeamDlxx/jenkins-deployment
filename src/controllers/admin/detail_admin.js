const {detail_admin}  = require('../../services/admin');
const {RENDER_BAD_REQUEST} = require('../../utils/utils'); 

const detail = async (req, res) => {
    try { 
        
        const {error, auth, error_message, data} = await detail_admin(req.params.id);

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
            message   : 'Admin Details',
            admin     : data.admin
        });     
    }
    catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = detail;