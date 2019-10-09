var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://localhost:3001'
  }));
  

var storage =   multer.diskStorage({
  // file upload destination
  destination: function (req, file, callback) {
    callback(null, './avatars');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var multiStore = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './blogphoto');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
})

var multiUpload = multer({ storage: multiStore}).array('blogphoto', 2);
var upload = multer({ storage : storage}).single('avatar');

app.use('/avatars', express.static('avatars'));
app.use('/blogphoto', express.static('blogphoto'));
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
app.post('/api/blogphoto',function(req,res){
  multiUpload(req,res,function(err) {
      //console.log(req.body);
      //console.log(req.files);
      const files = req.files
      if(err) {
          return res.end("Error uploading file.");
          console.log(err)
      }
      res.json({fileName: files.map(file => file.filename), url: files.map(file => `http://localhost:8000/${file.path}`)});
      res.end("File is uploaded");
      console.log(files.map(file => file))
  });
});
app.post('/api/avatar',function(req,res){
    upload(req,res,function(err) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      const file = req.file
        if(err) {
            console.log(err)
        }
        
        res.json({fileName: file.filename, filePath: `http://localhost:8000/${file.path}`});
        res.end('file uploaded');
        console.log(file)
    });
});
app.listen(8000,function(){
    console.log("Working on port 8000");
});
