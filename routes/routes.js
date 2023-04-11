const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const nodemailer = require("nodemailer");

router.use(cors());
const Model = require("../model/model");
const Match = require("../model/match");
const Leaderboard = require("../model/leaderboard");
const Scorecard = require("../model/scorecard");
const Tournament = require("../model/tournament");
const Market = require("../model/market");

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new Model({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      address: req.body.address,
    });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/userInfo", async (req, res) => {
  try {
    const details = await Model.findOne({ email: req.body.email });
    const userdetails = {
      id: details.id,
      name: details.name,
      email: details.email,
      address: details.address,
    };
    res.send(userdetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/updateUserInfo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { $set: req.body };

    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", cors(), async (req, res) => {
  try {
    const user = await Model.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid)
      return res.status(400).send({
        error: `Invalid password`,
      });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token, isAuth: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/matches", async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/matches", async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find();
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/leaderboard", async (req, res) => {
  try {
    const leaderboard = new Leaderboard(req.body);
    await leaderboard.save();
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//API for contact form

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Create a new Nodemailer transport object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hesharma@deqode.com",
      pass: "lpycmxeznyjrrnpz",
    },
  });

  // Define the email options
  const mailOptions = {
    from: email,
    to: "sharmacreation9@gmail.com",
    subject: `New message from ${name} having email as ${email}`,
    text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send(`Error sending email ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
      res.status(200).send("Email sent successfully");
    }
  });
});

router.post("/scorecard", async (req, res) => {
  try {
    const scorecard = new Scorecard(req.body);
    await scorecard.save();
    res.json(scorecard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/scorecard", async (req, res) => {
  try {
    const scorecard = await Scorecard.find();
    res.json(scorecard);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/scorecard/:matchId", async (req, res) => {
  try {
    const scorecard = await Scorecard.findOne({ matchId: req.params.matchId });
    res.json(scorecard);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/tournament", async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.json(tournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.get("/tournament", async (req, res) => {
  try {
    const tournament = await Tournament.find();
    res.json(tournament);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
});

router.post("/products", async (req, res) => {
  try {
    const products = new Market(req.body);
    await products.save();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Market.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).send({ error: 'Please authenticate' });
//   }
// };

// app.get('/profile', auth, async (req, res) => {
//   res.send(req.user);
// });

// //Post Method
// router.post("/post", async (req, res) => {
//   const data = new Model({
//     name: req.body.name,
//     age: req.body.age,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get("/getAll", async (req, res) => {
//   try {
//     const data = await Model.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Get by ID Method
// router.get("/getOne/:id", async (req, res) => {
//   try {
//     const data = await Model.findById(req.params.id);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Update by ID Method
// router.patch("/update/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };

//     const result = await Model.findByIdAndUpdate(id, updatedData, options);

//     res.send(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //Delete by ID Method
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await Model.findByIdAndDelete(id);
//     res.send(`Document with ${data.name} has been deleted..`);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;
