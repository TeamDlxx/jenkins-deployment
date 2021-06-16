
module.exports.WRONG_HTTP_METHOD = (req, res) => {

    res.json(status=405, {
        code: 405,
        message: 'Http Method not allowed'
    });

};
