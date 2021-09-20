// var http = require("http");
var express = require("express");
var cors = require("cors");
var app = express();

const seqData = [
  {
    instrumentName: "M02",
    FCID: "AA1234567-ABB",
    currentCycle: 11,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "George",
    IDITnumber: "NA",
  },
  {
    instrumentName: "M04",
    FCID: "AA1234567-ABB",
    currentCycle: 115,
    totalCycle: 175,
    backW: false,
    instrumentStatus: "operational",
    instrumentType: "George",
    IDITnumber: "NA",
  },
  {
    instrumentName: "M05",
    FCID: "AA1234567-ABB",
    currentCycle: 138,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "George",
    IDITnumber: "NA",
  },
  {
    instrumentName: "B01",
    FCID: "AA1234567-ABB",
    currentCycle: 174,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "validation needed",
    instrumentType: "Barracuda",
    IDITnumber: "IDIT-1605",
  },
  {
    instrumentName: "B02",
    FCID: "AA1234567-ABB",
    currentCycle: 173,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
  },
  {
    instrumentName: "B07",
    FCID: "NA",
    currentCycle: "NA",
    totalCycle: "NA",
    backW: "NA",
    instrumentStatus: "down",
    instrumentType: "Barracuda",
    IDITnumber: "IDIT-1618",
  },
  {
    instrumentName: "B13",
    FCID: "NA",
    currentCycle: "NA",
    totalCycle: "NA",
    backW: "NA",
    instrumentStatus: "out of lab",
    instrumentType: "Barracuda",
    IDITnumber: "IDIT-1630",
  },
  {
    instrumentName: "B09",
    FCID: "AA1234567-ABB",
    currentCycle: 10,
    totalCycle: 175,
    backW: false,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
  },
  {
    instrumentName: "B08",
    FCID: "AA1234567-ABB",
    currentCycle: 120,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "validation needed",
    instrumentType: "Barracuda",
    IDITnumber: "IDIT-1613",
  },
  {
    instrumentName: "B03",
    FCID: "AA1234567-ABB",
    currentCycle: 93,
    totalCycle: 175,
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
  },
  {
    instrumentName: "B06",
    FCID: "AA1234567-ABB",
    currentCycle: 62,
    totalCycle: 175,
    backW: false,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
  },
];

// var app = http.createServer(function (req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ seqData }));
// });
// app.listen(8080);

app.use(cors());

app.get("/", function (req, res, next) {
  res.json(seqData);
});

app.listen(8080, function () {
  console.log("CORS-enabled web server listening on port 8080");
});
