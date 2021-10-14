import app from "./index.js";
import mongoDbClient from "./services/database/mongoDbClient.js";

app.listen(process.env.PORT, () => {
  console.log(`listen server from port ${process.env.PORT}`);
  mongoDbClient.initialize();
});
