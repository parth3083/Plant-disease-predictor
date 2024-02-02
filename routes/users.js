// const fs = require('fs');

// const directoryPath = 'D:\\Code\\Web Development\\project\\backhand\\plant_disease\\routes\\python_scripts';
// const filePath = 'D:\\Code\\Web Development\\project\\backhand\\plant_disease\\routes\\python_scripts\\model_trained.pt';

// fs.access(directoryPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
//     if (err) {
//         console.error('Directory access error:', err);
//     } else {
//         console.log('Directory has read and write permissions:', directoryPath);
//     }
// });

// fs.access(filePath, fs.constants.R_OK, (err) => {
//     if (err) {
//         console.error('File access error:', err);
//     } else {
//         console.log('File has read permission:', filePath);
//     }
// });
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
