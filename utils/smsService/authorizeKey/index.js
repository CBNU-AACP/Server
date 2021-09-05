const {AUTHORIZE_KEY} = require('../../../env');

const makeKey = () => {
    const random = Math.floor(Math.random()*1000000);
    const result = (random+parseInt(AUTHORIZE_KEY)).toString().slice(-5,-1);
    return result
}

module.exports = {makeKey};