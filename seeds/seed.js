const sequelize = require('../config/connect');
const {User, Post, Comment} = require('../models');

const userData = require('./userData.json')
const postData = require('./postData.json')
const commentData = require('./commentData.json')

const seedDataBase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })

    const posts = await Post.bulkCreate(postData, {
        returning: true
    })

    const comments = await Comment.bulkCreate(commentData, {
        returning: true
    })
}