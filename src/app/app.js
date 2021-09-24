import { removeAllChildNodes } from "./utils/infoFunctions";
import { getSeqDatafromAPI } from "./utils/infoFunctions";
import { addBasicInfo } from "./utils/infoFunctions";
import { addDownInfo } from "./utils/infoFunctions";
import { addUpInfo } from "./utils/infoFunctions";
import { addUpInfoHover } from "./utils/infoFunctions";

const instruContainer = document.getElementById("instru-container");
const br = document.createElement("br");

export const getSeqData = (instrumentsArray) => {
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
    instrumentDiv.appendChild(basicInfo);

    if (isInstrumentUp) {
      const upInstrumentInfo = addUpInfo(instrument);
      instrumentDiv.appendChild(upInstrumentInfo);
      instrumentDiv.appendChild(addUpInfoHover(instrument));
      instrumentDiv.classList.add("up-instru");
    } else {
      instrumentDiv.appendChild(addDownInfo(instrument));
      instrumentDiv.classList.add("down-instru");
    }

    instruContainer.appendChild(instrumentDiv);
  }); //iterating thru instruments end
};
