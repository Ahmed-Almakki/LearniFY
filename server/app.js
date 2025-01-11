import dotenv from 'dotenv';
import express from 'express';
import CreateServer from './utils/server.js';
import connect from './utils/connect.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

export const app = CreateServer();

const server = app.listen(PORT, async () => {
  console.log(`app is running on port ${PORT}`);
  await connect();
});

export default server;
