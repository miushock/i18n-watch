module.exports = parse_options

function parse_options(options) {
    let opts = {};
    if (options.length === 0) {
        return opts;
    }
    options.forEach(arg => {

        if (/^--/.exec(arg)) {
            pair = arg.split('=');
            if (pair.length === 2 && pair[0].length > 2) {
                opts[pair[0].slice(2)] = pair[1];
            }
            else {
                throw new Error(`invalid option '${arg}'`);
            }
        } else {
            throw new Error(`invalid option '${arg}'`);
        }
    });
    return opts;
}