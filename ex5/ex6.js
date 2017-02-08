(function main(global) {
    var results = {};

    var prom1 = jQuery.Deferred();
    var prom2 = jQuery.Deferred();
    var prom3 = jQuery.Deferred();

    $.when(getFile("file1", results))
        .then(function () {
            prom1.resolve();
        });

    $.when(getFile("file2", results))
        .then(function () {
            prom2.resolve();
        });

    $.when(getFile("file3", results))
        .then(function () {
            prom3.resolve();
        });

    $.when(prom1.promise())
        .then(function () {
            console.log(results.file1);
        });

    $.when(prom1.promise(),prom2.promise())
        .then(function () {
            console.log(results.file2);
        });

    $.when(prom1.promise(), prom2.promise(), prom3.promise())
    .then(function () {
        console.log(results.file3);
        console.log("complete!");
    });

})(window);



function printResults(results) {
    console.log(results.file1);

}

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

