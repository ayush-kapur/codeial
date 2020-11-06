const User = require('../models/users')

module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');
    return res.render('profile',{
        title: "Profile"
    });
}
module.exports.post = function(req,res){
    //res.end('<h1>Users Post</h1>');
    return res.render('post',{
        title: "Post"
    });
}

// render the sign in page
module.exports.sign_in = function(req,res){
    return res.render('user_sign_in',{
        title: 'Sign In'
    });
}

// render the sign up page
module.exports.sign_up = function(req,res){
    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log('wrong password');
        return res.redirect('back');
    }
    console.log(req.body);

    // if the passwords match find in the database
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return
        }
        // if not found create
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user during signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
// module.exports.createSession = function(req,res){
    
// }