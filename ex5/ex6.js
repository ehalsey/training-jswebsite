(function main(global) {
    var results = {};

    $.when(getFile("file1", results))
    .then(function () {
        $.when(writeResult(results.file1))
            .then(function () {
                $.when(writeResult(results.file2))
                            .then(function () {
                                writeResult(results.file3);
                                console.log("complete!");
                            })
            });
    });

    $.when(getFile("file2", results))
        .then(function () {
        });

    $.when(getFile("file3", results))
        .then(function () {
        });

})(window);

function writeResult(textOut) {
    var deferred = jQuery.Deferred();
    console.log(textOut);
    deferred.resolve();
    return deferred.promise();
}

function getFile(file,results) {
    var deferred = jQuery.Deferred();
    fakeAjax(file, function (text) {
        results[file] = text;
        deferred.resolve();
    });
    return deferred.promise();
}

function fakeAjax(url, cb) {
    var fake_responses = {
        "file1": "The first text",
        "file2": "The middle text",
        "file3": "The last text"
    };
    var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

    console.log("Requesting: " + url);

    setTimeout(function () {
        cb(fake_responses[url]);
    }, randomDelay);
}

