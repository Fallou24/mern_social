const express = require("express");
const router = express.Router();
const userSchema = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
router.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  if (req.body.userId === userId /*|| req.user.isAdmin*/) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const user = await userSchema.findByIdAndUpdate(userId, { $set: req.body })
      res.json({ message: "Succes" })
    } catch (err) {
      res.json(err)
    }
  }
  else {
    return res.status(403).json("You con update only your account");
  }
})

//delete a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const removedUser = await userSchema.findByIdAndDelete({ _id: req.params.id })
      res.json({ message: "Suppression reussie" })
    } catch (err) {
      res.json(err)
    }
  }
  else {
    return res.status(403).json("You can only delete your account")
  }

})

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await userSchema.findById(userId)
      : await userSchema.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userSchema.findById(req.params.id);
      const currentUser = await userSchema.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});
//unfollow user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await userSchema.findById(req.params.id);
      const currentUser = await userSchema.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});


module.exports = router;

//get freinds
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return userSchema.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});