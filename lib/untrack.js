const {TrackList} = require('./common/tracklist');

module.exports = function (args) {
    // TODO:
    const repo_url = args[0];

    if (!repo_url) {
        return console.log('repo url is required');
    }

    const trackList = new TrackList();
    const list = trackList.getTracklist();

    // console.log(trackList, 'trackList');

    let untrackKey = '';

    for (const [k, v] of Object.entries(list)) {
        // console.log(k, 'kk');
        if (v.repo === repo_url) {
            untrackKey = k;
            break;
        }
    }

    if (!untrackKey) {
        return console.log('repo url : ' + repo_url + ' is not exist');
    }
    // console.log(untrackKey, 'untrackKeyuntrackKey');
    trackList.remove(untrackKey);
    console.log('repo url : ' + repo_url + ' removed');
};