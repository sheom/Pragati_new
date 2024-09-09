const allProperties =[
    {
      "_id":"6488063a4601d15e2d1680c4",
      "title":"Peerless Hotels & Resorts - Consolidated View",
      "description":"This is description text for Peerless Hotels",
      "propertyType":"PHL-All",
      "propertyCode":"PHL-All",
      "subsidiary" : "Hotel-All",
      "location":"Kolkata",
      //"photo":"/assets/imgs/phl_consolidated.jpg",
      "photo":"/assets/imgs/phl_rect.jpg",
      "photo_small":"/assets/imgs/HotelLogo.jpeg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"6488063a4601d15e2d1680c5",
      "title":"Peerless Hotels & Resorts - Property wise View",
      "description":"This is description text for Peerless Hotels",
      "propertyType":"PHL-Sub",
      "propertyCode":"PHL-All",
      "subsidiary" : "Hotel-All",
      "location":"Kolkata",
      //"photo":"/assets/imgs/phl_consolidated.jpg",
      "photo":"/assets/imgs/phl_rect.jpg",
      "photo_small":"/assets/imgs/phl_rect.jpg",
      //"photo_small":"/assets/imgs/HotelLogo.jpeg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648806c84601d15e2d1680c7",
      "title":"The Peerless Inn Kolkata",
      "description":"This is description text for The Peerless Inn Kolkata",
      "propertyType":"PHL",
      "propertyCode":"PIK",
      "subsidiary" : "Hotel",
      "location":"Kolkata",
      //"photo":"https://peerlesshotels.com/assets/images/facade/PIK-updated.jpg",
      "photo":"/assets/imgs/hotels/PIK-updated.jpg",
      "photo_small":"/assets/imgs/hotel_smalls/PIK-updated.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648807104601d15e2d1680ca",
      "title":"The Peerless Inn, Hyderabad",
      "description":"This is description text for The Peerless Inn, Hyderabad",
      "propertyType":"PHL",
      "propertyCode":"PIH",
      "subsidiary" : "Hotel",
      "location":"Hyderabad",
      //"photo":"https://peerlesshotels.com/assets/images/facade/PIH-updated.jpg",
      "photo":"/assets/imgs/hotels/PIH-updated.jpg",
      "photo_small":"/assets/imgs/hotel_smalls/PIH-updated.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648807594601d15e2d1680cf",
      "title":"The Peerless Inn, Durgapur",
      "description":"This is description text for The Peerless Inn, Durgapur",
      "propertyType":"PHL",
      "propertyCode":"PID",
      "subsidiary" : "Hotel",
      "location":"Durgapur",
      //"photo":"https://peerlesshotels.com/assets/images/facade/PID-updated.jpg",
      "photo":"/assets/imgs/hotels/PID-updated.jpg",
      "photo_small":"/assets/imgs/hotel_smalls/PID-updated.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648807aa4601d15e2d1680d2",
      "title":"Peerless Resort Mukutmanipur",
      "description":"This is description text for Peerless Resort Mukutmanipur",
      "propertyType":"PHL",
      "propertyCode":"PRM",
      "subsidiary" : "Hotel",
      "location":"Mukutmanipur",
      //"photo":"https://peerlesshotels.com/assets/images/facade/PRM-updated.jpg",
      "photo":"/assets/imgs/hotels/PRM-updated.jpg",
      "photo_small":"/assets/imgs/hotel_smalls/PRM-updated.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648808054601d15e2d1680d5",
      "title":"Peerless Resort Port Blair",
      "description":"This is description text for Peerless Resort Port Blair",
      "propertyType":"PHL",
      "propertyCode":"PRPB",
      "subsidiary" : "Hotel",
      "location":"Port Blair",
      //"photo":"https://peerlesshotels.com/assets/images/facade/PPO-updated.jpg",
      "photo":"/assets/imgs/hotels/PPO-updated.jpg",
      "photo_small":"/assets/imgs/hotel_smalls/PPO-updated.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648808cb4601d15e2d1680d8",
      "title":"Peerless Hospital",
      "description":"This is description text for Peerless Hospital",
      "propertyType":"PHH",
      "propertyCode":"PHH",
      "subsidiary" : "Hospital",
      "location":"Kolkata",
      //"photo":"https://www.peerlesshospital.com/hospital-kolkata/images/banner_inner.jpg",
      "photo":"/assets/imgs/phh_full.jpg",
      "photo_small":"/assets/imgs/phh_full.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648809284601d15e2d1680db",
      "title":"Peerless Financial Products Distribution Ltd",
      "description":"Description text for Peerless Financial Products Distribution Ltd",
      "propertyType":"PFPDL",
      "propertyCode":"PFPDL",
      "subsidiary" : "Financial Product Distribution",
      "location":"Kolkata",
      //"photo":"https://www.peerlessfpd.com/Landing%20page2.jpg",
      "photo":"/assets/imgs/pfpdl.jpg",
      "photo_small":"/assets/imgs/pfpdl.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"648809b24601d15e2d1680de",
      "title":"Peerless Securities Limited",
      "description":"Description text for Peerless Securities Limited",
      "propertyType":"PSL",
      "propertyCode":"PSL",
      "subsidiary" : "Securities",
      "location":"Kolkata",
      //"photo":"/assets/imgs/psl_rect.jpg",
      "photo":"/assets/imgs/psl_big.jpg",
      "photo_small":"/assets/imgs/psl_big.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    {
      "_id":"64880a1c4601d15e2d1680e1",
      "title":"Peerless Financial Services Limited",
      "description":"Description text for Peerless Financial Services Limited",
      "propertyType":"PFSL",
      "propertyCode":"PFSL",
      "subsidiary" : "Financial Services",
      "location":"Kolkata",
      //"photo":"https://www.peerlessfinance.in/assets/images/Prfessional-Loan.jpg",
      "photo":"/assets/imgs/Prfessional-Loan.jpg",
      "photo_small":"/assets/imgs/Prfessional-Loan.jpg",
      "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
      "__v":{"$numberInt":"0"}
    },
    // {
    //   "_id":"64880a794601d15e2d1680e4",
    //   "title":"Bengal Peerless Housing Development Company Ltd.",
    //   "description":"Description text for Bengal Peerless Housing Development Company Ltd.",
    //   "propertyType":"BP",
    //   "propertyCode":"BP",
    //   "subsidiary" : "Bengal Peerless",
    //   "location":"Kolkata",
    //   "photo":"https://bengalpeerless.com/wp-content/uploads/2017/10/AERIAL_EVENING_1.jpg",
    //   "creator":{"$oid":"6454acdfcd964cd7147a93d0"},
    //   "__v":{"$numberInt":"0"}
    // }
  ]

  export default allProperties