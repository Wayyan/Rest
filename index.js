const http=require('http');
const fs=require('fs');
const express=require('express'),app=express();
const mRoutes=require('./api/controllers/todoRoutes');
mRoutes(app);
app.listen(process.env.PORT||'3002');