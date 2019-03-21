git clone "https://github.com/ntngoc96/NienLuan.git"

cd NienLuan

git clone "https://github.com/jacksonliam/mjpg-streamer"

cd mjpg-streamer

mkdir tmp //folder store video livestream

//run command of mjpg

Simple compilation
cd mjpg-streamer-experimental
make
sudo make install

Compile with debugging symbols
cd mjpg-streamer-experimental
make distclean
make CMAKE_BUILD_TYPE=Debug
sudo make install


Enable the experimental HTTP management feature
cd mjpg-streamer-experimental
mkdir _build
cd _build
cmake -DENABLE_HTTP_MANAGEMENT=ON ..
make
sudo make install

./mjpg_streamer -o "output_http.so -w ./www" -i "input_uvc.so"  //test mjpg working or not

//end of command of mjpg

cd NienLuan

npm install

//start script
npm run dev
