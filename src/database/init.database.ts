import mongoose from 'mongoose';
import { loadConfig } from '../api/v1/configs/configs';

class Database {
  private static instance: Database;
  static getInstance() {
    if (!Database.instance) {
      this.instance = new Database();
    } else {
      return this.instance;
    }
  }
  constructor() {
    this.connect();
  }

  connect() {
    try {
      const { databaseCfg } = loadConfig();
      const { dbPort, dbHost, dbName } = databaseCfg;
      mongoose.connect(`${dbHost}:${dbPort}/${dbName}`);
      console.log('connected to mongodb');
    } catch (error) {
      console.log('errors occurred while connecting with mongodb');
    }
  }
}

const dbInstance = Database.getInstance();
export { dbInstance };
