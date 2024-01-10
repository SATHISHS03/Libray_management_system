import express from 'express';
import librarianRouter from './routes/librarianroute.js';
import userRouter from './routes/userroute.js';
import bodyParser from 'body-parser';
import publicRouter from './routes/publicroute.js';


const app = express();
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/librarian', librarianRouter);
app.use('/', publicRouter);

app.all('*', (req, res) => {
  res.send('No such route found').status(404);
});

app.listen(3001, () => {
  console.log('Listening on 3001');
});
