const mongoose = require('mongoose');
const Blog = require('../models/db/blogModel');
const repository = require('../database/repository');
const c = require('../config/constants')


module.exports.selectAll = async (queryParams) => {
    const response = { status: false };
    try {
        const data = {
            findQuery: queryParams,
            model: Blog,
            projection: {
                __v: false
            }
        };

        const resFromRepo = await repository.selectAll(data);
        if (resFromRepo.status) {
            response.result = resFromRepo.result;
            response.status = true;
        }
    } catch (err) {
        console.log('ERROR-blogService-selectAll: ', err);
    }
    return response;
}

module.exports.create = async (dataFromController) => {
    const responseObj = { status: false };
    try {
        const blog = new Blog(dataFromController.body);
        const responseFromRepository = await repository.create(blog);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-cityService-create: ${error}`);
    }
    return responseObj;
};


module.exports.update = async (blog) => {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: { _id: mongoose.Types.ObjectId(blog.id) },
            model: Blog,
            projection: { __v: false },
            updateQuery: {}
        };
        if (blog.title) data.updateQuery.title = blog.title;
        if (blog.text) data.updateQuery.text = blog.text;
        const responseFromRepository = await repository.update(data);
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-blogService-update: ${error}`);
    }
    return responseObj;
};

module.exports.delete = async (blogId) => {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: { _id: mongoose.Types.ObjectId(blogId) },
            model: Blog,
            projection: { __v: false }
        };
        const responseFromRepository = await repository.delete(data);
        if (responseFromRepository.status) {
            if (responseFromRepository.result) {
                responseObj.result = responseFromRepository.result;
            } else {
                responseObj.result = c.status.notFound;
                responseObj.message = "blog not found";
            }

            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-blogService-delete: ${error}`);
    }
    return responseObj;
};


module.exports.selectById = async (blogId) => {
    const response = { status: false };
    try {
        const data = {
            _id: mongoose.Types.ObjectId(blogId),
            model: Blog,
            projection: {

            }
        };
        const resFromRepo = await repository.selectById(data);
        if (resFromRepo.status) {
            response.result = resFromRepo.result;
            response.status = true;
        }
    } catch (err) {
        console.log('ERROR-blogService-selectById: ', err);
    }
    return response;
}
