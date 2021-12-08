const crypto = require('crypto')
const fs = require('fs')
credentials = fs.readFileSync('passwd',{encoding:"utf-8"})
credentials = (JSON.parse(String(credentials)))



for(key in credentials)
{
    derivedKey = crypto.pbkdf2Sync(credentials[key], 'salt', 100000, 64, 'sha512');
    derivedKey = derivedKey.toString('hex')
    credentials[key] = derivedKey
}

fs.writeFileSync('passwd', JSON.stringify(credentials),{encoding:"utf-8"})

