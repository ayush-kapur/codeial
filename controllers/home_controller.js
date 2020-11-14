const { populate } = require('../models/posts');
const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for Codeial</h1>');
    // console.log(req.cookies);//to request a 
    // res.cookie('user_id',25);
    
    // cannot access the user database given we have the id
    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('Error in fetching posts from db');
    //         return;
    //     }
    //     return res.render('home',{
    //         title: "Home",
    //         post_list: posts
    //     });
    // })

    // we use populate command(available in mongoose) to access the user database
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        if(err){
            console.log('Error in fetching posts from db');
            return;
        }
        User.find({},function(err,users){
            return res.render('home',{
                title: "Home",
                post_list: posts,
                all_users: users
            });
        });
    })
}
