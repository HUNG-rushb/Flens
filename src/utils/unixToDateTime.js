function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const unixToDateTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 👇️ Format as hh:mm:ss
  const time = `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;

  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  return `${year}-${month}-${day} ${time}`;
};

export default unixToDateTime;
