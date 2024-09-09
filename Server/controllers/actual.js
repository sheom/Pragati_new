import Budget from "../models/Budget.js";
import User from "../models/User.js";
///
import Actual from "../models/Actual.js";

//
const monthsArray = [ "December", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November" ];
//

export const addActualData = async (req, res) => {
  try {
    const { propertyName, propertyCode, propertyId, payload } = req.body;
    const user = req.user; //await User.findById(userId);
    let actualYear = new Date().getFullYear();
    let fye = new Date().getFullYear()+1;
    let monthCount = new Date().getMonth();
    if(monthCount < 5 ){
      fye--;
    }
    if(monthCount == 0 ){
      actualYear--;
    }
    const actualMonth = monthsArray[monthCount];
    //
    //
    const newActual = new Actual({
      userId: user.id,
      propertyId,
      propertyName,
      propertyCode,
      fye:fye,
      actualYear,
      actualMonth,
      payload,
      creator: user.id,
    });
    //console.log("Creating Actual data Now");
    //console.log(newActual);
    /*
    // need to check if budget is already added for that property code and year combination
    */
    const filter = { propertyCode, actualYear, actualMonth };
    const update = {
      locked: true,
      userId: user.id,
      creator: user.id,
      payload: payload,
    };

    const savedActual = await Actual.findOne(filter);
    if (savedActual) {
      //console.log("savedActual.locked: "+ savedActual.locked);
      //console.log("savedActual.locked: " + (savedActual.locked === true) );
      if (savedActual.locked === true) {
        res
          .status(404)
          .json({ message: "Data for this month is already added for this property." });
        //console.log("Data Already Entered");
      } else if (savedActual.locked !== true) {
        const updatedActual = await Actual.findOneAndUpdate(filter, update, {
          new: true,
        });
        res.status(200).json(updatedActual);
        //console.log("Data Updated");
      }
    } else {
      await newActual.save();
      const actual = await Actual.find();
      res.status(201).json(actual);
      //console.log("Data Saved");
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getActualData = async (req, res) => {
  try {
    const { propertyCode, actualYear, actualMonth } = req.query;
    const filter = { propertyCode, actualYear};
    if (actualMonth){
      filter.actualMonth=actualMonth;
    }
    console.log(filter);
    const actualData = await Actual.find(filter);
    res.status(200).json(actualData);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
