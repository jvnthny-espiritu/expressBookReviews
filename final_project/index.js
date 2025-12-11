/**
 * Express Book Reviews Application
 * Entry point
 */

const app = require('./src/app');
const { PORT } = require('./src/config/constants');

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
