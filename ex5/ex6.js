(function main(global) {
    var results = {};

    $.when(getFile("file1", results), getFile("file2", results), getFile("file3", results))
        .then(function () {
            console.log(results.file1);
            console.log(results.file2);
            console.log(results.file3);
            console.log("complete!");
        });

})(window);

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

