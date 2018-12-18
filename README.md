# Truffle cost

This module allows to log used gas of transactions in your Truffle tests, and optionally price in fiat.

![truffle-cost](https://raw.githubusercontent.com/guix77/truffle-cost/gh-pages/truffle-cost.png)

## Usage

Works with Truffle v5 and v4!

### 1) Install

    yarn add truffle-cost

(or *npm* instead of *yarn*)

### 2) Edit truffle-config.js / truffle.js

For Truffle v4, add a *mocha* section to your truffle.js /truffle-config.js. For Truffle v5, it already exists.

In the *mocha* section, use the reporter [mocha-truffle-reporter](https://github.com/guix77/mocha-truffle-reporter):

    mocha: {
      reporter: "mocha-truffle-reporter"
    },

### 3) Use in your Truffle tests

Add it on top of your .js test:

    const truffleCost = require('truffle-cost');

Use it like this:

    result = await truffleCost.log(
      yourContract.yourFunction()
    );

In *result* you will have the same thing as if you just did

    result = await yourContract.yourFunction();

To have the price in fiat, as well, add one of these fiat symbols: 'USD', 'EUR', 'RUR' or 'GBP':

    result = await truffleCost.log(
      yourContract.yourFunction(),
      'USD'
    );

You can also use *from* without any problem and of course just await:

    await truffleCost.log(
      yourContract.yourFunction({from: accounts[1]})
    );

### Colors

The colors are defined in the (Mocha reporter)[https://github.com/guix77/mocha-truffle-reporter/blob/81a482e0f111b3404bd01c294fc40c3f29292407/lib/reporters/truffle-cost.js#L47] and depend on the used gas:

+ below 100000: green
+ above 4700000: red
+ in-between: yellow

### Examples

+ [Truffle 5](https://github.com/guix77/truffle-cost-test/tree/truffle5)
+ [Truffle 4](https://github.com/guix77/truffle-cost-test/tree/truffle4)

## Limitations

+ If you add a fiat symbol, at the beginning of each test truffle-cost will have to make 2 API calls (EthgasStation to get the gas price and Cryptonator to get the Ether price in your fiat. Those prices are then cached, but you need a connection to fetch them once, and it can slow down your tests.

+ Cryptonator's API only has USD, EUR, RUR and GBP. I'd be interested in knowing a public API that has more currencies and ideally, which would allow to get all prices and the Ether gas price in one call.

+ truffleCost does not work for all Truffle test commands, for instance it can not return a Truffle contract. This will fail:

    const myContract = await truffleCost.log(
      MyContract.new()
    );

+ In the same test, if you log more the cost, only the last will be taken into account.

## Donations

Donations in Ethereum and / or tokens are warmly accepted if you use and like this project:

    0x3e486ad2ca1e5b4a9b9088a1126f2961325aeaa7
