const { query } = require('express');
const express = require('express');
const bodyParser=require('body-parser');
var router=express.Router();
var fs=require('fs');
const { nextTick } = require('process');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.use(function(req,res){
    console.log(req.method+" "+req.url)
    next();
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'category_op.html')
})

app.post('/insert_category',function(req,res){
    var category_name=req.body.catname;
    var obj={};
    var key=req.body.catid;
    var newcat={
        'name':category_name
    }
    obj[key]=newcat;

    fs.readFile('users.json',function(err,data){
        data=JSON.parse(data);
        data[key]=obj[key];
        console.log(data);
        var updateuser=JSON.stringify(data);
        fs.writeFile('users.json',updateuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});

app.post('/display_particular_data',function(req,res){
    fs.readFile("users.json","utf8",function(err,data){
        var a=JSON.parse(data);
        var b=a[req.body.chkid];
        console.log(b);
        res.end(JSON.stringify(b));
    });
});

app.post('/delete_particular_data',function(req,res){
    fs.readFile("users.json","utf8",function(err,data){
        data=JSON.parse(data);
        delete data[req.body.delid];
        console.log(data);
        var updateuser=JSON.stringify(data);
        fs.writeFile('users.json',updateuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});

app.get('/show_all_details',function(req,res){
    fs.readFile('users.json',function(err,data){
        console.log(data);
        res.end(data);
    });
});





//FROM HERE THE CODE IS FOR PRODUCT OPERATION

// app.get('/product_part', function (req, res) {
//     res.sendFile(__dirname + '/' + 'product_op.html')
// })

app.post('/insert_product',function(req,res){
    var product_name=req.body.proname;
    var obj={};
    var key=req.body.proid;
    var newpro={
        'name':product_name
    }
    obj[key]=newpro;

    fs.readFile('users1.json',function(err,data){
        data=JSON.parse(data);
        data[key]=obj[key];
        console.log(data);
        var updateuser=JSON.stringify(data);
        fs.writeFile('users1.json',updateuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});

app.post('/display_particular_product_data',function(req,res){
    fs.readFile("users1.json","utf8",function(err,data){
        var a=JSON.parse(data);
        var b=a[req.body.proid];
        console.log(b);
        res.end(JSON.stringify(b));
    });
});

app.post('/delete_particular_product_data',function(req,res){
    fs.readFile("users1.json","utf8",function(err,data){
        data=JSON.parse(data);
        delete data[req.body.prodelid];
        console.log(data);
        var updateuser=JSON.stringify(data);
        fs.writeFile('users1.json',updateuser,function(err){
            res.end(JSON.stringify(data));
        });
    });
});

app.get('/show_all_product_details',function(req,res){
    fs.readFile('users1.json',function(err,data){
        console.log(data);
        res.end(data);
    });
});


app.listen(3000);