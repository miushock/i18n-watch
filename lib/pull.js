var nodegit = require("nodegit");
var path = require("path");


module.exports = function (args) {
    var repoDir = "hello-world.git";

    var repository;

// Open a repository that needs to be fetched and fast-forwarded
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
            return repository.mergeBranches("test", "origin/test");
        })
        .done(function () {
            console.log("Done!");
        });
};
