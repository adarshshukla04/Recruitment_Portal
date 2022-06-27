const db          = require('../utils/db');
const fs          = require('fs');
const mail        = require('../utils/mail');
const ejs         = require('ejs');
const res         = require('express');
const fileupload  = require('express-fileupload');
const {v4: uuid4} = require('uuid');
const bcrypt      = require('bcrypt');

exports.addjobget = (req, res) => {
    res.render('addjob');
}

exports.addjob = (req, res) =>{
    const {title, company, desc, status, link} = req.body;
    var uid = uuidv4();
    var imgurl = "";

    if (req.files) {
        var file = req.files.jobImage;
        imageurl = uid + '.jpg';
        file.mv('AppData/jobImg/' + imgurl, function(err){
            if (err) {
                console.log(err);
            }else {
                console.log("Image Uploaded :)");
            }
        })
    } else {
        console.log('No files found :(');
    }
}