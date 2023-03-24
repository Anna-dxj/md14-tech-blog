const router = require('express').Router();
const { User, Post, Comment } = require ('../models');
const withAuth = require('../utils/auth');

//Home page, get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

//View individual project info more details
router.get('/post-details/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,{
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        }); 

        const commentData = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        const post = postData.get({plain: true});
        const comments = commentData.map((comment) => comment.get({plain: true}));

        res.render('post-details', {
            post,
            comments,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// // View dashboard and own posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,   
            },
            include: {
                model: User,
                attributes: ["name"]
            }
        });
        
        const posts = postData.map((post) => post.get({plain: true}));

        res.render('dashboard', {
            posts,
            logged_in: true,
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        const posts = postData.get({plain: true});

        res.render('edit', {
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (error) {
        res.status(500).json(error)
    }
});



router.get('/login', (req, res) => {
    if (req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
})

router.get('/new-post', withAuth, (req, res) => {
    res.render('new-post',{
        logged_in: true,
    })
})

module.exports = router;