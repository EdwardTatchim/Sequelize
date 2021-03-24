import express from 'express';
import db from './database/initializeDB.js';
import DiningHall from './models/DiningHall.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Adding a static folder
app.use(express.static(staticFolder));

// Making get request
app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch(DiningHall);
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    console.log('Now send something back to your client');
    res.status(200).send('Hello World');
    // res.json({data: dataToSendToFrontEnd});
  });

app.use('/api', apiRoutes);

async function bootServer() {
  try {
    const mysql = await db.sequelizeDB;
    await mysql.sync();
    app.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();
