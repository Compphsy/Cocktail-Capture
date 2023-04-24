const express = require('express');
const cors = require("./middleware/cors");

const port = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');

connectDB();
cors(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/cocktails', require('./routes/cocktailRoutes'));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
