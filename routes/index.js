const express = require('express');
const router = express.Router();
const upload = require('./multer');
const { PythonShell } = require('python-shell');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

router.get('/', function(req, res, next) {
 res.render('index', { title: 'Express' });
});

router.get('/output', function(req, res, next) {
 res.render('output');
});

router.post('/upload', upload.single("photo"), async function (req, res, next) {
    if (!req.file) {
     return res.status(400).send('No file uploaded');
    }
   
    try {
     const pythonProcess = spawn('python', ['./routes/python_scripts/predictornew.py', req.file.path]);
   
     const prediction = await new Promise((resolve, reject) => {
      let predictionData = '';
      pythonProcess.stdout.on('data', (data) => {
       predictionData += data.toString();
      });
      pythonProcess.on('close', (code) => {
       if (code === 0) {
        resolve(predictionData);
       } else {
        reject(new Error('Python script failed with code: ' + code));
       }
      });
     });
   
     const imageName = req.file.filename;
     const imagePath =  './public/images/uploads/' + imageName;
     console.log(imagePath);
     res.render('output', { prediction, imageName });
     setTimeout(() => {
        console.log('Image deletion delayed by 2000ms');
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          } else {
            console.log('Image deleted successfully after delay');
          }
        });
      }, 1000);
    } catch (error) {
     console.error(error);
     res.status(500).send('Error processing image');
    }
   });

module.exports = router;
