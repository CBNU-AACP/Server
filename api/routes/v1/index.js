const express = require('express');
const router = express.Router();
const {readdirSync} = require('fs');
const {join} = require('path');

readdirSync(join(__dirname))
    .filter((file)=>{if(file.search(/\.js/)==-1) return true})
    .forEach((file)=>{
        const route = require(join(__dirname, file));
        router.use(`/${file}`, route);
    });


module.exports = router;