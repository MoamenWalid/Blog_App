export const convertDate = (isoDate) => {
  try {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
    
  } catch (error) {
    return error.message;
  }

}