import express from 'express';
import db from './database/initializeDB.js';
import DiningHall from './models/DiningHall.js';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

//creating static variable
const staticFolder = 'public';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Adding a static folder
app.use(express.static(staticFolder));

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
