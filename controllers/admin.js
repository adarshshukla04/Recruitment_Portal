const db = require("../utils/db");
const url = require("url");
const fs = require('fs')
const mail = require("../utils/mail")
const ejs = require("ejs")
const res = require("express");
const fileupload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

exports.addstudentget = (req, res) =>{
    res.render("addstudent",  {role: req.session.role});
}

function notifyRegistration(student, pass){
    try{
        
        const mailOptions = {
            from: process.env.MAILUSERNAME,
            to: student.email,
            subject: 'Recruitment Portal: GEU & GEHU',
            text: `${student.name}, You have sucessfully registered with our recruitment portal. Your password for login is: ${pass}`,
            html: mail.createHTML(`${student.name},<br> You have sucessfully registered with our recruitment portal. Your password for login is: <b>${pass}</b>`),
        };
        //mail.sendMail(mailOptions);
    }catch(err){
        console.log(err);
    }
 }

 exports.addstudent = (req, res) =>{
    var file = req.file.studentcsv;
    //console.log(file)
   
 }

 /*
exports.addstudent = async(req, res) => {
    try {
        const file = req.files.studentcsv;
        await fs.writeFile(__basedir + "/appData/Temp/data.csv", file.data);
        const jsonArray = await csv().fromFile(__basedir + "/appData/Temp/data.csv");
        var count = 0;
        var errorArray = []
        for (var i = 0; i < jsonArray.length; i++) {
            //var pass = nanoid();
            try {
                console.log(jsonArray[i]["first_name"]);
                /*
                var stud = {
                    first_name: jsonArray[i]["first_name"],
                    last_name: jsonArray[i]["last_name"],
                    password: await bcrypt.hash(password, 10),
                    dob: jsonArray[i]["dob"],
                    email: jsonArray[i]["email"],
                }
                var usr = {
                    email: jsonArray[i]["email"],
                    password: await bcrypt.hash(pass, 10),
                    status: 0,
                    role: 0
                }
                const [student, created] = await Student.findOrCreate({
                    where: {email: stud.email},
                    defaults: stud
                  })
                    if(created || student){
                        const [user, created] = await User.findOrCreate({
                            where: {email: usr.email},
                            defaults: usr
                        })
                        if(created){
                            notifyRegistration(stud, pass);
                        }
                        count++;
                        console.log(count);
                    }*//*
            } catch (err) {
                console.log(err)
                errorArray.push(jsonArray[i]["email"])
            }
        }
        var timeStamp = new Date(Date.now());
        timeStamp = timeStamp.toString()
        await fs.appendFile(__basedir + "/logs/logs.txt", `\n${timeStamp}: Admin added ${count} new students.`);
        await fs.unlink(__basedir + "/appData/Temp/data.csv");
        await sleep(3000);
        console.log(count + " students are added successfully.")
        var msg = {
            title: "s",
            content: count + " students are added successfully.\n" + errorArray.length + " students couldn't be added.\n" + errorArray
        }
        res.render("welcome", {msg: msg, role: req.session.role});
        
    } catch (err) {
        var msg = {
            title: "f",
            content: "Something went wrong."
        }
        console.log(err);
        res.render("welcome", {msg: msg, role: req.session.role});
    }
}
*/


exports.addjobget = (req, res) => {
    res.render("addjob");
}


exports.addjob = (req, res) => {
    const { title, company, desc, status, link} = req.body;
    var uid = uuidv4();
    var imgurl = "";

    if (req.files) {
        var file = req.files.jobImage
        // var filename = file.name;
        // var fileExt = filename.substring(filename.lastIndexOf(".") + 1, filename.length);
        imgurl = uid + '.jpg';
        file.mv('AppData/jobImg/' + imgurl, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Image uploaded.");
            }
        })
    } else {
        console.log("No Files found.")
    }

    var sql = `INSERT INTO jobs (identifier, Title, Company, Description, Status, Link) VALUES ('${uid}', '${title}', '${company}', '${desc}', '${status}', '${link}')`;
    db.con.query(sql, function (err, result) {
        if (err) {
            try {
                // removing the uploaded image
                fs.unlinkSync('AppData/jobImg/' + uid + '.jpg')
            } catch(err) {
                console.error(err)
            }
            res.render("index", {
                alert: "yes",
                title: "Sorry",
                text: "Something went wrong.",
                icon: "error"})
            console.log(err);
        } else {
            // res.render("viewjobs", {
            //     alert: "yes",
            //     title: "Success",
            //     text: "job is added successfully.",
            //     icon: "success"})
            // console.log("Record Inserted.")
            res.redirect("/job/view")
        }
    });
};








exports.deletefromlib = (req, res) => {
    const sql = `delete from jobs where jobID = '${req.params.id}'`
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // res.render("index", {
            //     alert: "yes",
            //     title: "Done.",
            //     text: "job deleted from library.",
            //     icon: "success"})
            res.redirect("/job/view")
        }
    });
}

var id;
exports.viewupdatestatus = (req,res) =>{
     id = req.params.id;
    res.render("updateJobStatus", {id: id});
}

exports.updatefromlib = (req, res) =>{
    //res.render("updateJobStatus");
    const {updatejobstatus} = req.body;
    console.log(id[3]);
    console.log(updatejobstatus);
    const sql = `update jobs set Status='${updatejobstatus}' where jobID = '${id[3]}'`
    db.con.query(sql, function(err, result){
        if (err)
        {
            console.log(err);
        }
        else{
            res.redirect("/job/view");
        }
    })
}

exports.viewStudents = (req, res) =>{
    const sql = `select * from users where role=0`;
    db.con.query(sql, function(err, result){
        if (err)
        {
            console.log(err);
        }
        else{
            //let date = new Date(result[0].dob);
            //result[0].dob = date.toDateString();
            //const n_result = result[0];
            res.render("viewStudents", {data: result});
        }
    });
}

exports.viewStudbyId = (req, res) =>{
    var id = req.params.id;
    const sql = `select * from users where id= ${id}`;
    db.con.query(sql, function(err, result){
        if (err)
        {
            console.log(err);
        }
        else{
            //let date = new Date(result[0].dob);
            //result[0].dob = date.toDateString();
            //const n_result = result[0];
            res.render("viewStudbyId", {studData: result});
        }
    })
}

exports.deleteStudent = (req, res) => {
    const sql = `delete from users where id = '${req.params.id}'`
    db.con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // res.render("index", {
            //     alert: "yes",
            //     title: "Done.",
            //     text: "job deleted from library.",
            //     icon: "success"})
            res.redirect("/admin/viewStudents")
        }
    });
}



