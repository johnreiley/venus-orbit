const express = require('express');
const app = express();
const nocache = require('nocache');
app.use(nocache());

app.set('etag', false)

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    next()
  })
app.use(express.static('./'));

app.listen(3333);
console.log('its working');