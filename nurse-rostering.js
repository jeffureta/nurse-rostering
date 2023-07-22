function createSchedule() {
    const numNurses = 7;
    const numDays = 30;
    const minNursesPerDay = 4;
    const weekendDays = [6, 7, 13, 14, 20, 21, 27, 28]; // Zero-based
    const maxShiftsPerMonth = 13;
  
    const nurses = [true, false, true, true, false, true, false];
    let shiftsCounter = new Array(numNurses).fill(0);
    let schedule = {};
    let nurseOneShifts = 0;
  
    // Schedule nurses to each day
    for(let index = 0; index < numDays; index++) {
      let day = `Day ${index+1}`;
      schedule[day] = [];
      let i = 0;
      while(schedule[day].length < minNursesPerDay) {
        // Select nurse based on day and shift, wrap around with modulo
        let nurseIndex = (index + i) % numNurses;
        // Check if the day is a weekend or a rest day before or after the weekend for the two weekend nurses
        if(weekendDays.includes(index) || weekendDays.includes(index-1) || weekendDays.includes(index+1)) {
          if(i < 2) {
            if(weekendDays.includes(index)) {
              // Check if the nurse has reached the maximum number of shifts
              if(shiftsCounter[nurseIndex] < maxShiftsPerMonth) {
                schedule[day].push(`Nurse ${nurseIndex+1} (12-hour shift)`);
                shiftsCounter[nurseIndex]++;
                if(nurseIndex === 0) nurseOneShifts++;
              }
            }
            // Do not schedule the weekend nurses on rest days before or after the weekend
          } else {
            if(nurses[nurseIndex] && shiftsCounter[nurseIndex] < maxShiftsPerMonth) {
              schedule[day].push(`Nurse ${nurseIndex+1} (12-hour shift)`);
              shiftsCounter[nurseIndex]++;
              if(nurseIndex === 0) nurseOneShifts++;
            } else if(!nurses[nurseIndex]) {
              schedule[day].push(`Nurse ${nurseIndex+1}`);
            }
          }
        } else {
          if(nurses[nurseIndex] && shiftsCounter[nurseIndex] < maxShiftsPerMonth) {
            schedule[day].push(`Nurse ${nurseIndex+1} (12-hour shift)`);
            shiftsCounter[nurseIndex]++;
            if(nurseIndex === 0) nurseOneShifts++;
          } else if(!nurses[nurseIndex]) {
            schedule[day].push(`Nurse ${nurseIndex+1}`);
          }
        }
        i++;
      }
    }
  
    console.log(`Total shifts of Nurse 1: ${nurseOneShifts}`);
    return schedule;
  }