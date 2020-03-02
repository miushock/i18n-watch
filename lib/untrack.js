const fs = require('fs-extra');
var path = require('path');
const {TrackList} = require('./common/tracklist');

module.exports = function (args) {

    const repo_dir = args[0];

    if (!repo_dir) {
        return console.log('repo dir is required');
    }

    const trackList = new TrackList();
    // const list = trackList.getTracklist();

    // console.log(trackList, 'trackList');

    let untrackKey = repo_dir;

    // for (const [k, v] of Object.entries(list)) {
    //     // console.log(k, 'kk');
    //     if (v.repo === repo_url) {
    //         untrackKey = k;
    //         break;
    //     }
    // }

    if (!untrackKey) {
        return console.log('repo url : ' + repo_dir + ' is not exist');
    }
    // console.log(untrackKey, 'untrackKeyuntrackKey');
    trackList.remove(untrackKey);
    fs.removeSync(path.resolve(process.cwd(), untrackKey));

    console.log('repo url : ' + repo_dir + ' removed');
};