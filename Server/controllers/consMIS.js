//
import Budget from "../models/Budget.js";
import Actual from "../models/Actual.js";
//
import oldData from "../data/mis.js";
//
//
const monthsArray = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];
let allData = [];
let returnData = [];
let filturedData;
let returnTemplate;
//
//
export const getConsMISData = async (req, res)=>{
  const { propertyCode, year } = req.query;
  resetReturnTemplate();

  let budgetMISData;
  let actualMISData;

  filturedData = oldData.filter((item) => {
    return item.propertyCode === propertyCode && item.year <= 2024;
  });
  let thisYearBudgetData;
  let thisYearActualData;
  if(year == 2025){
    thisYearBudgetData = await getBudgetData("PHL-All", 2025);
    thisYearActualData = await getActualData("PHL-All", 2025);
    processBudgetData(thisYearBudgetData.data[0]);
    processActualData(thisYearActualData.data);
    filturedData.push(returnTemplate);
  }

  const resData = {
    // thisYearBudgetData,
    // thisYearActualData,
    ...filturedData
  }
  //res.status(200).json( resData ).end();
  res.status(200).json( filturedData ).end();
}



const getBudgetData = async (propertyCode, budgetYear) => {
  try {
    propertyCode = propertyCode;
    budgetYear = budgetYear;
    //
    const budget = await Budget.find({ propertyCode, budgetYear })
    //
    return { data: budget };
  } catch (err) {
    return { message: err.message };
  }
};
const getActualData = async (propertyCode, fye) => {
  try {
    propertyCode = propertyCode;
    fye = fye
    const actualData = await Actual.find({ propertyCode, fye })
    return { data: actualData };
  } catch (err) {
    return { message: err.message };
  }
};
//
const getAnnualMetric = async (propertyCode, budgetYear) =>{
  propertyCode = propertyCode;
  budgetYear = budgetYear;
}
//
const processBudgetData = (data) => {
  let payload;
  if (data) {
    payload = data.payload;
    returnTemplate.title = data.propertyName;
    returnTemplate.propertyCode = data.propertyCode;
    returnTemplate.year = data.budgetYear
    let revData = {
      target: [],
      actual: [],
    };
    let pbtData = {
      target: [],
    };
    let ebidtaData = {
      target: [],
      actual: [],
    };
    let ebidtaMgn = {
      target: [],
      actual: [],
    };
    let occupancyData = {
      target: [],
      target_q: [],
      actual: [],
      actual_q: [],
    };
    let arrData = {
      target: [],
      target_q: [],
      actual: [],
      actual_q: [],
    };

    revData.target = [
      payload[0].inputRevenue0,
      payload[0].inputRevenue1,
      payload[0].inputRevenue2,
      payload[1].inputRevenue0,
      payload[1].inputRevenue1,
      payload[1].inputRevenue2,
      payload[2].inputRevenue0,
      payload[2].inputRevenue1,
      payload[2].inputRevenue2,
      payload[3].inputRevenue0,
      payload[3].inputRevenue1,
      payload[3].inputRevenue2,
    ];    
    revData.actual = [];
    //
    pbtData.target = [
      payload[0].inputPBT0,
      payload[0].inputPBT1,
      payload[0].inputPBT2,
      payload[1].inputPBT0,
      payload[1].inputPBT1,
      payload[1].inputPBT2,
      payload[2].inputPBT0,
      payload[2].inputPBT1,
      payload[2].inputPBT2,
      payload[3].inputPBT0,
      payload[3].inputPBT1,
      payload[3].inputPBT2,
    ];
    //
    ebidtaData.target = [
      payload[0].inputEBIDTA0,
      payload[0].inputEBIDTA1,
      payload[0].inputEBIDTA2,
      payload[1].inputEBIDTA0,
      payload[1].inputEBIDTA1,
      payload[1].inputEBIDTA2,
      payload[2].inputEBIDTA0,
      payload[2].inputEBIDTA1,
      payload[2].inputEBIDTA2,
      payload[3].inputEBIDTA0,
      payload[3].inputEBIDTA1,
      payload[3].inputEBIDTA2,
    ];
    //
    occupancyData.target = [
      payload[0].inputOccupancy0,
      payload[0].inputOccupancy1,
      payload[0].inputOccupancy2,
      payload[1].inputOccupancy0,
      payload[1].inputOccupancy1,
      payload[1].inputOccupancy2,
      payload[2].inputOccupancy0,
      payload[2].inputOccupancy1,
      payload[2].inputOccupancy2,
      payload[3].inputOccupancy0,
      payload[3].inputOccupancy1,
      payload[3].inputOccupancy2,
    ];
    
    
    //occupancyData.target_a = 
    //
    arrData.target_q = [
      payload[0].avgARR,
      payload[1].avgARR,
      payload[2].avgARR,
      payload[3].avgARR,
      payload[4].avgARRAnnual,
    ];
    //
    returnTemplate.data.revenue.target = [...revData.target];
    //
    returnTemplate.data.PBT.target = [...pbtData.target];
    returnTemplate.data.EBIDTA.target = [...ebidtaData.target];
    returnTemplate.data.EBIDTA_mgn.target = [...ebidtaMgn.target];
    //
    returnTemplate.data.occupancy.target_q = [...occupancyData.target_q];
    //
    returnTemplate.data.arr.target_q = [...arrData.target_q];
    //
  }
};
//
const processActualData = (data) => {
  let len = data.length;
  let revData = {
    actual: [],
  };
  let pbtData = {
    actual: [],
  };
  let ebidtaData = {
    actual: [],
  };
  let ebidtaMgn = {
    actual: [],
  };
  let occupancyData = {
    actual: [],
    actual_q : [],
    actual_ytd: [],
  };
  let arrData = {
    actual: [],
    actual_q : [],
    actual_ytd: [],
  };
  //
  for (let i = 0; i < len; i++) {
    let mon = data[i].actualMonth;
    let index;
    for (let j = 0; j < monthsArray.length; j++) {
      if (mon === monthsArray[j]) {
        index = j;
        break;
      }
    }
    //
    revData.actual[index] = data[i].payload.inputRevenue;
    // console.log("#######################################################")
    // console.log("mon: "+mon+" monthsArray["+index+"]: "+monthsArray[index] +" index: "+index +" i "+i+" data[i].payload.inputRevenue: "+data[i].payload.inputRevenue)
    // console.log("#######################################################")
    //
    pbtData.actual[index] = data[i].payload.inputPBT;
    ebidtaData.actual[index] = data[i].payload.inputEBIDTA;
    ebidtaMgn.actual[index] = Number(
      (
        (data[i].payload.inputEBIDTA / data[i].payload.inputRevenue) *
        100
      ).toFixed(2)
    );
    //
  }
  // Assign it to returnTemplate
  //
  returnTemplate.data.revenue.actual = [...revData.actual];
  //
  returnTemplate.data.PBT.actual = [...pbtData.actual];
  returnTemplate.data.EBIDTA.actual = [...ebidtaData.actual];
  returnTemplate.data.EBIDTA_mgn.actual = [...ebidtaMgn.actual];
  //
};
//
const resetReturnTemplate = ()=>{
  returnTemplate = {
    title: "",
    propertyType: "",
    subsidiary: "",
    propertyCode: "",
    propertyID: "",
    year: 2024,
    target_locked: true,
    actual_locked: true,
    data: {
      revenue: {
        target: [],
        actual: [],
      },
      roomRevenue: {
        target: [],
        actual: [],
      },
      fnbRevenue: {
        target: [],
        actual: [],
      },
      banquetRevenue: {
        target: [],
        actual: [],
      },
      PBT: {
        target: [],
        actual: [],
      },
      EBIDTA: {
        target: [],
        actual: [],
      },
      EBIDTA_mgn: {
        target: [],
        actual: [],
      },
      occupancy: {
        target: [],
        target_q: [],
        actual: [],
        actual_q: [],
        actual_ytd: [],
      },
      arr: {
        target: [],
        target_q: [],
        actual: [],
        actual_q: [],
        actual_ytd: [],
      },
      //
      int_rev: {
        target: [],
        actual: [],
      },
      indoor_patients: {
        target: [],
        actual: [],
      },
      ALOS: {
        target: [],
        target_q: [],
        actual: [],
        actual_q: [],
        actual_ytd: [],
      },
      ARPOB: {
        target: [],
        target_q: [],
        actual: [],
        actual_q: [],
        actual_ytd: [],
      },
    },
  };
}
