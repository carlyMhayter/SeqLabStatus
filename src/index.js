import { getSeqData } from "./app/app";
import { instruments } from "./app/utils/instrumentData";

const refreshButton = document.getElementById("refresh-button");

getSeqData(instruments);

refreshButton.addEventListener("click", () => getSeqData(instruments));
