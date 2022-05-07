const express = require(`express`);
const router = express.Router();

const blogController = require("../controllers/blogController");
const joiSchemaValidation = require('../middlewares/joiMiddleware');
const blogSchema = require('../models/joi/blogSchemas');

router.get(
    `/blog`,
    blogController.selectAll
);

router.get(
    `/blog/:id`,
    joiSchemaValidation.validate(blogSchema.selectBlogEntry, 'params'),
    blogController.selectById
);

router.post(
    `/blog`,
    blogController.create
);

router.put(
    `/blog/:id`,
    joiSchemaValidation.validate(blogSchema.selectBlogEntry, 'params'),
    joiSchemaValidation.validate(blogSchema.updateBlogEntry, 'body'),
    blogController.update
);

router.delete(
    `/blog/:id`,
    joiSchemaValidation.validate(blogSchema.selectBlogEntry, 'params'),
    blogController.delete
);

module.exports = router;