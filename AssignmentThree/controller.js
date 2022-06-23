const fs = require('fs')

const postSignIn = (req, res) =>{
    const {username, password} = req.body;
    credentials = fs.readFileSync('passwd',{encoding:"utf-8"})
    credentials = (JSON.parse(String(credentials)))
    let flag = false
    for (let credential in credentials){
        data = (credentials[credential])
        if(data['username']==username && data['password']==password)
        {
            flag = true
            break
        }
    }
    sessID = Math.floor(100000 + Math.random() * 900000)
    squeak_session = '{"sessionid":"'+sessID+'","username":"'+username+'"}'
    squeak_session = JSON.parse(squeak_session)

    console.log(JSON.stringify(squeak_session))
    if(flag)res.redirect('/home')
}

const postSignUp = (req, res) =>{
    const {username, password, signupusername, signuppassword} = req.body;
    credentials = fs.readFileSync('passwd',{encoding:"utf-8"})
    credentials = (JSON.parse(String(credentials)))
    let flag = false
    let cnt = 1;
    for (let credential in credentials){
        cnt+=1
        data = (credentials[credential])
        if(data['username']==signupusername)
        {
            flag = true
            break
        }

    }
    if(flag){
        console.log("Username exists!")
    }else{
        new_cred = JSON.stringify(credentials)
        new_cred = new_cred.slice(0, new_cred.length-1)
        new_cred+=',"'+cnt+'": {"username":"'+signupusername+'", "password":"'+signuppassword+'"}}'
        new_cred = JSON.parse(new_cred)
        fs.writeFileSync('passwd', JSON.stringify(new_cred))
        console.log("Account successfully created!")
        res.redirect('/')
    }
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
  getHome,
  postSignUp
};