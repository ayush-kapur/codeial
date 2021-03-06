const Post = require('../models/posts');
const Comment = require('../models/comments');

// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },function(err,post){
//         if(err){
//             console.log('error in creating a post');
//             return;
//         }
//         return res.redirect('back');
//     })
// }

module.exports.create = async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // adding flash messages
        req.flash('success','Post published');
        
        return res.redirect('back');

    }catch(err){
        // console.log('error in creating a post',err);
        // adding flash messages
        req.flash('error',err);

        return res.redirect('back');
    }
}

// module.exports.destroy = function(req,res){
//     // find if the post exists
//     Post.findById(req.params.id,function(err,post){
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post: req.params.id},function(err){
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
        // find if the post exists
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            // adding flash messages
            req.flash('success','Post and associated comments deleted');

            return res.redirect('back');
        }
        else{
            // adding flash messages
            req.flash('error','You cannot delete the post');
            
            return res.redirect('back');
        }

    }catch(err){
        // console.log('Error',err);
        // adding flash messages
        req.flash('error',err);

        return res.redirect('back');
    }
}