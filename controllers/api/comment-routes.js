const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })

        res.status(200).json(commentData)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if (!commentData) {
            res.status(404).json({message: 'No comment found with that id'})
            return;
        }

        res.status(200).json(commentData)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router