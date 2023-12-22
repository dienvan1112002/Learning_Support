function daysFromNow(dateString) {
    const now = new Date();
    const dateOfUpdatedAt = new Date(dateString);
    const differenceInTime = now.getTime() - dateOfUpdatedAt.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    return Math.ceil(differenceInDays);
  }


export default daysFromNow;
