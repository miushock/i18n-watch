
const fse = require('fs-extra');
const path = require('path');

module.exports = function init(args) {
    // console.log(args, 'AAAAA');
    const parse_options = require('./common/parse_options.js');
    let options = parse_options(args);
    // console.log(options);
    const initJson = {
        project_root: process.cwd(),
        userInfo: {
            userName: options.user_name,
            email: options.email,
            token: options.token,
        },
        tracklist: {}
    };
    create_empty_tracklist(initJson);
};

function create_empty_tracklist(initJson) {
    fse.writeFile(path.resolve(process.cwd(), 'tracklist.json'), JSON.stringify(initJson, null, "\t"), 'utf8')
        .catch(err => {
            console.log(err)
        });
}