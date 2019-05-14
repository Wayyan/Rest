// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const http=require('http');
const fs=require('fs');
var routers={
    '/base':function index(req,res){
        const readStream=fs.createReadStream('./data.json');
        res.writeHead(200,{'Content-type':'application/json'});
        readStream.pipe(res);
    },
};
const server=http.createServer((req,res)=>{
    if(req.url in routers){
        return routers[req.url](req,res);
    }
    res.writeHead(404);
    res.end('Not Found');
});
// const express=require('express');
// const app=express();
// app.get('/patch',(req,res)=>{
//  res.send("1");
// });
server.listen(process.env.PORT||'3000');