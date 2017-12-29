# Simpletrade

An easy too use mobile "on the go" trade interface for Bittrex, because Bittrex did a horrible job in providing a mobile friendly website.

<img src="https://www.dropbox.com/s/vfejrm8ofeble0j/IMG_2868.jpg?raw=1" width="256">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/riygwc067ddykqs/IMG_2869.jpg?raw=1" width="256">

## Why?
I find the Bittrex website not easy to use. The mobile version of their website is horrible. It's cluttered with information and does not visualize the things I want to know on a daily/hourly basis. With their API we can do things a little better.

Don't get me wrong, I love the Bittrex exchange with their offer of alt coins. But their website could use a little help.

## Features
- Instantly see the current status of your balances. Am I making a profit? Or am I losing money? (in progress)
- Fast selling and buying. Instantly react on market movements and quickly sell or buy a crypto coin. (in progress)
- Optimized for mobile screens and mobile performance. Always there with you. (in progress)
- Overview open orders. How are my orders performing? Should I cancel or adjust them? (in progress)
- Better live candlestick chart by [TradingView.com](https://www.tradingview.com/) (in progress)

### Future
- Receive a notification when an order closed or cancelled
- Receive a notification when a coin is losing me money
- Track a single trade. You bought a coin and want to know how thát trade is performing.

### Far future
- Other exchanges

## Donations
I'am not affiliated with Bittrex in any way. I'm just a [freelance developer](https://www.linkedin.com/in/jvandenaardweg/) using my spare time to create this. A donation of any size is very welcome!

- BTC: 1P1sUUWxMXVCJX9T9M4SwoQW9Rpg51chfo
- ETH: 0x5442026e8c4CDA6361763D56318FbE94f1b1Cb9b
- BCH: 1P1sUUWxMXVCJX9T9M4SwoQW9Rpg51chfo

## Setup
Currently the setup is a self hosted solution, untill we figured out the most secure way to store your Bittrex API key and secrets.

For this setup we used the standard VueJS Webpack template. For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Dependencies
See `package.json` engines for the required dependency versions.

``` bash
# install dependencies
yarn install
```

### Run development mode
``` bash
# serve with hot reload at localhost:8080
npm run dev
```

### Build for production
``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Run tests
``` bash
# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
