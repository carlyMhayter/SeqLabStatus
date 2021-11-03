function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function intializeArray() {
  let instrumentNAMES = [...Array(15)].map((y, i) => {
    let name = "";
    let num = Math.floor(1 + Math.random() * 20);
    // console.log("num length: ", num.toString().length);
    if (num.toString().length === 1) {
      name = "0";
    }

    if (i < 10) {
      name = "B" + name + num;
    } else {
      name = "M" + name + num;
    }

    return name;
  });

  return [...new Set(instrumentNAMES)];
}

function populateInstruments(instrumentNameArray) {
  //generating FCIDS
  const loChanceArray = [1, 3, 5, 7, 9, 2, 4];
  const evenChanceArray = [1, 2, 3, 4];
  const upStatuses = ["operational", "validation needed"];
  const downStatuses = ["out of lab", "down"];
  const status = "unknown";
  let cycleNumbers = [22, 52, 75, 102, 120, 180, 210];
  let cycleLengths = [3, 4, 5, 6];
  let instrumentArray = new Array();
  let IDITnumbers = "NA";

  instrumentNameArray.forEach((instrumentNAME) => {
    const machine = new Object({ instrumentName: instrumentNAME });
    const beginningLetters = "FB";
    let endLetters = "";
    let numbers = String(Date.now() + Math.floor(Math.random() * 1000));
    let fullname = "";
    let status = "unknown";
    let machineUp = true;
    let startingTime = new Date();
    let totalCycles = 1;
    let currentCycles = 1;

    if (
      loChanceArray[Math.floor(Math.random() * loChanceArray.length)] % 2 ===
      0
    ) {
      status = downStatuses[Math.round(Math.random() * 1)];
      machineUp = false;
    } else {
      status = upStatuses[Math.round(Math.random() * 1)];
      machineUp = true;
    }

    machine.instrumentStatus = status;

    if (machine.instrumentName.slice(0, 1) === "M") {
      endLetters = "-AAA";
      const fullname = beginningLetters + numbers.slice(6, 13) + endLetters;
      machine.FCID = fullname;
      machine["instrumentType"] = "George";
    } else {
      endLetters = "-ABB";
      const fullname = beginningLetters + numbers.slice(6, 13) + endLetters;
      machine.FCID = fullname;
      machine["instrumentType"] = "Barracuda";
    }
    if (machineUp) {
      //assign random time  to object start
      startingTime = randomDate(
        new Date(2021, 10, 12, 8),
        new Date(2021, 10, 12, 20)
      );
      machine.startTime = startingTime;
      // machine.startTime = startingTime.toString().slice(0, 24);
      totalCycles =
        cycleNumbers[Math.floor(Math.random() * cycleNumbers.length)];
      currentCycles = Math.floor(Math.random() * totalCycles);
      console.log(totalCycles);
      console.log(currentCycles);

      machine.currentCycle = currentCycles;
      machine.totalCycle = totalCycles;
      if (
        loChanceArray[Math.floor(Math.random() * loChanceArray.length)] % 2 ===
        0
      ) {
        machine.cycleLength = [Math.round(Math.random() * 6)] + 2;
      } else {
        machine.cycleLength = 4;
      }
    } else {
      IDITnumbers = "IDIT-" + ([Math.round(Math.random() * 4000)] - 1000);
    }
    machine.IDITnumber = IDITnumbers;
    // console.log("here is the instrument object:", machine);
    instrumentArray.push(machine);
  });
  console.log(instrumentArray);
  return instrumentArray;
}

export function randomizeInstrumentData() {
  const instrumentNames = intializeArray();
  const instrumentArray = populateInstruments(instrumentNames);
  return instrumentArray;
}

// randomizeInstrumentData();
