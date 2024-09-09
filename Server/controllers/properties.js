//import Post from "../models/Post.js";
import Property from "../models/Property.js";
import User from "../models/User.js";

export const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, propertyCode, subsidiary, location, photo, } = req.body;
    const user = req.user //await User.findById(userId);
    console.log("From Property Controller")
    console.log(req.user)
    //
    // const user = await User.findOne({ _id: req.user.id });
    // if (!user) return res.status(400).json({ msg: "User does not exist. " });
    //
    const newProperty = new Property({
      userId: user.id,
      title,
      description,
      type: propertyType,
      code: propertyCode,
      subsidiary,
      location,
      photo,
      creator: user.id
    });
    console.log("Creating Property Now")
    console.log(newProperty);
    
    await newProperty.save();

    const property = await Property.find();
    res.status(201).json(property);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// /* CREATE */
// export const createPost = async (req, res) => {
//   try {
//     const { userId, description, picturePath } = req.body;
//     const user = await User.findById(userId);
//     const newPost = new Post({
//       userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       description,
//       userPicturePath: user.picturePath,
//       picturePath,
//       likes: {},
//       comments: [],
//     });
//     await newPost.save();

//     const post = await Post.find();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

/* READ */
export const getProperties = async (req, res) => {
  try {
    const property = await Property.find();
    res.status(200).json(property);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// export const getFeedPosts = async (req, res) => {
//   try {
//     const post = await Post.find();
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const post = await Post.find({ userId });
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
//     const post = await Post.findById(id);
//     const isLiked = post.likes.get(userId);

//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };
