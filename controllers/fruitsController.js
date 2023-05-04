const express = require("express");
const router = express.Router();
const Fruit = require("../models/fruit");

//Seed Route

router.get("/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});
// Index Fruits
router.get("/", async (req, res) => {
  console.log("Index Controller Func. running...");
  try {
    const foundFruit = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruit });
  } catch (err) {
    res.status(400).send(err);
  }
});
// New  Fruits// renders a form to create a new fruit
router.get("/new", (req, res) => {
  res.render("fruits/New");
});
//Update/Put
router.put("/:id", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const updatedFruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedFruit);
    res.redirect(`/fruits/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create Fruits // recieves info from new route to then create a new fruit w/ it
router.post("/", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const newFruit = await Fruit.create(req.body);
    //console.log(fruits);
    // redirect is making a GET request to whatever path you specify
    // res.redirect("/fruits");
    console.log(newFruit);
    res.redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show Fruits
router.get("/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      //second param must be an object
      fruit: foundFruit,
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
