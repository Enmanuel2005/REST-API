const { initializeApp, cert } = require("firebase-admin/app");
const { getDatabase } = require('firebase-admin/database');

const serviceAccount = require("./service-d8c92-firebase-adminsdk-25w7l-6f9130b574.json");

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://service-d8c92-default-rtdb.firebaseio.com"
});

const db = getDatabase();

module.exports = {
    db
} 



