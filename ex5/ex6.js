(function main(global) {
    var results = {};
    var f1results = '';
    var f2results = '';
    var f3results = '';
    //$.when(getFile("file1", f1results), getFile("file2", f2results), getFile("file3", f3results))
    //    .then(function () {
    //        console.log(f1results);
    //        console.log(f2results);
    //        console.log(f3results);
    //        console.log("complete!");
    //    });
    //testit(f1results);
    //console.log(f1results);
})(window);

function testit(valret) {
    valret = 'abcdef';
}
function getFile(file,results) {
    var deferred = jQuery.Deferred();
    fakeAjax(file, function (text) {
        results = text;
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

