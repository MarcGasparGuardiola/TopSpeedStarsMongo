const blogService = require("../services/blogService");
const c = require("../config/constants")


module.exports.create = async (req, res) => {
    
    console.log(req)
    const response = {
        status: c.status.serverError,
        msg: "Internal server error",
    };
    try {
        const resFromService = await blogService.create(req);
        if (resFromService.status) {
            response.status = c.status.created;
            response.msg = "Blog entry created";
            response.body = resFromService.result;
        }
    } catch (err) {
        console.log("ERROR-blogController-create: ", err);
        response.error = err;
    }
    res.status(response.status).send(response);
};

module.exports.selectAll = async (req, res) => {
    const response = { status: c.status.serverError, msg: 'Internal server error' };
    try {
        const queryParams = {};
        //if (req.query.country) queryParams.country = req.query.country;
        //if (req.query.city) queryParams.city = req.query.city;

        console.log(queryParams)
        const resFromService = await blogService.selectAll(queryParams);
        if (resFromService.status) {
            // response.status = c.status.ok;
            // response.body = resFromService.result;
            if (resFromService.result) {
                response.status = c.status.ok;
                response.msg = 'Blog entry found';
                response.body = resFromService.result;
            } else {
                response.status = c.status.notFound;
                response.msg = 'blog entry not found';
            }
        }
    } catch (err) {
        console.log('ERROR-blogController-selectAll: ', err);
        response.error = err;
    }
    res.status(response.status).send(response);
}


module.exports.update = async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
        const blog = req.body;
        blog.id = req.params.id;
        const responseFromService = await blogService.update(blog);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = `Blog entry updated successfully`;
            responseObj.status = 200;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-blogController-update: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.delete = async (req, res) => {
    const responseObj = { status: 500, message: `Internal server error` };
    try {
        const blogId = req.params.id;
        const responseFromService = await blogService.delete(blogId);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = `Blog entry removed successfully`;
            responseObj.status = 200;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-blogController-delete: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.selectById = async (req, res) => {
    const response = { status: c.status.serverError, msg: 'Internal server error' };
    try {
        const blogId = req.params.id;
        const resFromService = await blogService.selectById(blogId);
        if (resFromService.status) {
            if (resFromService.result) {
                response.status = c.status.ok;
                response.msg = 'Blog entry found';
                response.body = resFromService.result;
            } else {
                response.status = c.status.notFound;
                response.msg = 'Blog entry not found';
            }
        }
    } catch (err) {
        console.log('ERROR-blogController-selectById: ', err);
        response.error = err;
    }
    res.status(response.status).send(response);
}


