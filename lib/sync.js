const pull = require('./pull');
const push = require('./push');

module.exports = async function (args) {
    await pull(args[0]);
    setTimeout(async () => {
        await push(args[0]);
    }, 10000);

};