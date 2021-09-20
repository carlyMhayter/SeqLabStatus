const refreshButton = document.getElementById("refresh-button");
const instruContainer = document.getElementById("instru-container");
// const DateTime = luxon.DateTime;
// const apiURl = "http://localhost:8080/";

import { DateTime } from "luxon"; 

const br = document.createElement("br");

const instruments = [
  {
    instrumentName: "BB506",
    FCID: "FB1234567",
    currentCycle: "12",
    totalCycle: "120",
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
    startTime: "2020-05-15T08:30:00",
  },
  {
    instrumentName: "BB612",
    FCID: "FB1234567",
    currentCycle: "57",
    totalCycle: "180",
    backW: true,
    instrumentStatus: "operational",
    instrumentType: "Barracuda",
    IDITnumber: "NA",
    startTime: "2020-05-15T08:30:00",
  },
  {
    instrumentName: "M03",
    FCID: "FB1234567",
    currentCycle: "23",
    totalCycle: "102",
    backW: false,
    instrumentStatus: "down",
    instrumentType: "George",
    IDITnumber: "IDIT-1719",
    startTime: "2020-05-15T08:30:00",
  },
];

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

async function getSeqDatafromAPI() {
  const response = await fetch(apiURl);
  let data = await response.json();
  console.log(data.length);

  return data;
}

function addBasicInfo(instrument) {
  const basicInfoDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const statusDiv = document.createElement("div");
  const instruTypeDiv = document.createElement("div");

  nameDiv.appendChild(document.createTextNode(`${instrument.instrumentName}`));
  nameDiv.classList.add(`instru-title`);

  statusDiv.appendChild(
    document.createTextNode(`${instrument.instrumentStatus}`)
  );
  statusDiv.classList.add(`instru-status`);

  instruTypeDiv.appendChild(
    document.createTextNode(`Instrument Type: ${instrument.instrumentType}`)
  );

  basicInfoDiv.appendChild(nameDiv);
  basicInfoDiv.appendChild(statusDiv);
  basicInfoDiv.appendChild(instruTypeDiv);
  return basicInfoDiv;
}

function addDownInfo(instrument) {
  const downInfoDiv = document.createElement("div");
  const link = document.createElement("a");
  const textDiv = document.createElement("div");
  const IDITdiv = document.createElement("div");

  textDiv.appendChild(
    document.createTextNode("Click for link to IDIT ticket.")
  );
  textDiv.classList.add(`idit-text`);

  IDITdiv.appendChild(document.createTextNode(`${instrument.IDITnumber}`));
  IDITdiv.classList.add(`idit-num`);

  link.appendChild(textDiv);
  link.title = "click here";
  link.href = `http://jira.omniome.com/browse/${instrument.IDITnumber}`;
  link.target = "_blank";

  downInfoDiv.appendChild(IDITdiv);
  downInfoDiv.appendChild(link);
  // downInfoDiv.classList.add("hide-down");
  return downInfoDiv;
}

function addUpInfo(instrument) {
  const upInfoDiv = document.createElement("div");
  const progressCurrent = document.createElement("div");
  const progressTotal = document.createElement("div");
  const cycleInfoDiv = document.createElement("div");
  const startingTime = document.createElement("div");

  // var stTime = DateTime.parseISO(instrument.startTime);

  cycleInfoDiv.appendChild(
    document.createTextNode(
      `${instrument.currentCycle}/${instrument.totalCycle} cycles`
    )
  );

  const percentageProgress = Math.floor(
    (instrument.currentCycle / instrument.totalCycle) * 100
  );

  // startingTime.appendChild(document.createTextNode({ stTime }));

  console.log("percentage:", `${percentageProgress}%`);

  progressCurrent.style.width = `${percentageProgress}%`;

  progressTotal.classList.add("progress-total");
  progressCurrent.classList.add("progress-current");

  progressTotal.appendChild(progressCurrent);
  upInfoDiv.appendChild(progressTotal);
  upInfoDiv.appendChild(cycleInfoDiv);
  upInfoDiv.classList.add("up-info");

  return upInfoDiv;
}

function addUpInfoHover(instrument) {
  const upInfoDivHover = document.createElement("div");
  const fcidDiv = document.createElement("div");
  const emptyDiv = document.createElement("span");
  const bwDiv = document.createElement("div");

  instrument.backW
    ? bwDiv.appendChild(
        document.createTextNode(
          "Backwash Applied. Additional 45 mins added to sequencing."
        )
      )
    : bwDiv.appendChild(document.createTextNode("No backwash applied."));
  bwDiv.classList.add("bw-text");

  fcidDiv.appendChild(document.createTextNode(`FCID: ${instrument.FCID}`));
  fcidDiv.classList.add("fcid-text");

  upInfoDivHover.appendChild(bwDiv);
  upInfoDivHover.appendChild(emptyDiv);
  upInfoDivHover.appendChild(fcidDiv);
  // upInfoDivHover.classList.add("hide-up");

  return upInfoDivHover;
}
console.log("executing script");

const getSeqData = (instrumentsArray) => {
  //remove all previous instrument info
  removeAllChildNodes(instruContainer);

  //wait until data is fetched from API before proceeding
  // const seqData = await getSeqDatafromAPI();
  console.log("getSeqData called");

  instrumentsArray.forEach((instrument) => {
    const {
      instrumentName,
      FCID,
      currentCycle,
      totalCycle,
      backW,
      instrumentStatus,
      instrumentType,
      IDITnumber,
      startTime,
    } = instrument;
    console.log("working on this instrument:", instrument);
    const instrumentDiv = document.createElement("div");
    let isInstrumentUp = false;
    //iterate through each object key
    Object.keys(instrument).forEach((key, index) => {
      let instrumentDivClass = "";
      console.log(instrument.instrumentStatus);
      switch (instrument.instrumentStatus) {
        case "operational":
          instrumentDivClass = "green";
          isInstrumentUp = true;
          break;
        case "validation needed":
          instrumentDivClass = "yellow";
          isInstrumentUp = true;
          break;
        case "down":
          instrumentDivClass = "red";
          break;
        case "out of lab":
          instrumentDivClass = "grey";
          break;
      }

      instrumentDiv.classList.add(`instru`, `${instrumentDivClass}`);
    }); // iterating through each datapoint of instrument object

    const basicInfo = addBasicInfo(instrument);
    basicInfo.classList.add("basic-info");
    const upInstrumentInfo = addUpInfo(instrument);

    instrumentDiv.appendChild(basicInfo);

    if (isInstrumentUp) {
      instrumentDiv.appendChild(upInstrumentInfo);
      instrumentDiv.appendChild(addUpInfoHover(instrument));
      instrumentDiv.classList.add("up-instru");
    } else {
      instrumentDiv.appendChild(addDownInfo(instrument));
      instrumentDiv.classList.add("down-instru");
    }

    instruContainer.appendChild(instrumentDiv);
  }); //iterating thru instruments end
}; //getSeqData closing bracket

getSeqData(instruments);

refreshButton.addEventListener("click", () => getSeqData(instruments));
