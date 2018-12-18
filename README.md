# Truffle cost

This module allows to log used gas of transactions in your Truffle tests, and optionally price in fiat.

![truffle-cost](https://raw.githubusercontent.com/guix77/truffle-cost/gh-pages/truffle-cost.png)

## Usage

Works with Truffle v5 and v4!

### 1) Install

    yarn add truffle-cost

(or *npm* instead of *yarn*)

### 2) Edit truffle-config.js / truffle.js

In the *mocha* section (Truffle v5) use the reporter [mocha-truffle-reporter](https://github.com/guix77/mocha-truffle-reporter):

    mocha: {
      reporter: "mocha-truffle-reporter"
    },

For Truffle v4, just add a Mocha section, like the *networks* section:

    module.exports = {
      // See <http://truffleframework.com/docs/advanced/configuration>
      // to customize your Truffle configuration!
      networks: {
        ganache: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "5777"
        }
      },
      mocha: {
        reporter: "mocha-truffle-reporter"
      }
    }

### 3) Use in your Truffle tests

Add it on top of your .js test:

    const truffleCost = require('truffle-cost');

Use it like this for instance:

    result = await truffleCost.log(
      yourContract.yourFunction()
    );

In *result* you will have the same thing as if you just did

    result = await yourContract.yourFunction();

To have the price in fiat, as well, add an option 'USD', 'EUR', 'RUR' or 'GBP':

    result = await truffleCost.log(
      yourContract.yourFunction(),
      'USD'
    );

## Donations

Donations in Ethereum and / or tokens are warmly accepted if you use and like this project:

    0x3e486ad2ca1e5b4a9b9088a1126f2961325aeaa7
