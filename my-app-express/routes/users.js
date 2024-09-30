const express = require('express');
const router = new express.Router();

const users = [{ name: 'syed', email: 'tuaha17@gmail.com' }];

router.get('/', (_, res) => { //default
    res.send('Your Express App');
});

router.get('/users', (_, res) => { //list of all users
    res.json({ ok: true, users});
});

router.post('/adduser', (req, res) => { //add new user
    const { name, email } = req.body;
    if( name && email ){
        users.push({ name, email });
        res.json({ ok: true, users });
    }
});

router.get('/user/:name', (req, res) => { //getting specific user
    const { name } = req.params;
    const user = users.filter((user) => user.name === name )[0];
    res.json({ ok: true, user });
});

module.exports = router;
