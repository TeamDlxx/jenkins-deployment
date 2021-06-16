const {WebsiteSetting}     = require('../../src/models/website_settings'); 

//adding website settings 
const  addWebsiteSetting = async (body, user_id) => { 
    let website_setting = new WebsiteSetting({
        support_email : body.support_email,
        privacy_policy  : body.privacy_policy,
        terms_and_conditions    : body.terms_and_conditions, 
    });

    website_setting = await website_setting.save(); 
    return website_setting;
};

// Getting Website Settings
const getWebsiteSetting = async () => {
    const website_setting = WebsiteSetting.findOne();
    return website_setting;
};

module.exports = {
    addWebsiteSetting,
    getWebsiteSetting
};