import express from 'express';
import router from './router.js';

const app = express();
const port = process.env.PORT || 3000;

// Use the router
app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
