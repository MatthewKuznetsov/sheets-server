function generateNewKey() {
  const date = new Date().getTime().toString(32);
  const random = (Math.random()*10000000000000000000).toString(32);
  return date + random;
}

module.exports = generateNewKey;
