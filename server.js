const express = require("express");
const http = require('http');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 80;
const multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage}).single('file');

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
    console.log(req.file.filename);    
    res.json({url: "./files/" + req.file.filename});    
  })
});

app.get('/filelist', (req, res) => {
    const directoryPath = path.join(__dirname, 'files');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Impossibile leggere la directory' });
        }
        const fileUrls = files.map(file => ({
            filename: file,
            url: '/files/' + file
        }));
        res.json(fileUrls);
    });
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server in esecuzione su http://localhost:${PORT}`));