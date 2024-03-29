// @flow

import mongoose from 'mongoose';
import { databaseConfig } from './config';

function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(databaseConfig);
  });
}

export default connectDatabase;
