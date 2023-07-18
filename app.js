const express = require("express");
const qrcode = require("qrcode");
const ejs = require("ejs");

const app = express();

const PORT = process.env.PORT || 5001;

app.set("view engine" , "ejs");
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) =>{
    res.render("index");
})

app.post("/scan" , (req, res) =>{
    let text = req.body.text;
    console.log(text);

    qrcode.toDataURL(text , (err,src) =>{
        if(err){
            console.log(err)
        }
        else{
            res.render("scan" , {
                qr_code: src 
            })
        }
    })
    qrcode.toFile("qr.png",text, (err) =>{
        if(err){
            console.log(err);
        }
    })
    

})

app.post("/download", (req, res) =>{
    res.download("qr.png")
})


app.listen(PORT, console.log(`Server running on port ${PORT}`))