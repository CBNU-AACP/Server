const express = require('express');
const router = express.Router();

router.get('/', async(req,res,next)=>{
    try {
        console.log('hihi');
        res.json("success");
    } catch (error) {
        console.error(error);
        next(error);
    }
})
module.exports = router;