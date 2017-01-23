# Budgeting - React + Redux Sample App + Performance Stats

Sample app demonstrating the power and simplicity of React, Redux, and Webpack 2. Includes tree shaking configuration. 

This is a Webpack 2 version of a previous [Budgeting App](https://github.com/ModusCreateOrg/budgeting-sample-app).

![Budgeting Webpack, React, Redux Sample App](https://raw.githubusercontent.com/ModusCreateOrg/budgeting-sample-app-webpack2/performance-stats/screenshot.png)

## POC config showing Performance budgets
This config includes POC for [Webpack Performance Budgets](https://github.com/webpack/webpack/issues/3216). Just install and build/run as usual. 

![Webpack Performance Budgets](https://cloud.githubusercontent.com/assets/110953/19857345/90d6681e-9f3a-11e6-8e0a-be9f2742483a.png)

Try `npm i && npm run build` to see the stats quickly.  

## Contains

- [x] [Webpack 2.2](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](http://redux.js.org/)
- [x] [Babel](https://babeljs.io/)

Make sure you have the latest node before using Webpack 2. Some depenencies my fail in older versions. 

**Update 01/23/2017:** Bumped to Webpack 2.2 and React 15.4.2 with updates to webpack and babel config. Webpack's performance hints are on for production (`npm run prod`)

## Setup

```
$ npm install
```

## Running in dev mode

```
$ npm start
```

## Running in production mode

```
$ npm run prod
```

## Build (production)

```
$ npm run build
```

# License

[MIT](License.md)
