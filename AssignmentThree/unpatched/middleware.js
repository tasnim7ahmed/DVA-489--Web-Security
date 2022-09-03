

const isAuthenticated = (req, res, next)=>{
    console.log('hereXX')
    var cookie = req.cookies.squeak_session

    if(cookie)
    {
        next()
      
    }
    else{
        res.redirect('/');
    }
}



module.exports = {isAuthenticated}