const fetch = require('node-fetch');

/**
 * Data returned to Mocha reporter.
 */
const result = {
  gasUsed: null,
  fiatSymbol: null,
  fiatCost: null
};

/**
 * Fetched prices.
 */
let prices = {
  gas: null,
  USD: null,
  EUR: null,
  RUR: null,
  GBG: null
}

/**
 * Get price of 1 Ether in fiat.
 * Can't find a reliable API to do this, if you have any idea please tell me!
 */
getFiatPrice = async fiatSymbol => {
  if (!prices[fiatSymbol]) {
    const res = await fetch('https://api.cryptonator.com/api/ticker/eth-' + fiatSymbol.toLowerCase());
    const json = await res.json();
    const price = json.ticker.price;
    prices[fiatSymbol] = price;
  }
}

/**
 * Get gas price.
 */
getGasPrice = async () => {
  if (!prices.gas) {
    const wei = 1000000000000000000;
    const ethGasStationToEther = 1000000000 / 10 / wei;
    const res = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
    const json = await res.json();
    const gasPrice = json.average * ethGasStationToEther;
    prices.gas = gasPrice;
  }
}

/**
 * Reset before each test.
 */
reset = () => {
  result.gasUsed = null;
  result.fiatSymbol = null;
  result.fiatCost = null;
  return;
}

/**
 * Main function: log gas used for a transaction and optionally cost in fiat.
 */
log = async (asyncFn, fiatSymbol) => {
  // Transaction result.
  const txResult = await asyncFn;
  // Used gas for Mocha reporter.
  result.gasUsed = txResult.receipt.gasUsed;
  // If call has a fiat symbol param,
  if (fiatSymbol) {
    // Get gas price.
    await getGasPrice();
    // Get price in fiat of 1 Ether.
    await getFiatPrice(fiatSymbol);
    // Fiat symbol for Mocha.
    result.fiatSymbol = fiatSymbol;
    // Fiat cost for Mocha.
    result.fiatCost = (result.gasUsed * prices.gas * prices[fiatSymbol]).toFixed(3);
  }
  // Return result of transaction to Truffle TestRunner.
  return txResult;
}

// Export everything.
module.exports = {
  reset: () => {
    return reset();
  },
  log: (asyncFn, fiatSymbol = null) => {
    return log(asyncFn, fiatSymbol);
  },
  result: () => {
    return result;
  }
}
