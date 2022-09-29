const express = require("express");
const router = express.Router();
const postSchema = require("../models/Post")
const userSchema = require("../models/User")
//create a post
router.post("/", async (req, res) => {
  const newPost = new postSchema(req.body)
    try {
        const savePost = await newPost.save();
        res.json(savePost)
    } catch (err) {
        console.log(err);
    }
})

//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await postSchema.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.json(err)
    }

})

//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await postSchema.findByIdAndDelete({ _id: req.params.id })
        res.json(deletedPost)
    } catch (err) {
        res.json(err) 
    }
})

//like a post
router.put("/:id/like", async (req, res) => {
    try {
      const post = await postSchema.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a post
router.get("/:id", async (req, res) => {
    try {
      const post = await postSchema.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get a timeline post
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await userSchema.findById(req.params.userId);
      const userPosts = await postSchema.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return postSchema.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;


//get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await userSchema.findOne({ username: req.params.username });
    const posts = await postSchema.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});