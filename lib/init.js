module.exports = init

var fse = require('fs-extra')
var path = require('path')

function init(args) {
    create_empty_tracklist()
}

function create_empty_tracklist() {
    fse.writeFile(path.resolve(process.cwd(), 'tracklist.json'), JSON.stringify({project_root:process.cwd(),tracklist:{}},null, "\t"), 'utf8')
    .catch(err => {
        console.log(err)
    })
}