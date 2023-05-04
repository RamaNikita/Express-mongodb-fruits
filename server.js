require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Veggie = require("./models/vegetable");
const { connect, connection } = require("mongoose");
const methodOverride = require("method-override");
const fruitsController = require("./controllers/fruitsController");
//DataBase Connection
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// This line of code will run the function below once the connection to MongoDB has been established.
connection.once("open", () => {
  console.log("connected to Mongo");
});
// View Engine Middleware Configure
const reactViewsEngine = require("jsx-view-engine").createEngine();
app.engine("jsx", reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set("view engine", "jsx");
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set("views", "./views");

//Middleware
app.use(express.urlencoded({ extended: false }));
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));
app.use(express.static("public"));
// Custom Middleware

app.use((req, res, next) => {
  console.log("Middleware running...");
  next();
});

//Routes

app.use("/fruits", fruitsController);

// I.N.D.U.C.E.S
// ==============

//Index Vegetables
app.get("/vegetables", async (req, res) => {
  console.log("Index Controller Func. running...");
  try {
    const foundVegetable = await Veggie.find({});
    res.status(200).render("vegetables/Index", { vegetables: foundVegetable });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New Vegetables
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//Delete // recieves the id of the fruit document and delete it, after that it will redirect to the Index.
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Create Vegetables
app.post("/vegetables", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const newVeggie = await Veggie.create(req.body);
    console.log(newVeggie);
    res.redirect("/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show Vegetables
app.get("/vegetables/:id", async (req, res) => {
  try {
    const foundVegetable = await Veggie.findById(req.params.id);
    res.render("vegetables/Show", {
      veggie: foundVegetable,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/*", (req, res) => {
  res.redirect("/fruits");
});
// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
