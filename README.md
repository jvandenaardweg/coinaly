# Simpletrade

An easy too use mobile "on the go" trade interface for Bittrex, because Bittrex did a horrible job in providing a mobile friendly website.

<img src="https://www.dropbox.com/s/zim7funbj5kx4m3/IMG_2876.PNG?raw=1" width="210">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/moc84sytyx5uvzj/IMG_2877.PNG?raw=1" width="210">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/33n5wsc27beqkbz/IMG_2878.PNG?raw=1" width="210">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/yyfhcy172cvhuyp/IMG_2879.PNG?raw=1" width="210">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/p6zk2m4t8i7erx1/IMG_2880.PNG?raw=1" width="210">&nbsp;&nbsp;&nbsp;<img src="https://www.dropbox.com/s/egxqxp4clm9p2ok/IMG_2875.PNG?raw=1" width="210">


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

1. Download this Git repo
2. In that repo folder create a `.env` file with the contents:
```
BITTREX_API_KEY=XXX
BITTREX_API_SECRET=XXX
```
Where "XXX" is your Bittrex API key and secret which can be created here: [https://bittrex.com/Manage#sectionApi](https://bittrex.com/Manage#sectionApi). 

*API permissions*
Important: We don't need "withdrawl" permissions, so you can leave that switch off. "Read info" is the minimal permission, so we can read your balances and orders. If you enable "Trade limit" and "Trade market" you can also trade from within the website. But if you don't feel comfortable enabling that, we understand, you can leave it off.
<img src="https://www.dropbox.com/s/3yk5nqh00rijhlu/bittrexapikeypermissions.png?raw=1" />

3. Install all the dependencies: `yarn install`
4. Run in development mode: `npm run dev`

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

For this setup we used the standard VueJS Webpack template. For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
