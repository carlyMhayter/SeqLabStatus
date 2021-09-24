const { DateTime } = require("luxon");

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export async function getSeqDatafromAPI() {
  const response = await fetch(apiURl);
  let data = await response.json();
  console.log(data.length);

  return data;
}

export function addBasicInfo(instrument) {
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

export function addDownInfo(instrument) {
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

export function addUpInfo(instrument) {
  const upInfoDiv = document.createElement("div");
  const progressCurrent = document.createElement("div");
  const progressTotal = document.createElement("div");
  const cycleInfoDiv = document.createElement("div");
  const startTimeDiv = document.createElement("div");
  const endTimeTime = document.createElement("div");
  const endTimeText = document.createElement("div");

  //calculate ending time
  const BWtime = instrument.backW ? 40 : 0;
  const minsCycles =
    40 + instrument.totalCycle * instrument.cycleLength + BWtime;
  const dt = DateTime.fromISO(instrument.startTime);
  const startTimeNice = dt.toLocaleString(DateTime.DATETIME_SHORT);
  const endTimeNice = dt
    .plus({ minutes: minsCycles })
    .toLocaleString(DateTime.DATETIME_SHORT);

  //create text node with start time
  startTimeDiv.appendChild(
    document.createTextNode(`Start time: ${startTimeNice}`)
  );

  //create text node with end time
  endTimeText.appendChild(document.createTextNode(`Approx. end time:`));
  endTimeTime.appendChild(document.createTextNode(`${endTimeNice}`));

  //create text node with cycle ratio
  cycleInfoDiv.appendChild(
    document.createTextNode(
      `${instrument.currentCycle}/${instrument.totalCycle} cycles`
    )
  );

  //generate percentage # integer
  const percentageProgress = Math.floor(
    (instrument.currentCycle / instrument.totalCycle) * 100
  );

  //set width of progress bar to percentage
  progressCurrent.style.width = `${percentageProgress}%`;

  //add styling classes to percentage bars
  progressTotal.classList.add("progress-total");
  progressCurrent.classList.add("progress-current");
  endTimeText.classList.add("endTime-text");
  endTimeTime.classList.add("endTime-time");
  startTimeDiv.classList.add("startTime-info");
  //hook everything together
  progressTotal.appendChild(progressCurrent);
  upInfoDiv.appendChild(progressTotal);
  upInfoDiv.appendChild(cycleInfoDiv);
  upInfoDiv.appendChild(startTimeDiv);
  upInfoDiv.appendChild(endTimeText);
  upInfoDiv.appendChild(endTimeTime);

  upInfoDiv.classList.add("up-info");

  return upInfoDiv;
}

export function addUpInfoHover(instrument) {
  const upInfoDivHover = document.createElement("div");
  const fcidDiv = document.createElement("div");
  const emptyDiv = document.createElement("span");
  const bwDiv = document.createElement("div");

  instrument.backW
    ? bwDiv.appendChild(document.createTextNode("Backwash Applied."))
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
