const { 
    addWebsiteSetting,
    getWebsiteSetting
} = require('../DAL/website_setting');

// Edit Website Settings
const _edit_website_setting = async (body,resp) => { 

    const website_setting = await getWebsiteSetting();
   
    if(!website_setting) {
       addWebsiteSetting(body);
       return resp;
    }

   website_setting.support_email = body.support_email;
   website_setting.privacy_policy  = body.privacy_policy;
   website_setting.terms_and_conditions = body.terms_and_conditions;

   let editWebsiteSetting = await website_setting.save();

   if(!editWebsiteSetting) {
       resp.error = true;
       resp.error_message = 'Website Settings Update failed';
       return resp;
   }

   return resp;
} 

const edit_website_setting = async (body) => {
   let resp = {
       error: false,
       auth: true,
       error_message: '',
       data: {}
   };

   resp = await _edit_website_setting(body, resp);
   return resp;
}


// Get Website Settings
const _get_website_setting = async (resp) => { 

    const website_setting = await getWebsiteSetting();
 
    resp.data = {
        website_setting: website_setting
    };
   return resp;
} 

const get_website_setting = async () => {
   let resp = {
       error: false,
       auth: true,
       error_message: '',
       data: {}
   };

   resp = await _get_website_setting(resp);
   return resp;
}

module.exports = {
    edit_website_setting,
    get_website_setting
}