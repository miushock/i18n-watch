module.exports = watch;

var fse = require('fs-extra');
var path = require('path');
var nodegit = require('nodegit');
var sh = require('shelljs');

function watch(args) {
    let repo_url = args[0];
    let repository;

    let parse_options = require('./common/parse_options.js');
    let options = parse_options(args.slice(1));
    let TrackList = require('./common/tracklist.js').TrackList;
    let tracklist = new TrackList();

    let repo_dir_tail = options['dir'] || repo_url.split('/').slice(-1)[0];
    let repo_dir = path.resolve(process.cwd(), repo_dir_tail);
    let i18n_path = options['i18n-path'] || './config/locale';
    let tracklist_item_key = repo_dir_tail;
    let tracklist_item_val = {
        "repo": repo_url,
        "i18n_path": i18n_path
    };

    tracklist.add(tracklist_item_key, tracklist_item_val);

    let sparse_co_config = path.resolve(repo_dir, '.git/info/sparse-checkout');

    fse.pathExists(repo_dir)
        //shallow clone
        .then(exists => {
            if (exists) {
                throw new Error('target dir already exist!')
            }
            if (sh.exec(`git clone --depth=1 ${repo_url} ${repo_dir}`).code !== 0) {
                throw new Error('clone failed!')
            }
            return nodegit.Repository.open(repo_dir)
        })

        //add source back to remote list
        .then(repo => {
            repository = repo;
            return nodegit.Remote.create(repo, 'upstream', repo_url);
        })

        //prepare for sparse checkout
        .then(() => {
            return repository.config();
        })
        .then(config => {
            config.setBool('core.sparsecheckout', 1);
        })
        .then(() => {
            fse.ensureFileSync(sparse_co_config);
            return fse.writeFile(sparse_co_config, 'config/locale/*');
        })

        //create and switch to i18n branch
        .then(() => {
            return repository.getHeadCommit();

        })
        .then(commit => {
            return repository.createBranch(
                'i18n',
                commit,
                0
            );
        })
        .then(ref => {
            sh.cd(repo_dir);
            if (sh.exec('git checkout i18n').code !== 0) {
                throw new Error('checkout failed!');
            }
        })
        .catch(error => {
            fse.remove(repo_dir);
            tracklist.remove(repo_dir_tail);
            console.log(error);
        })
}
