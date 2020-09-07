const STANDARD_WORKING_HOUR = 8;

export const getOverTimeStatus = hours => {
  const isOverTime = hours > STANDARD_WORKING_HOUR;
  return isOverTime;
};

export const calcOverTimeHour = hours => {
  const isOverTime = getOverTimeStatus(hours);

  if (isOverTime) {
    const overTimeHour = hours - STANDARD_WORKING_HOUR;
    return overTimeHour;
  }

  return null;
};

export const calcPercentage = (bookedHours, totalHours) => {
  let percentage;
  const overTimeHour = calcOverTimeHour(totalHours);

  if (overTimeHour) {
    percentage = (overTimeHour * 100) / STANDARD_WORKING_HOUR;
    return percentage;
  }

  percentage = (bookedHours * 100) / STANDARD_WORKING_HOUR;
  return percentage;
};
