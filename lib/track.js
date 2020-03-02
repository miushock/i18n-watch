// const Git = require("nodegit");

const fse = require('fs-extra');
const path = require('path');
const {userInfo} = require(path.resolve(process.cwd(), 'tracklist.json'));
// var nodegit = require('nodegit');
// var sh = require('shelljs');

module.exports = function watch(args) {

    const repo_url = args[0];
    // let repository;
    // 获取命令行参数
    const parse_options = require('./common/parse_options.js');
    // 获取其它参数 并转化为对象
    let options = parse_options(args.slice(1));
    // 获取 tracklist 类
    let TrackList = require('./common/tracklist.js').TrackList;
    let tracklist = new TrackList();

    // 目录 --dir
    let repo_dir_tail = options['dir'] || repo_url.split('/').slice(-1)[0];
    // 组合出镜像下载目录
    let repo_dir = path.resolve(process.cwd(), repo_dir_tail);
    //
    let i18n_path = options['i18n_path'] || './config/locale';

    const branch = options['branch'] || 'master';

    // 追加 tracklist.json 配置文件
    let tracklist_item_key = repo_dir_tail;
    let tracklist_item_val = {
        repo: repo_url,
        i18n_path: i18n_path,
        branch: branch,
    };
    tracklist.add(tracklist_item_key, tracklist_item_val);

    // let sparse_co_config = path.resolve(repo_dir, '.git/info/sparse-checkout');

    fse.pathExists(repo_dir)
        //shallow clone
        .then(exists => {
            if (exists) {
                throw new Error('target dir already exist!')
            }

            const cloneRepository = require('./server/cloneRepository');
            // console.log(userInfo.token, 'clone userInfo.token');
            return cloneRepository(repo_url, repo_dir, branch, userInfo.token);
        })

        .catch(error => {
            fse.remove(repo_dir);
            tracklist.remove(repo_dir_tail);
            console.log(error);
        });
};
