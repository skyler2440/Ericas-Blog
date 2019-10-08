var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

var storage =   multer.diskStorage({
  // file upload destination
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('avatar');

app.use('/uploads', express.static('uploads'));
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
app.post('/api/upload',function(req,res){
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