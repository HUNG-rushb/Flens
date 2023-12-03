const sliceUsername = (username,len) => {
  const slice = username?.slice(0, len);
  if (username?.length < len) {
    return username;
  }
  return slice + '...';
};

export default sliceUsername;
