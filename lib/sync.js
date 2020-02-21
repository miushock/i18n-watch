const pull = require('./pull');

module.exports = async function (args) {
    await pull(args[0]);
};