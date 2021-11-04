import { getSeqData } from "./app/app";
import { randomizeInstrumentData } from "./assets/utils/instrumentOptions";

// import { instruments } from "./app/utils/instrumentData";
import "./style.scss";
let instruments = [];

const refreshButton = document.getElementById("refresh-button");

instruments = randomizeInstrumentData();
getSeqData(instruments);

refreshButton.addEventListener("click", () => {
  instruments = randomizeInstrumentData();
  getSeqData(instruments);
  console.log("inside event listener:", instruments);
});
