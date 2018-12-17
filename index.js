web3 = require('web3');
cryptoPrice = require('crypto-price');

const wei = 1000000000000000000;

const model = {
  gasUsed: null,
  fiatSymbol: null,
  fiatCost: null
};

let result = model;

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
 * Log a transaction gas cost and optionally price in fiat.
 */
log = async (asyncFn, fiatSymbol) => {
  // Get used gas.
  const txResult = await asyncFn;
  result.gasUsed = txResult.receipt.gasUsed;
  // Optionally, get price in fiat.
  if (fiatSymbol) {
    // Fiat symbol.
    result.fiatSymbol = fiatSymbol;
    // Get price of Ether in fiat.
    const ethCryptoPrice = await cryptoPrice.getCryptoPrice(fiatSymbol, 'ETH');
    const ethPrice = ethCryptoPrice.price;
    // Cost of transaction in fiat.
    const gasPrice = await web3.eth.getGasPrice();
    const ethCost = result.gasUsed * gasPrice / wei;
    result.fiatCost = (ethCost * ethPrice).toFixed(3);
    return txResult;
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
