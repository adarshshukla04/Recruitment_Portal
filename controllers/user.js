const db = require("../utils/db");

exports.profile = (req, res)=>{
    const id = req.session.userid;
    const sql = `select * from users where id = '${id}'`;
    db.con.query(sql, function(err, userData){
        if(err){
            console.log(err);
        }
        else{
            let date = new Date(userData[0].dob);
            userData[0].dob = date.toDateString();
            const userD = userData[0];
            res.render("profile", {user: userD});
        }
    });
}

exports.update = (req, res) => {
    const {address, city, state, pin, email} = req.body;
    // console.log(email);
    // console.log(pin);
    var sql = `UPDATE users SET address = '${address}', state = '${state}', pin = '${pin}', city = '${city}' where email = '${email}'`;
    db.con.query(sql, function (err, result) {
        if(err){
            console.log(err);
            res.render("index", {
                alert: "yes",
                title: "Sorry..",
                text: "Something went wrong.",
                icon: "error",})
        }else {
            console.log("1 record updated.");
            res.redirect("profile")
        }

    });
}