///
import Rating from "../models/Rating.js";

//
const monthsArray = [ "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ];
//

export const addRatingData = async (req, res) => {
  try {
    const { propertyName, propertyCode, propertyId,ratingYear, ratingQ, payload } = req.body;
    const user = req.user; //await User.findById(userId);
    //let ratingYear = new Date().getFullYear();
    let fye = new Date().getFullYear()+1;
    let monthCount = new Date().getMonth();
    if(monthCount < 5 ){
      fye--;
    }
    // if(monthCount == 0 ){
    //   ratingYear--;
    // }
    const ratingMonth = monthsArray[monthCount];
    //
    //
    const newRating = new Rating({
      userId: user.id,
      propertyId,
      propertyName,
      propertyCode,
      fye:fye,
      ratingYear,
      ratingQ,
      ratingMonth,
      payload,
      creator: user.id,
    });
    /*
    // need to check if budget is already added for that property code and year combination
    */
    const filter = { propertyCode, ratingYear, ratingMonth };
    const update = {
      locked: true,
      userId: user.id,
      creator: user.id,
      payload: payload,
    };

    const savedRating = await Rating.findOne(filter);
    if (savedRating) {
      //console.log("savedRating.locked: "+ savedRating.locked);
      //console.log("savedRating.locked: " + (savedRating.locked === true) );
      if (savedRating.locked === true) {
        res
          .status(404)
          .json({ message: "Data for this month is already added for this property." });
        //console.log("Data Already Entered");
      } else if (savedRating.locked !== true) {
        const updatedRating = await Rating.findOneAndUpdate(filter, update, {
          new: true,
        });
        res.status(200).json(updatedRating);
        //console.log("Data Updated");
      }
    } else {
      await newRating.save();
      const rating = await Rating.find();
      res.status(201).json(rating);
      //console.log("Data Saved");
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getRatingData = async (req, res) => {
  try {
    const { propertyCode, ratingYear,ratingQ, ratingMonth } = req.query;
    const filter = { propertyCode, ratingYear};
    // if (ratingMonth){
    //   filter.ratingMonth=ratingMonth;
    // }
    if (ratingQ){
      filter.ratingQ=ratingQ;
    }
    console.log(filter);
    const ratingData = await Rating.find(filter);
    res.status(200).json(ratingData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
