var fse = require('fs-extra')
var path = require('path')

class TrackList {

    constructor() {
        try {
            this.track_obj = fse.readJSONSync(path.resolve(process.cwd(),'./tracklist.json'))
            this.tracklist = this.track_obj['tracklist']
        }
        catch (err) {
            console.log(err)
        }
    }
    add(key, val) {
        if (!this.tracklist[key])
            this.tracklist[key] = val
        else
            throw new Error(`${key} Already Tracked`)
        fse.writeFileSync(path.resolve(this.track_obj.project_root, './tracklist.json'), JSON.stringify(this.track_obj, null, '\t'), 'utf8')
    }
    remove(key) {
        delete this.tracklist.key
        fse.writeFileSync(path.resolve(this.track_obj.project_root, './tracklist.json'), JSON.stringify(this.track_obj, null, '\t'), 'utf8')
    }
}

module.exports.TrackList = TrackList
