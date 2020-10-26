module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');
    return res.render('profile',{
        title: "Profile"
    });
}
module.exports.post = function(req,res){
    //res.end('<h1>Users Post</h1>');
    return res.render('Post',{
        title: "Post"
    });
}
