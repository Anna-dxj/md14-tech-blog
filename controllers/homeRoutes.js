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
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['text', 'date_created', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        }); 

        const post = postData.get({plain: true});

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// View dashboard and own posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.id,   
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
        
    }
})

router.get('edit/:id', withAuth, (req, res) => {
    try {
        const postData = Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['text', 'date_created', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        const posts = postData.get({plain: true});

        res.render('edit', {
            posts,
            logged_in: true,
        })
    } catch (error) {
        
    }
})

//log in
router.get('/login', (req, res) => {
    if (req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
})

module.exports = router;