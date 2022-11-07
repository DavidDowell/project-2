const router = require("express").Router();
const sequelize = require("../../db/config");
const { Post, User, Comment, Vote, Tag, PostTag } = require("../../models");
const isAuthenticated = require('../../middleware/isAuthenticated');


router.get('/', isAuthenticated, (req, res) => {
    console.log(req.session);
        console.log('=============');
        Post.findAll({
            where: {
                user_id: req.session.id
            },
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                },
        ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true })
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.get('/comments/:id', isAuthenticated, (req, res) => {
//     Post.findByPk(req.params.id, {
//         attributes: [
//             'id', 
//             'post_content',
//             'title', 
//             'created_at',
//             [sequelize.literal('(SELECT COUNT (*) FROM vote WHERE post,id = vote.post_id'),'vote_count'],
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//     .then(dbPostData => {
//         if(dbPostData) {
//             const post = dbPostData.get({ plain: true });

//             res.render('comments', {
//                 post,
//                 loggedIn: true
//             });
//         } else {
//             res.status(404).end();
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err);
//     });
// });

module.exports = router;