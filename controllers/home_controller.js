module.exports.home = function(req,res){
    //return res.end('<h1>Express is up for Codeial</h1>');
   console.log(req.cookies);//to request a 
   res.cookie('user_id',25);
    return res.render('home',{
        title: "Home"
    });
}
