# Coinaly

Fast and easy to use mobile trade interface for cryptocurrencies. Track your trades to the moon and beyond. Are my coins taking off or crashing down? Better insights in your cryptocurrency endeavours.

Alpha site: https://coinaly.herokuapp.com/ (synced with the `master` branche)

**Important:** 
This project is in the very early development stage, some features might not work yet. Progress for the first beta release can be tracked here: [github.com/jvandenaardweg/simpletrade/projects/1](https://github.com/jvandenaardweg/simpletrade/projects/1)

We currently only support Bittrex. We plan on adding more exchanges in the future.

![Screenshots](https://www.dropbox.com/s/i9wrtxoqb6hxj45/github-banner.png?raw=1)

## 📱 Our mission 
We are here to create a fast and easy to use mobile (website) trade and portfolio interface for your favorite exchange. No more missed opportunities or trades because the website of your favorite exchange is too slow or too complicated to use. We optimize our website for easy mobile usage and give you the tools and insights you need on a daily basis. It’s more about you and your trades, and less about the exchange pushing you to buy coins.

## 🚀 Features
- Instantly see the current status of your balances and orders. Am I making a profit? Or am I losing money?
- Fast selling and buying. Instantly react on market movements and quickly sell or buy a crypto coin (in progress)
- Optimized for mobile screens and mobile performance. Always there with you
- Overview open orders. How are my orders performing? Should I cancel or adjust them?
- Easily see how far an open order is from the current market price
- Better live candlestick chart by [TradingView.com](https://www.tradingview.com/)
- Live updates all market data. No need to refresh yourself
- Easily browse and filter all available markets

## 👷‍♂️ Javascript devs wanted 
We are currently looking for Javascript developers to speed up the development process, so we can add more exchanges in the near future. Preferably we are looking for skilled developers with professional VueJS en NodeJS experience. If you don’t fit that description, but you still want to help us out? That’s awesome! Please contact [Jordy](https://github.com/jvandenaardweg) directly.

## 🔓 Bittrex API permissions
In order to use this you need to have a Bittrex API key so we can read your orders and balances. An Bittrex API key can be created here: [https://bittrex.com/Manage#sectionApi](https://bittrex.com/Manage#sectionApi). After creating, please remember the `key` and `secret`. We need that later in the setup.

* **Read info** (required: ON) is the minimum required permission that needs to be enabled. Se we can read and display your balances and order history.
* **Trade limit** (optional: ON) is only required if you want to trade from within the website.
* **Trade market** (optional: ON) is only required if you want to trade from within the website.
* **Withdrawal** (required: OFF) we don't need this, so you can leave that one off.

[View example](https://www.dropbox.com/s/h6d7r3qdox0fvt7/bittrexapikeypermissions.png?raw=1)

## 💰 Fuel our efforts 
We are a hard working bunch of people and are not affiliated with Bittrex in any way. We are just using our spare time to create a better mobile experience for what we love to do: trading cryptocurrencies. 

Do you like what we create? A donation of any size is very welcome! 

* BTC: 1P1sUUWxMXVCJX9T9M4SwoQW9Rpg51chfo 
* ETH: 0x5442026e8c4CDA6361763D56318FbE94f1b1Cb9b

We use these donations to pay the bills, like web hosting and services to keep this project running. Ultimately we hope that with enough donations some of us can work on this project fulltime so we can push updates faster.

## 🚧 Developing for this project
Setup is only needed when you want to develop yourself. If you just want to try it out you can at our Alpha website: https://coinaly.herokuapp.com/ 

This project is in early development, some features might not work yet.

### Installation
1. Download this Git repo
2. Install all the dependencies: `yarn install`. See `package.json` engines for the required Node, NPM and Yarn versions.
3. Run: `npm run dev`
4. Fill in your API key and secret on the homepage

After started successfully, the website is in development mode and available at http://localhost:8080.

The API is available at http://localhost:5000.

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

# run in production
npm start
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

For this setup we used the standard VueJS Webpack template. For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
