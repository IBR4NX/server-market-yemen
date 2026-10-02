import {PORT,corsUrl,environment} from './config';
import express from 'express';
import router from './routes/router';
import cors from 'cors';
import './database';
import path from 'path'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const app = express();
app.use(helmet()); 
app.use(express.json());
app.get("/favicon.ico", (_req, res) => {
    res.status(204).end();
});
app.use(cors({origin:corsUrl,optionsSuccessStatus:200,credentials:true}));
console.clear();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  standardHeaders: true, 
  legacyHeaders: false, 
  message: 
  { message: "Too many requests, please try again later." },
});
app.use('/api', limiter);
app.use('/api', router);

app.get(/.*/, (req, res, next) => {
    const viewName = req.path === '/'
        ? 'index'
        : req.path.substring(1);
        console.log("View Name:", viewName);
    res.render(viewName);
});
// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 
app.use((err:any, req:any, res:any, next:any) => {
  const status = res.statusCode && res.statusCode !== 200? res.statusCode: 500;
  console.log(err,"--- Error Middleware ---");
  if (environment === "production") {
    res.status(status).json({
      message: err.message,
    });
  } else {
    res.status(status).json({
      message: err.message,
      stack: err.stack
    });
  }
});

app.listen(PORT , 
  ()=>{console.log(`\n\x1b[1;32m➜  Server:\x1b[0m is up and running on:\x1b[34m http://localhost:${PORT}/ \x1b[0m  `);});
  
  // import { fileURLToPath } from 'url'
  // const __filename = fileURLToPath(import.meta.url)
  // const __dirname = path.dirname(__filename);
  // app.set('view engine', 'ejs');
  // app.set('views', path.join(__dirname, 'views'));