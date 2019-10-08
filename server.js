const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');

//set storage engine

const storage = multer.diskStorage({
    destination: './Front-End/src/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload Var

const upload = multer({
    storage: storage
}).single('file')
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('./Front-End/src/uploads'));

app.get('/', (req,res) => res.render('index'));

app.post('/upload', (req,res) => {
    upload(req, res, (err) =>{
        if(err){
            
        }else{
        console.log(req.file)}
    });
})
const port = 7000;

app.listen(port, () => console.log(`Server started on port ${port}`))