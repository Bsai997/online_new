const mongoose = require('mongoose');
const { Schema } = mongoose
async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project');
}

module.exports = main