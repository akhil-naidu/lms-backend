import 'dotenv/config';
import { app } from './app.js';

// ^ 02
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
