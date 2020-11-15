const Comment = require('../models/comments');
const Post = require('../models/posts');

// module.exports.create = function(req,res){
//     Post.findById(req.body.post,function(err,post){
//         if(post){
//             Comment.create({
//                comment: req.body.comment,
//                user: req.user._id,
//                post: req.body.post 
//             },function(err,comment){
//                 if(err){
//                     console.log('error in creating a comment');
//                     return;
//                 }
//                 // to update we do the following
//                 post.comments.push(comment);
//                 // after evry post post command you need to add save in order to lock the changes
//                 post.save();
//                 return res.redirect('back');
//             })
//         }
//     });
// }

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                comment: req.body.comment,
                user: req.user._id,
                post: req.body.post 
            });
            // to update we do the following
            post.comments.push(comment);
            // after evry post post command you need to add save in order to lock the changes
            post.save();
            return res.redirect('back');
        }

    }catch(err){
        console.log('error in creating a comment',err);
        return;
    }
}

// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId,{$pull: {comment: req.params.id}},function(err,post){
//                 return res.redirect('back');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{$pull:
            {comment: req.params.id}});

            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}