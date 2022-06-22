const fs = require('fs')

const postSignIn = (req, res) =>{
    const {username, password} = req.body;
    console.log(username+''+password)
    res.redirect('/home')
}

const getIndex = (req, res) =>{
    res.render('index.html');
}

const getHome = (req, res) =>{
    console.log('In getHome')
    fs.readFile(__dirname + '/public/home.html', 'utf8', (err, text) => {
        res.send(text);
    });
}


module.exports = {
  postSignIn,
  getIndex,
  getHome
};