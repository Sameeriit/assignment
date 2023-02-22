// importing module

const express = require("express");
const { handlebars } = require("hbs");
// const { fetch} = require('node-fetch');

const data = require('./getdata');




   





const app = express();
const localhost = "localhost"
const port = 3008;

const mysql = require("./connection").connectig

//-------------------------------------------------------------------------

// configration


app.set("view engine","hbs");
app.set("views","./views");
app.use(express.static(__dirname + "/public"));
// new changes
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// ------------------------------------------------------------------------


//routing
app.get('/fetchuser', (req,res)=>{
    res.render("fetchuser");
})


app.get("/", (req, res) => {
    res.render("homepage");

});


app.get("/userdetails", (req, res) => {
    res.render("userdetails");

});
app.get("/nextpage", (req, res) => {
    res.render("nextpage");

});
app.get("/filter", (req, res) => {
    res.render("filter");

});
// app.get("/fetchuser", (req, res) => {
//     res.render("fetchuser");
    

// });


app.get("/deleteuser", (req, res) => {
    res.render("deleteuser");

});

app.get("/submit",(req,res)=>{
    // res.send(req.query);
    const {username,email,password,ConfirmPassword,phone} = req.query

    // sanitization xss...

    let qry = "select *from test where email=? or phone=?";
    mysql.query(qry,[username,email,password,ConfirmPassword,phone],(err,result)=>{
        if(err){
            throw err;
        }else{
            // res.send(result); -->this return empty array because what i'm looking for that is not pressent in database
            // if(result.length > 0){
            //     res.render("manage",{checkmesg:true})

            // }
            //Insert data
            let qry2 = "insert  into test values(?,?,?,?,?)";
            mysql.query(qry2,[username,email,password,ConfirmPassword,phone], (err,result) =>{
                // res.send(result);
                if(result.affectedRows > 0){
                    res.render("manage",{mesg:true})
                }
            })
        }
    });

});

app.post("")

// ------------------------------------------------------------

// creating sserver
app.listen(port,localhost, (err) => {
    if (err)
        throw err
    else
        console.log(`server is runing at http://${localhost}/${port}`);
});