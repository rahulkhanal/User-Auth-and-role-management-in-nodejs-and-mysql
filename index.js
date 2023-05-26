const  express  =  require('express');
const  app  =  express();
const  bodyParser  =  require('body-parser');
const  router  =  require("./Routes/route");
const cookieParser = require("cookie-parser");



//middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());
app.use("/api",router);

//server
app.listen(7000,()=>{
    console.log("connected to port 7000...........");
})