const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session
        })

        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['text', 'date_created','user_id', 'post_id'],
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
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['text', 'date_created','user_id'],
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

        if (!postData) {
            res.status(404).json({message: 'No posts found with that id!'})
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error)
    }
})
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
           title: req.body.title,
           text: req.body.text 
        },
        {
            where: {
                id: req.params.id,
            }
        })

        if (!postData) {
            res.status(404).json({message: 'No posts found with that id!'})
            return;
        }

        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;