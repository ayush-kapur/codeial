const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
               comment: req.body.comment,
               user: req.user._id,
               post: req.body.post 
            },function(err,comment){
                if(err){
                    console.log('error in creating a comment');
                    return;
                }
                // to update we do the following
                post.comments.push(comment);
                // after evry post post command you need to add save in order to lock the changes
                post.save();
                return res.redirect('back');
            })
        }
    });
}