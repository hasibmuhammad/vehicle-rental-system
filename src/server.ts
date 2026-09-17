import app from "./app";
import config from "./config";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`Vechicle Rental System is listening port: ${PORT}`);
});
