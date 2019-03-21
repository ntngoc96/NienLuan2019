const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

const exec = require('child_process').exec;
const fileName = makeFileName();

// const nameOfLivestream = new Date();
var i = 0;
var imageFolder =[];
// const server =require('http').Server(app);
var server = app.listen(3000,()=>{
    console.log(`server listen on port 3k`)
});
const io = require('socket.io')(server);

// const wCap = new cv.VideoCapture(0);


app.get('/',(req,res)=>{
    // var a;
    
    res.sendFile(path.join(__dirname, 'index.html'));
});



function readFiles(dirname) {
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        return;
      }
      count();

      
      function count(){
        if(i<filenames.length){
            fs.readFile(dirname + filenames[i], function(err, content) {
                if (err) {
                    console.log(err);
                    return;
                }
                io.emit('image',content.toString('base64'));
                            
            console.log(`say hello ${filenames[i]}`);
            i++;
            setTimeout(count, 10);
            });
        };
      };
      
    }); //end of readir

    
};

main();
// readFiles('tmp/${fileName}/');
setInterval(() => {
    // console.log(i)
    readFiles(`tmp/${fileName}/`);
},500);




// run command
// ./mjpg_streamer -o "output_http.so -w ./www" -o "output_file.so -f ../../tmp -d 500" -i "input_uvc.so"


function makeFileName(){
  return new Date().toISOString().
  replace(/T/, '--').      // replace T with a space
  replace(/\..+/, '').    // delete the dot and everything after
  slice(0,-3);            // cut 3 element to get type YYYY-MM-DD HH:mm
}


/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
*/

async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd,
        {cwd : 'mjpg-streamer/mjpg-streamer-experimental/'},
        (err, stdout, stderr) => {
          if (err) {
            reject(err);
          } else {
            resolve({ stdout, stderr });
          }
    });
  });
}

async function main() {
  fs.mkdir(`./tmp/${fileName}`,(err)=>{
    console.log(err);
  })

  let { stdout } = await sh(`./mjpg_streamer -o "output_http.so -w ./www" -o "output_file.so -f ../../tmp/${fileName} -d 10" -i "input_uvc.so"`);
  
  //test test
  // let { stdout } = await sh(`./mjpg_streamer -o "output_http.so -w ../../" -i "input_uvc.so"`);

  // console.group(stdout) 
  for (let line of stdout.split('\n')) {
    console.log(`ls: ${line}`);
  }
}

