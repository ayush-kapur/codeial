const User = require('../models/users')

module.exports.profile = function(req,res){
    //res.end('<h1>User Profile</h1>');
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title: "Profile",
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    // check if the user making the request is same as the one logged in
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        // else show this error
        return res.status(401).send('Unauthorized');
    }
}
// module.exports.post = function(req,res){
//     //res.end('<h1>Users Post</h1>');
//     return res.render('post',{
//         title: "Post"
//     });
// }

// render the sign in page
module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: 'Sign In'
    });
}

// render the sign up page
module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: 'Sign Up'
    });
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','The passswords do not match');
        return res.redirect('back');
    }
    console.log(req.body);

    // if the passwords match find in the database
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            req.flash('error','error in finding user in signing up');
            return res.redirect('back');
        }
        // if not found create
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    req.flash('error','error in creating user during signing up');
                    return res.redirect('back');
                }
                req.flash('success','Account created successfully');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            req.flash('error','This email id is already registered');
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    // Set a flash message by passing the key, followed by the value, to req.flash()
    req.flash('success','logged in successfully');

    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    // Set a flash message by passing the key, followed by the value, to req.flash()
    req.flash('error','logged out successfully');
    
    return res.redirect('/');
}