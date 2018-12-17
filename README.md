# Truffle cost

This module allows to log used gas of transactions in your Truffle tests, and optionally price in fiat.

![truffle-cost](https://raw.githubusercontent.com/guix77/truffle-cost/gh-pages/truffle-cost.png)

## Requirements

+ Truffle v5

## Usage

### 1) Install

    yarn add truffle-cost mocha-truffle-reporter

(or *npm* instead of *yarn*)

### 2) Edit truffle-config.js

In the Mocha section use the reporter [mocha-truffle-reporter](https://github.com/guix77/mocha-truffle-reporter):

    mocha: {
      reporter: "mocha-truffle-reporter"
      // timeout: 100000
    },

### 3) Use in your Truffle tests

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
