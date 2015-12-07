var app = require('express')();
var Twitter = require('node-twitter');
var http = require("http");
var httpserver = http.createServer(app);
var io = require('socket.io').listen(httpserver);

var port = Number(process.env.PORT || 8080);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

httpserver.listen(port, function(){
  console.log('listening on *:8080');
});
 

var twitterStreamClient = new Twitter.StreamClient(
    'YdTcFc9eCTmxaH9sPexhnIEe2',
    'cslO5Krv82Wmbzq7hkRi5ZjVyVBPaEPtKfxCYEVGp2vtFk7AaR',
    '1597327297-CkipYyRCVqtOBLvo25AGB691jq6SxKG4QB4RCM9',
    'pAbl3L7y8N8QGiqeZJHfymhTfD5frANAl9dNQHFmFgYLz'
);

twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('tweet', function(tweet) {
    console.log(tweet.text);
    io.emit('incoming tweet', tweet.text);
});

twitterStreamClient.start(['#MacriPresidente', 'macri', 'presidente', 'kirchner']);