

const isAuthenticated = (req, res, next)=>{
    console.log('hereXX')
    var cookie = req.cookies.squeak_session
    console.log(JSON.stringify(cookie))
    if(cookie)
    {
        next()
      
    }
    else{
        res.redirect('/');
    }
}



module.exports = {isAuthenticated}