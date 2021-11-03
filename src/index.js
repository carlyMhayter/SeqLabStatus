import { getSeqData } from "./app/app";
import { randomizeInstrumentData } from "./app/instrumentOptions";

// import { instruments } from "./app/utils/instrumentData";
import "./style.scss";

const refreshButton = document.getElementById("refresh-button");

instruments = randomizeInstrumentData();
getSeqData(instruments);

refreshButton.addEventListener("click", () => {
  instruments = randomizeInstrumentData();
  getSeqData(instruments);
});
