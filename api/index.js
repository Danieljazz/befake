import Express, { json } from "express";
const app = Express();
app.listen("8080", () => {
  console.log("backend run on port 8080");
});
