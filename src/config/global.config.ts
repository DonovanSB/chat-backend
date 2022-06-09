export default () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
  return {
    port: parseInt(process.env.PORT, 10) || 4500,
    database: process.env.MONGO_URI || 'mongodb://localhost:27017/chat',
  };
};
