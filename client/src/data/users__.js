const allUsers = [
    {
        "_id":{"$oid":"64636ce736305d935b776a00"},
        "firstName":"User",
        "lastName":"Hospital",
        "email":"user.hospital@mail.com",
        "password":"$2b$10$tD0UnuyJHoDQ7Rh0rtE3fe39E2nAyws1x730Wk2UWFrFGed6t2lui",
        "location":"Kolkata",
        "subsidiary":"Hospital",
        "subsidiaryId":"PHH",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684237543187"}},
        "updatedAt":{"$date":{"$numberLong":"1684237543187"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"6463709936305d935b776a03"},
        "firstName":"User",
        "lastName":"Hotel",
        "email":"user.hotel@mail.com",
        "password":"$2b$10$jwygxvrcJMZF8X29s91liu/87Wzx3D6MuYTC8ssfUab3RDbVrKrpC",
        "location":"Kolkata",
        "subsidiary":"Hotel",
        "subsidiaryId":"PHL",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684238489909"}},
        "updatedAt":{"$date":{"$numberLong":"1684238489909"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64690447b9383414461e2155"},
        "firstName":"user",
        "lastName":"PFPDL",
        "email":"user.pfpdl@mail.com",
        "password":"$2b$10$OZRC7T1amReBXHl..BoEkOV.pjoOC8hdSgeX745AIpO03LQ2o5UDu","location":"Kolkata",
        "subsidiary":"Financial Product Distribution",
        "subsidiaryId":"PFPDL",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684603975812"}},
        "updatedAt":{"$date":{"$numberLong":"1684603975812"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64690528b9383414461e2162"},
        "firstName":"user",
        "lastName":"Securities",
        "email":"user.psl@mail.com",
        "password":"$2b$10$61wuxgVjIQ6W2XuADGtYeuTdlsxegaePAI33CJL0s8qO2z3x1RsVa",
        "location":"kolkata",
        "subsidiary":"Securities",
        "subsidiaryId":"PSL",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684604200005"}},
        "updatedAt":{"$date":{"$numberLong":"1684604200005"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"64690581b9383414461e2171"},
        "firstName":"user",
        "lastName":"Bengal Peerless",
        "email":"user.bp@mail.com",
        "password":"$2b$10$ikZrkuu/bTG5Fgu/u7xetut.u6FKHmiwhVqscDSP42cmO0n6oced.","location":"Kolkata",
        "subsidiary":"Bengal Peerless",
        "subsidiaryId":"bp",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684604289822"}},
        "updatedAt":{"$date":{"$numberLong":"1684604289822"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"646a565f8c721e0a0bb9ce62"},
        "firstName":"User",
        "lastName":"Financial Services",
        "email":"user.pfsl@mail.com",
        "password":"$2b$10$vPYhHDu9PZt1eERaA5Z.7OcKeGdnUEMZB6h38w8wO.89DcNz5Dzv6",
        "location":"Kolkata",
        "subsidiary":"Financial Services",
        "subsidiaryId":"PFSL",
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1684690527634"}},
        "updatedAt":{"$date":{"$numberLong":"1684690527634"}},
        "__v":{"$numberInt":"0"}
    },
    {
        "_id":{"$oid":"6472f3595fcbf150ea74fdc0"},
        "firstName":"user",
        "lastName":"PGFI",
        "email":"user.pgfi@mail.com",
        "password":"$2b$10$.ZOrVvv8ms3YLQscO8r9y.t7td2VeWlDsnp0eCy8mrMGoFjsY1qyi",
        "location":"Kolkata",
        "subsidiary":"PGFI",
        "subsidiaryId":"PGFI",
        "Company Name": "Peerless general Finance and Investment company" ,
        "userRole":{"$numberInt":"0"},
        "createdAt":{"$date":{"$numberLong":"1685255001553"}},
        "updatedAt":{"$date":{"$numberLong":"1685255001553"}},
        "__v":{"$numberInt":"0"}
    }
    
]

export default allUsers