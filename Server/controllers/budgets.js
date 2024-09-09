import Budget from "../models/Budget.js";
import Property from "../models/Property.js";
import User from "../models/User.js";

export const addBudgetData = async (req, res) => {
  try {
    const { propertyName, propertyCode, propertyId, payload, locked } = req.body;
    const user = req.user; //await User.findById(userId);
    const budgetYear = new Date().getFullYear() + 1;
    //console.log("From Budget Controller");
    //
    const newBudget = new Budget({
      userId: user.id,
      propertyId,
      propertyName,
      propertyCode,
      budgetYear,
      payload,
      locked: (locked)?locked:false,
      creator: user.id,
    });
    //console.log("Creating Budget Now");
    //console.log(newBudget);
    /*
    // need to check if budget is already added for that property code and year combination
    */
    const filter = { propertyCode, budgetYear };
    //
    const update = {
      locked: (locked)?locked:false,
      userId: user.id,
      creator: user.id,
      payload: payload,
    };

    const savedBudget = await Budget.findOne(filter);
    if (savedBudget) {
      if (savedBudget.locked == true) {
        res
          .status(404)
          .json({ message: "Budget data is already added for this property." });
      } else if (savedBudget.locked != true) {
        const updatedBudget = await Budget.findOneAndUpdate(filter, update, {
          // If `new` isn't true, `findOneAndUpdate()` will return the
          // document as it was _before_ it was updated.
          new: true,
        });
        res.status(200).json(updatedBudget);
      }
    } else {
      await newBudget.save();
      const budget = await Budget.find();
      res.status(201).json(budget);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getBudgetData = async (req, res) => {
  try {
    const { propertyCode, budgetYear } = req.query;
    const filter = { propertyCode, budgetYear };

    const budget = await Budget.findOne(filter);
    res.status(200).json(budget);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// export const createProperty = async (req, res) => {
//   try {
//     const { title, description, propertyType, propertyCode, subsidiary, location, photo, } = req.body;
//     const user = req.user //await User.findById(userId);
//     console.log("From Property Controller")
//     console.log(req.user)
//     //
//     // const user = await User.findOne({ _id: req.user.id });
//     // if (!user) return res.status(400).json({ msg: "User does not exist. " });
//     //
//     const newProperty = new Property({
//       userId: user.id,
//       title,
//       description,
//       type: propertyType,
//       code: propertyCode,
//       subsidiary,
//       location,
//       photo,
//       creator: user.id
//     });
//     console.log("Creating Property Now")
//     console.log(newProperty);

//     await newProperty.save();

//     const property = await Property.find();
//     res.status(201).json(property);
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

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
// export const getProperties = async (req, res) => {
//   try {
//     const property = await Property.find();
//     res.status(200).json(property);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };
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
