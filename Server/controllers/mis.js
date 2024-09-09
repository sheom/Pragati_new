import User from "../models/User.js";
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
//
//console.log(oldData.length);
let allData = [];
let returnData = [];
let filturedData;
let returnTemplate;
//
//

export const getActualData = async (propertyCode, actualYear) => {
  try {
    //const { propertyCode, actualYear, actualMonth } = req.query;
    //fye added
    const filter = { propertyCode, fye: actualYear+1 };
    // if (actualMonth){
    //   filter.actualMonth=actualMonth;
    // }
    // //console.log(filter);
    //const actualData = await Actual.find(filter);
    //fye added
    const actualData =
      propertyCode === "PHL"
        ? await Actual.find({ propertyCode: { $ne: "PHH" }, fye: actualYear+1 })
        : await Actual.find(filter);
    return { data: actualData };
  } catch (err) {
    return { message: err.message };
  }
};

const getBudgetData = async (propertyCode, budgetYear) => {
  try {
    propertyCode = propertyCode;
    budgetYear = budgetYear;
    const filter = { propertyCode, budgetYear };
    //
    const budget =
      propertyCode === "PHL"
        ? await Budget.find({ propertyCode: { $ne: "PHH" }, budgetYear })
        : await Budget.find(filter);
    return { data: budget };
  } catch (err) {
    return { message: err.message };
  }
};

export const getMISData = async (req, res) => {
  const { propertyCode, year } = req.query;
  //const { propertyCode, year } = req.body;
  //
  resetReturnTemplate();
  filturedData = oldData.filter((item) => {
    return item.propertyCode === propertyCode && item.year < 2024;
  });
  //console.log("filturedData.length: " + filturedData.length);
  //
  if (year >= 2024) {
    //
    let budgetMISData = await getBudgetData(propertyCode, year);
    let actualMISData = await getActualData(propertyCode, year - 1);
    //
    if (propertyCode === "PHL") {
      returnTemplate.title = "The Peerless Hotels, Consolidated";
      returnTemplate.propertyCode = "PHL";
      processHotelBudgetData(budgetMISData.data);
      processHotelActualData(actualMISData.data);
    } else {
      processActualData(actualMISData.data);
      processBudgetData(budgetMISData.data[0]);
    }
    //
    filturedData.push(returnTemplate);
    //res.status(200).json({
      //budgetData: budgetMISData,
      //actualData: actualMISData,
      //returnTemplate,
      //filturedData,
    //});
    //res.status(200).json(filturedData).end();
    //
    //
    //res.status(200).json({budgetData: budgetMISData, returnTemplate});
    //res.status(200).json({ actualData: actualMISData });
    //res.status(200).json({ message: "Hello from MIS Controller" });
    //res.status(200).json({budgetData: budgetMISData.data.payload, actualData: actualMISData});
    //res.status(200).json({budgetData: budgetMISData.data.payload[0].inputRevenue0});
    //res.status(200).json({ budgetData: budgetMISData, actualData: actualMISData, filturedData, returnTemplate, }).end()
    //
  }
  res.status(200).json( filturedData ).end();
};
//
//
const processBudgetData = (data) => {
  let payload;
  if (data) {
    //console.log("Length: "+data.length)
    payload = data.payload;
    returnTemplate.title = data.propertyName;
    returnTemplate.propertyCode = data.propertyCode;
    //console.log("data.propertyCode: " + data.propertyCode + " PHL ");
    //returnTemplate.year = data.budgetYear
    //budgetDataArr [0] =
    let revData = {
      target: [],
      actual: [],
    },
    roomRevData = {
      target: [],
      actual: [],
    },
    fnbRevData = {
      target: [],
      actual: [],
    },
    banquetRevData = {
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
    let intRevData = {
      target: [],
      actual: [],
    };

    let indoorPatientsData = {
      target: [],
      actual: [],
    }

    let ARPOBData = {
      target: [],
      target_q: [],
      actual: [],
      actual_q: [],
    };
    let ALOSData = {
      target: [],
      target_q: [],
      actual: [],
      actual_ytd: [],
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
    roomRevData.target = [
      payload[0].inputRoomRevenue0? payload[0].inputRoomRevenue0: 0,
      payload[0].inputRoomRevenue1? payload[0].inputRoomRevenue1: 0,
      payload[0].inputRoomRevenue2? payload[0].inputRoomRevenue2: 0,
      //
      payload[1].inputRoomRevenue0? payload[1].inputRoomRevenue0: 0,
      payload[1].inputRoomRevenue1? payload[1].inputRoomRevenue1: 0,
      payload[1].inputRoomRevenue2? payload[1].inputRoomRevenue2: 0,
      //
      payload[2].inputRoomRevenue0? payload[2].inputRoomRevenue0: 0,
      payload[2].inputRoomRevenue1? payload[2].inputRoomRevenue1: 0,
      payload[2].inputRoomRevenue2? payload[2].inputRoomRevenue2: 0,
      //
      payload[3].inputRoomRevenue0? payload[3].inputRoomRevenue0: 0,
      payload[3].inputRoomRevenue1? payload[3].inputRoomRevenue1: 0,
      payload[3].inputRoomRevenue2? payload[3].inputRoomRevenue2: 0,
    ]
    roomRevData.actual = [];
    //
    fnbRevData.target = [
      payload[0].inputFnBRevenue0? payload[0].inputFnBRevenue0 : 0,
      payload[0].inputFnBRevenue1? payload[0].inputFnBRevenue1 : 0,
      payload[0].inputFnBRevenue2? payload[0].inputFnBRevenue2 : 0,
      //
      payload[1].inputFnBRevenue0? payload[1].inputFnBRevenue0 : 0,
      payload[1].inputFnBRevenue1? payload[1].inputFnBRevenue1 : 0,
      payload[1].inputFnBRevenue2? payload[1].inputFnBRevenue2 : 0,
      //
      payload[2].inputFnBRevenue0? payload[2].inputFnBRevenue0 : 0,
      payload[2].inputFnBRevenue1? payload[2].inputFnBRevenue1 : 0,
      payload[2].inputFnBRevenue2? payload[2].inputFnBRevenue2 : 0,
      //
      payload[3].inputFnBRevenue0? payload[3].inputFnBRevenue0 : 0,
      payload[3].inputFnBRevenue1? payload[3].inputFnBRevenue1 : 0,
      payload[3].inputFnBRevenue2? payload[3].inputFnBRevenue2 : 0,
    ]
    fnbRevData.actual = [];
    //
    banquetRevData.target = [
      payload[0].inputBanquetRevenue0? payload[0].inputBanquetRevenue0 : 0,
      payload[0].inputBanquetRevenue1? payload[0].inputBanquetRevenue1 : 0,
      payload[0].inputBanquetRevenue2? payload[0].inputBanquetRevenue2 : 0,
      //
      payload[1].inputBanquetRevenue0? payload[1].inputBanquetRevenue0 : 0,
      payload[1].inputBanquetRevenue1? payload[1].inputBanquetRevenue1 : 0,
      payload[1].inputBanquetRevenue2? payload[1].inputBanquetRevenue2 : 0,
      //
      payload[2].inputBanquetRevenue0? payload[2].inputBanquetRevenue0 : 0,
      payload[2].inputBanquetRevenue1? payload[2].inputBanquetRevenue1 : 0,
      payload[2].inputBanquetRevenue2? payload[2].inputBanquetRevenue2 : 0,
      //
      payload[3].inputBanquetRevenue0? payload[3].inputBanquetRevenue0 : 0,
      payload[3].inputBanquetRevenue1? payload[3].inputBanquetRevenue1 : 0,
      payload[3].inputBanquetRevenue2? payload[3].inputBanquetRevenue2 : 0,

    ]
    //
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
    if(data.propertyCode === "PHH"){
      occupancyData.target_q = [
        payload[0].qOccupancy,
        payload[1].qOccupancy,
        payload[2].qOccupancy,
        payload[3].qOccupancy,
        payload[4].avgOccupancyAnnual
      ];
    }else{
      occupancyData.target_q = [
        payload[0].avgOccupancy,
        payload[1].avgOccupancy,
        payload[2].avgOccupancy,
        payload[3].avgOccupancy,
        payload[4].avgOccupancyAnnual
      ];
    }
    
    //occupancyData.target_a = 
    //
    arrData.target = [
      payload[0].inputARR0,
      payload[0].inputARR1,
      payload[0].inputARR2,
      payload[1].inputARR0,
      payload[1].inputARR1,
      payload[1].inputARR2,
      payload[2].inputARR0,
      payload[2].inputARR1,
      payload[2].inputARR2,
      payload[3].inputARR0,
      payload[3].inputARR1,
      payload[3].inputARR2,
    ];
    arrData.target_q = [
      payload[0].avgARR,
      payload[1].avgARR,
      payload[2].avgARR,
      payload[3].avgARR,
      payload[4].avgARRAnnual,
    ];
    ebidtaMgn.target = [
      Number(
        ((payload[0].inputEBIDTA0 / payload[0].inputRevenue0) * 100).toFixed(2)
      ),
      Number(
        ((payload[0].inputEBIDTA1 / payload[0].inputRevenue1) * 100).toFixed(2)
      ),
      Number(
        ((payload[0].inputEBIDTA2 / payload[0].inputRevenue2) * 100).toFixed(2)
      ),

      Number(
        ((payload[1].inputEBIDTA0 / payload[1].inputRevenue0) * 100).toFixed(2)
      ),
      Number(
        ((payload[1].inputEBIDTA1 / payload[1].inputRevenue1) * 100).toFixed(2)
      ),
      Number(
        ((payload[1].inputEBIDTA2 / payload[1].inputRevenue2) * 100).toFixed(2)
      ),

      Number(
        ((payload[2].inputEBIDTA0 / payload[2].inputRevenue0) * 100).toFixed(2)
      ),
      Number(
        ((payload[2].inputEBIDTA1 / payload[2].inputRevenue1) * 100).toFixed(2)
      ),
      Number(
        ((payload[2].inputEBIDTA2 / payload[2].inputRevenue2) * 100).toFixed(2)
      ),

      Number(
        ((payload[3].inputEBIDTA0 / payload[3].inputRevenue0) * 100).toFixed(2)
      ),
      Number(
        ((payload[3].inputEBIDTA1 / payload[3].inputRevenue1) * 100).toFixed(2)
      ),
      Number(
        ((payload[3].inputEBIDTA2 / payload[3].inputRevenue2) * 100).toFixed(2)
      ),
    ];
    //
    intRevData.target = [
      payload[0].inputIntRevenue0,
      payload[0].inputIntRevenue1,
      payload[0].inputIntRevenue2,
      payload[1].inputIntRevenue0,
      payload[1].inputIntRevenue1,
      payload[1].inputIntRevenue2,
      payload[2].inputIntRevenue0,
      payload[2].inputIntRevenue1,
      payload[2].inputIntRevenue2,
      payload[3].inputIntRevenue0,
      payload[3].inputIntRevenue1,
      payload[3].inputIntRevenue2,
    ];
    indoorPatientsData.target = [
      payload[0].inputPatientServed0,
      payload[0].inputPatientServed1,
      payload[0].inputPatientServed2,
      payload[1].inputPatientServed0,
      payload[1].inputPatientServed1,
      payload[1].inputPatientServed2,
      payload[2].inputPatientServed0,
      payload[2].inputPatientServed1,
      payload[2].inputPatientServed2,
      payload[3].inputPatientServed0,
      payload[3].inputPatientServed1,
      payload[3].inputPatientServed2,
    ]
    ARPOBData.target = [
      payload[0].inputARPOB0,
      payload[0].inputARPOB1,
      payload[0].inputARPOB2,
      payload[1].inputARPOB0,
      payload[1].inputARPOB1,
      payload[1].inputARPOB2,
      payload[2].inputARPOB0,
      payload[2].inputARPOB1,
      payload[2].inputARPOB2,
      payload[3].inputARPOB0,
      payload[3].inputARPOB1,
      payload[3].inputARPOB2,
    ];
    ARPOBData.target_q = [
      payload[0].qARPOB,
      payload[1].qARPOB,
      payload[2].qARPOB,
      payload[3].qARPOB,
      payload[4].avgARPOBAnnual,
    ];
    ALOSData.target = [
      payload[0].inputALOS0,
      payload[0].inputALOS1,
      payload[0].inputALOS2,
      payload[1].inputALOS0,
      payload[1].inputALOS1,
      payload[1].inputALOS2,
      payload[2].inputALOS0,
      payload[2].inputALOS1,
      payload[2].inputALOS2,
      payload[3].inputALOS0,
      payload[3].inputALOS1,
      payload[3].inputALOS2,
    ];
    ALOSData.target_q = [
      payload[0].qALOS,
      payload[1].qALOS,
      payload[2].qALOS,
      payload[3].qALOS,
      payload[4].avgALOSAnnual,
    ];
    //
    //
    returnTemplate.data.revenue.target = [...revData.target];
    returnTemplate.data.roomRevenue.target = [...roomRevData.target];
    returnTemplate.data.fnbRevenue.target = [...fnbRevData.target];
    returnTemplate.data.banquetRevenue.target = [...banquetRevData.target];
    //
    returnTemplate.data.PBT.target = [...pbtData.target];
    returnTemplate.data.EBIDTA.target = [...ebidtaData.target];
    returnTemplate.data.EBIDTA_mgn.target = [...ebidtaMgn.target];
    //
    returnTemplate.data.occupancy.target = [...occupancyData.target];
    returnTemplate.data.occupancy.target_q = [...occupancyData.target_q];
    //
    returnTemplate.data.arr.target = [...arrData.target];
    returnTemplate.data.arr.target_q = [...arrData.target_q];
    //
    //
    returnTemplate.data.int_rev.target = [...intRevData.target];
    //
    returnTemplate.data.indoor_patients.target = [...indoorPatientsData.target];
    //
    returnTemplate.data.ARPOB.target = [...ARPOBData.target];
    returnTemplate.data.ARPOB.target_q = [...ARPOBData.target_q];
    //
    returnTemplate.data.ALOS.target = [...ALOSData.target];
    returnTemplate.data.ALOS.target_q = [...ALOSData.target_q];

  }
};
//
//
//
const processActualData = (data) => {
  let len = data.length;
  //
  let revData = {
    actual: [],
  },
  roomRevData = {
    actual: [],
  },
  fnbRevData = {
    actual: [],
  },
  banquetRevData = {
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
  //
  //
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
  let intRevData = {
    actual: [],
  };

  let indoorPatientsData = {
    actual: [],
  }

  let ARPOBData = {
    actual: [],
    actual_q : [],
    actual_ytd: [],
  };
  let ALOSData = {
    actual: [],
    actual_q : [],
    actual_ytd: [],
  };
  //
  for (let i = 0; i < len; i++) {
    let mon = data[i].actualMonth;
    let index = 0;
    for (let j = 0; j < monthsArray.length; j++) {
      //console.log(monthsArray[j])
      if (mon === monthsArray[j]) {
        index = j;
        break;
      }
    }
    //
    // populate actual data here.
    //

    revData.actual[index] = data[i].payload.inputRevenue;
    // inputFnBRevenue inputBanquetRevenue
    roomRevData.actual[index] = data[i].payload.inputRoomRevenue ? data[i].payload.inputRoomRevenue : 0 
    fnbRevData.actual[index] = data[i].payload.inputFnBRevenue ? data[i].payload.inputFnBRevenue : 0
    banquetRevData.actual[index] = data[i].payload.inputBanquetRevenue ? data[i].payload.inputBanquetRevenue : 0
    //
    //
    // console.log("data[i].payload.inputPBT")
    // console.log(data[i].payload.inputPBT)
    // console.log("END Data")
    pbtData.actual[index] = data[i].payload.inputPBT;
    ebidtaData.actual[index] = data[i].payload.inputEBIDTA;
    ebidtaMgn.actual[index] = Number(
      (
        (data[i].payload.inputEBIDTA / data[i].payload.inputRevenue) *
        100
      ).toFixed(2)
    );
    //
    occupancyData.actual[index] = data[i].payload.inputOccupancy;
    occupancyData.actual_ytd[index] = data[i].payload.inputOccupancyYTD;
    occupancyData.actual_q[index] = data[i].payload.inputOccupancy_q//0;
    //
    arrData.actual[index] = data[i].payload.inputARR;
    arrData.actual_q[index] = data[i].payload.inputARR_q//0;
    arrData.actual_ytd[index] = data[i].payload.inputARRYTD;
    //
    intRevData.actual[index] = data[i].payload.inputIntRevenue;
    indoorPatientsData.actual[index] = data[i].payload.inputPatientServed;
    //
    ARPOBData.actual[index] = data[i].payload.inputARPOB;
    ARPOBData.actual_q[index] =data[i].payload.inputARPOB_q;
    ARPOBData.actual_ytd[index] = data[i].payload.inputARPOBYTD;
    //
    ALOSData.actual[index] = data[i].payload.inputALOS;
    ALOSData.actual_q[index] = data[i].payload.inputALOS_q;
    ALOSData.actual_ytd[index] = data[i].payload.inputALOSYTD;
    //
    console.log(mon, index);
  }
  // Assign it to returnTemplate
  //
  returnTemplate.data.revenue.actual = [...revData.actual];
  returnTemplate.data.roomRevenue.actual = [...roomRevData.actual];
  returnTemplate.data.fnbRevenue.actual = [...fnbRevData.actual];
  returnTemplate.data.banquetRevenue.actual = [...banquetRevData.actual];
  //
  returnTemplate.data.PBT.actual = [...pbtData.actual];
  returnTemplate.data.EBIDTA.actual = [...ebidtaData.actual];
  returnTemplate.data.EBIDTA_mgn.actual = [...ebidtaMgn.actual];
  //
  returnTemplate.data.occupancy.actual = [...occupancyData.actual];
  returnTemplate.data.occupancy.actual_q = [ ...occupancyData.actual_q ]
  returnTemplate.data.occupancy.actual_ytd = [...occupancyData.actual_ytd];
  //
  returnTemplate.data.arr.actual = [...arrData.actual];
  returnTemplate.data.arr.actual_q = [ ...arrData.actual_q ];
  returnTemplate.data.arr.actual_ytd = [...arrData.actual_ytd];
  //
  //
  returnTemplate.data.int_rev.actual = [...intRevData.actual];
  //
  returnTemplate.data.indoor_patients.actual = [...indoorPatientsData.actual];
  //
  returnTemplate.data.ARPOB.actual = [...ARPOBData.actual];
  returnTemplate.data.ARPOB.actual_q = [...ARPOBData.actual_q];
  returnTemplate.data.ARPOB.actual_ytd = [...ARPOBData.actual_ytd];
  //
  returnTemplate.data.ALOS.actual = [...ALOSData.actual];
  returnTemplate.data.ALOS.actual_q = [ ...ALOSData.actual_q ]
  returnTemplate.data.ALOS.actual_ytd = [...ALOSData.actual_ytd];
  //
};
//
//
const processHotelBudgetData = (data) => {
  let revData = {
    target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  let pbtData = {
    target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  let ebidtaData = {
    target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  let ebidtaMgn = {
    target: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  let payloadArr = [];

  if (data) {
    console.log(data.length);
    for (let i = 0; i < data.length; i++) {
      payloadArr.push(data[i].payload);
    }
    //
    for (let j = 0; j < payloadArr.length; j++) {
      revData.target = [
        revData.target[0] + payloadArr[j][0].inputRevenue0,
        revData.target[1] + payloadArr[j][0].inputRevenue1,
        revData.target[2] + payloadArr[j][0].inputRevenue2,

        revData.target[3] + payloadArr[j][1].inputRevenue0,
        revData.target[4] + payloadArr[j][1].inputRevenue1,
        revData.target[5] + payloadArr[j][1].inputRevenue2,

        revData.target[6] + payloadArr[j][2].inputRevenue0,
        revData.target[7] + payloadArr[j][2].inputRevenue1,
        revData.target[8] + payloadArr[j][2].inputRevenue2,

        revData.target[9] + payloadArr[j][3].inputRevenue0,
        revData.target[10] + payloadArr[j][3].inputRevenue1,
        revData.target[11] + payloadArr[j][3].inputRevenue2,
      ];
      pbtData.target = [
        pbtData.target[0] + payloadArr[j][0].inputPBT0,
        pbtData.target[1] + payloadArr[j][0].inputPBT1,
        pbtData.target[2] + payloadArr[j][0].inputPBT2,

        pbtData.target[3] + payloadArr[j][1].inputPBT0,
        pbtData.target[4] + payloadArr[j][1].inputPBT1,
        pbtData.target[5] + payloadArr[j][1].inputPBT2,

        pbtData.target[6] + payloadArr[j][2].inputPBT0,
        pbtData.target[7] + payloadArr[j][2].inputPBT1,
        pbtData.target[8] + payloadArr[j][2].inputPBT2,

        pbtData.target[9] + payloadArr[j][3].inputPBT0,
        pbtData.target[10] + payloadArr[j][3].inputPBT1,
        pbtData.target[11] + payloadArr[j][3].inputPBT2,
      ];
      ebidtaData.target = [
        ebidtaData.target[0] + payloadArr[j][0].inputEBIDTA0,
        ebidtaData.target[1] + payloadArr[j][0].inputEBIDTA1,
        ebidtaData.target[2] + payloadArr[j][0].inputEBIDTA2,

        ebidtaData.target[3] + payloadArr[j][1].inputEBIDTA0,
        ebidtaData.target[4] + payloadArr[j][1].inputEBIDTA1,
        ebidtaData.target[5] + payloadArr[j][1].inputEBIDTA2,

        ebidtaData.target[6] + payloadArr[j][2].inputEBIDTA0,
        ebidtaData.target[7] + payloadArr[j][2].inputEBIDTA1,
        ebidtaData.target[8] + payloadArr[j][2].inputEBIDTA2,

        ebidtaData.target[9] + payloadArr[j][3].inputEBIDTA0,
        ebidtaData.target[10] + payloadArr[j][3].inputEBIDTA1,
        ebidtaData.target[11] + payloadArr[j][3].inputEBIDTA2,
      ];
    }
    for (let a = 0; a < ebidtaData.target.length; a++) {
      revData.target[a] = Number(revData.target[a].toFixed(2));
      pbtData.target[a] = Number(pbtData.target[a].toFixed(2));
      ebidtaData.target[a] = Number(ebidtaData.target[a].toFixed(2));
      ebidtaMgn.target[a] = Number(
        ((ebidtaData.target[a] / revData.target[a]) * 100).toFixed(2)
      );
    }
    // returnTemplate.data.PBT.target = [...payloadArr];
    // returnTemplate.data.revenue.target = [...revData.target];
    //

    returnTemplate.data.revenue.target = [...revData.target];
    returnTemplate.data.PBT.target = [...pbtData.target];
    returnTemplate.data.EBIDTA.target = [...ebidtaData.target];
    returnTemplate.data.EBIDTA_mgn.target = [...ebidtaMgn.target];
    //returnTemplate.data.occupancy = [];
    //returnTemplate.data.arr = [];
    //delete returnTemplate.data.occupancy;
    //delete returnTemplate.data.arr;
    //
    //
  }
};
//
//
const processHotelActualData = (data) => {
  if (data) {
    //
    let len = data.length;
    //
    let revData = {
      actual: [0,0,0,0,0,0,0,0,0,0,0,0],
    };
    let pbtData = {
      actual: [0,0,0,0,0,0,0,0,0,0,0,0],
    };
    let ebidtaData = {
      actual: [0,0,0,0,0,0,0,0,0,0,0,0],
    };
    let ebidtaMgn = {
      actual: [0,0,0,0,0,0,0,0,0,0,0,0],
    };
    //
    let occupancyData = {
      actual: [],
      actual_ytd: [],
    };
    let arrData = {
      actual: [],
      actual_ytd: [],
    };
    //
    for (let i = 0; i < len; i++) {
      let mon = data[i].actualMonth;
      let index = 0;
      for (let j = 0; j < monthsArray.length; j++) {
        //console.log(monthsArray[j])
        if (mon === monthsArray[j]) {
          index = j;
          break;
        }
      }
      //
      // populate actual data here.
      //
      //console.log(data[i].propertyCode, data[i].actualMonth +":"+ data[i].payload.inputRevenue);
      revData.actual[index] += Number(data[i].payload.inputRevenue);
      pbtData.actual[index] += data[i].payload.inputPBT;
      ebidtaData.actual[index] += data[i].payload.inputEBIDTA;
      ebidtaMgn.actual[index] += Number(
        (
          (data[i].payload.inputEBIDTA / data[i].payload.inputRevenue) *
          100
        ).toFixed(2)
      );
      //
      //occupancyData.actual[index] = data[i].payload.inputOccupancy;
      //occupancyData.actual_ytd[index] = data[i].payload.inputOccupancyYTD;
      //arrData.actual[index] = data[i].payload.inputARR;
      //arrData.actual_ytd[index] = data[i].payload.inputARRYTD;
      //
      for(let i=0; i<revData.actual.length; i++ ){
        ebidtaMgn.actual[i] = Number(
          (
            (ebidtaData.actual[i] / revData.actual[i]) * 100
          ).toFixed(2)
        );
      }
      //console.log(mon, index);
    }
    //
    // Assign it to returnTemplate
    //
    returnTemplate.data.revenue.actual = [...revData.actual];
    returnTemplate.data.PBT.actual = [...pbtData.actual];
    returnTemplate.data.EBIDTA.actual = [...ebidtaData.actual];
    returnTemplate.data.EBIDTA_mgn.actual = [...ebidtaMgn.actual];
    //
    //returnTemplate.data.occupancy.actual = [...occupancyData.actual];
    //returnTemplate.data.occupancy.actual_ytd = [...occupancyData.actual_ytd];
    //
    //returnTemplate.data.arr.actual = [...arrData.actual];
    //returnTemplate.data.arr.actual_ytd = [...arrData.actual_ytd];
    //
    //
    //console.log(data.length);
    // for (let i = 0; i < data.length; i++) {
    //   console.log(i, data[i].propertyCode, data[i].actualMonth);
    // }
  }
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
