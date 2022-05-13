module.exports.selectById = async (data) => {
    let response = { status: false };
    try {
        const doc = await data.model.findById(data._id, data.projection);
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-selectById: ", err);
    }
    return response;
};

module.exports.selectAll = async (data) => {
    let response = { status: false };
    try {
        // const doc = await data.model.find(data.findQuery, data.projection, {skip: data.skip, limit: data.limit});
        const doc = await data.model
            .find(data.findQuery, data.projection)
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-selectAll: ", err);
    }
    return response;
};

module.exports.findByName = async (data) => {
    let response = { status: false };
    try {
        // const doc = await data.model.find(data.findQuery, data.projection, {skip: data.skip, limit: data.limit});
        const doc = await data.model
            .find(data.findQuery, data.projection)
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-selectAll: ", err);
    }
    return response;
};

module.exports.create = async (obj) => {
    let response = { status: false };
    try {
        const doc = await obj.save();
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-create: ", err);
    }
    return response;
};

module.exports.update = async (data) => {
    let response = { status: false };
    try {
        const doc = await data.model.findOneAndUpdate(
            data._id,
            data.updateQuery,
            { projection: data.projection, new: true }
        );
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-update: ", err);
    }
    return response;
};

module.exports.delete = async (data) => {
    let response = { status: false };
    try {
        const doc = await data.model.findOneAndDelete(data.findQuery);
        response = {
            status: true,
            result: doc,
        };
    } catch (err) {
        console.log("ERROR-repository-delete: ", err);
    }
    return response;
    
};

module.exports.findOne = async (data) => {
    let responseObj = { status: false };
    try {
        const doc = await data.model.findOne(data.findQuery);
        responseObj = {
            result: doc,
            status: true,
        };
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-crudRepository-findOne: ${error}`);
    }
    return responseObj;
};
