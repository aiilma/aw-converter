const c = require("compress-images");
const path = require('path');

const gifResize = require('@gumlet/gif-resize');
const fs = require("fs");


let input = 'ins_.gif';
let output = 'insCROP.gif';

const buf = fs.readFileSync(input);
gifResize({
    crop: [0, 0, 100, 100],
})(buf).then(data => {

    fs.writeFile(output, data,  "binary",function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });

    console.log("'data' contains processed GIF.");
});




// crop('main', '1');
// crop('main', '2');

function crop(fileName, newName) {
    let input = `examples/${fileName}.gif`,
        output = "build/img/";

    c(input, output, {compress_force: false, statistic: true, autoupdate: true}, false,
        {jpg: {engine: false, command: false}},
        {png: {engine: false, command: false}},
        {svg: {engine: false, command: false}},
        {gif: {engine: "gifsicle", command: ["--colors=256", "--crop=0,0+-110x-0", "--lossy=100"]}},
        // {gif: {engine: "gifsicle", command: ["--colors", "256", "--crop", "516,0+-0x-0"]}},

        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            if (completed) {
                fs.rename(path.resolve(statistic.path_out_new), path.resolve(`build/img/${newName}.gif`), function (err) {
                    if (err) console.log('ERROR: ' + err);
                });
            }
        }
    );
}