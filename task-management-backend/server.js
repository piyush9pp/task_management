const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const logger = require('./middleware/logger');
const sequelize = require('./config/database');
const Task = require('./models/Task');
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/tasks', taskRoutes);

sequelize.sync({ force: false })  // ✅ Ensures the table is created if missing
    .then(() => console.log("Database synced successfully!"))
    .catch(err => console.error("Database sync failed:", err));

// sequelize.authenticate()
//     .then(() => console.log('Database connected successfully!'))
//     .catch(err => console.error('Database connection failed:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
