const nodegit = require("nodegit");
const path = require("path");
const {tracklist} = require(path.resolve(process.cwd(), 'tracklist.json'));


module.exports = function (repoDir) {
    // var repoDir = args[0];
    const track = tracklist[repoDir];

    let repository;

// Open a repository that needs to be fetched and fast-forwarded
    return new Promise((resolve, reject) => {
        nodegit.Repository.open(path.resolve(process.cwd(), repoDir))
            .then(function (repo) {
                repository = repo;

                return repository.fetchAll({
                    callbacks: {
                        credentials: function (url, userName) {
                            return nodegit.Cred.sshKeyFromAgent(userName);
                        },
                        certificateCheck: function () {
                            return 0;
                        }
                    }
                });
            })
            // Now that we're finished fetching, go ahead and merge our local branch
            // with the new one
            .then(function () {
                return repository.mergeBranches(track.branch, `origin/${track.branch}`);
            })
            .done(function () {
                resolve();
                return console.log("Done!");
            });
    })
};
