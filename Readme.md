[![Coverage Status](https://coveralls.io/repos/github/ModusCreateOrg/budgeting-sample-app-webpack2/badge.svg)](https://coveralls.io/github/ModusCreateOrg/budgeting-sample-app-webpack2) [![CircleCI](https://circleci.com/gh/ModusCreateOrg/budgeting-sample-app-webpack2.svg?style=svg)](https://circleci.com/gh/ModusCreateOrg/budgeting-sample-app-webpack2)

# Budgeting :: A Modern React, Redux, React Router 4, Webpack Sample App

![React, Redux, Router, Webpack, Sass](https://cloud.githubusercontent.com/assets/733074/25338311/193a1a40-28ff-11e7-8f22-9a5d9dac7b84.png)

Production-ready React + Webpack architecture implemented on consumer web apps of some of the most successful enterprises in the world. Perceived performance and development experience are key factors in this setup. You can use this code base for learning or to scaffold your mission-critical project.

[See live demo](https://budgeting-a937b.firebaseapp.com/).

![React Budgeting App](https://cloud.githubusercontent.com/assets/733074/25340900/6ab1d536-2907-11e7-8083-b78f8ae601b4.png)

## Budgeting Application
The is a simple budget management application. It tracks inflow and outflow, shows remaining budget, and interesting reports with charts. As such, it offers more features than the usual Todo App. 

Budgeting app is a showcase project that demonstrates important decisions in architecture and development of a modern React application.

Feel free to use it as a reference app or a starter kit.

## Key concepts:

- [x] [Webpack 3 Tree shaking](http://moduscreate.com/webpack-2-tree-shaking-configuration/)
- [x] [PRPL pattern](https://www.slideshare.net/grgur/prpl-pattern-with-webpack-and-react) with minimal application core
- [x] Automatic code splitting with React Router 4 and `import()` statement
- [x] Automatic common chunk bundling
- [x] CSS modules
- [x] Snapshot testing with Jest
- [x] Flow static typing. Check out this [guide to using Flow in the project](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2/blob/master/docs/flow.md).
- [x] Performance budgets in Webpack 3
- [x] React 16 Error Boundaries

## Performance
![Budgeting App Performance](https://cloud.githubusercontent.com/assets/733074/25339194/1af94448-2902-11e7-8982-c1a9b647fac0.png)
_The app loads in 1 second on 3G, cache disabled_

Budgeting app is **blazing fast**, thanks to the smart architecture and Webpack 3 configuration. It takes about 1000ms (1s) to load on 3G (see above).

![Alex Russel Test](https://cloud.githubusercontent.com/assets/733074/25586449/acf14628-2e9f-11e7-8839-2f7c20809581.png)
_Emerging Markets 3G Filmstrip_

The [aggressive test](https://www.webpagetest.org/video/compare.php?tests=170501_0S_XQ5-r:2-c:0) above shows the budgeting app loads in under 5 seconds. It's a heavily limited connection that accounts for poor connectivity and limited bandwidth. 

![Waterfall](https://cloud.githubusercontent.com/assets/733074/25586623/676a378a-2ea0-11e7-9342-c040751b6ec6.png)

All important (aka critical path) assets are loaded as early as possible, while the others (e.g. images or GitHub buttons) will load after the first render.

#### How did we get that performance?

1. **Minimal application core.** We decided to ditch the usual convention of creating a vendor chunk. Instead, it's bundled in the app core. The app core is actually very small, containing just the code needed to bootstrap the app.
2. **Common code is a chunk.** We let Webpack figure out which bundles we reuse in chunks and create a common chunk that's also asyncronous. 
3. **Redux module injection**. Each chunk contains respective views _and_ redux modules. Yes, that means reducers, action creators, actions - are all dynamically injected as we navigate through routes. That adds to the _minimal application core_ concept and PRPL pattern. 
4. **H2 Push.** The app is hosted on Firebase and we use the magic of _HTTP2 Push_ to push some of the scripts before they are requested.
5. **Pre-caching**. Service Workers pre-cache resources so the browser can access them as soon as the user needs to.

## Charts
Charts are developed using the awesome D3 library. The idea behind showing charts is not only to show beautiful content, but also to demonstrate keeping heavy content in a chunk that owns it. In other words - we show how applications can run fast even if they use larger libraries.

D3 is used in the `/reports` route only. Given that major routes are separate chunks (code splitting FTW!), the entire D3 library is bundled with the code that needs it. That makes the `/reports` route a bit heavier than the initial `/budget` route, but it also makes routes much faster to load.

## Performance Budgets
We are looking to maintain the lightest possible application core (_aka entry chunk_). Our target is 300kB for the entrypoint and 300kB for all other assets. This is how we set it in [webpack configuration](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2/blob/master/webpack.config.js):

```js
performance: {
  maxAssetSize: 300000,
  maxEntrypointSize: 300000,
  hints: 'warning',
},
```

Adding lots of extra code to the entry chunk might cause the build (`yarn run build`) process to show a warning.

![Performance Budgets](https://cloud.githubusercontent.com/assets/733074/25352700/3ade5cfa-292d-11e7-8d2e-fed88c2c4da0.png)

_Simulated size warning_

Note that running webpack dev server in production mode (`yarn run prod`) will trigger this warning because of the additional dev server code injected in the app. This code will not show in regular production builds.

## Service Workers
Service workers are enabled only when serving static files, not through webpack-dev-server. Here's how you can test service worker functionality:
1. Run `yarn run build` (or `npm run build`) to build the app
2. Run `yarn run serve` (or `npm run serve`) to serve the app on [localhost:3000](http://localhost:3000)
3. Run a new instance of Chrome with disabled security (because localhost is not on https): 

**OS X**

```bash
open -a "Google Chrome" --args --user-data-dir=/tmp/unsafe --unsafely-treat-insecure-origin-as-secure=http://localhost
```

**Linux**

```bash
/path/to/chrome --user-data-dir=/tmp/unsafe --unsafely-treat-insecure-origin-as-secure=http://localhost
```

**Windows**

```bash
chrome.exe --user-data-dir=c:\temp --unsafely-treat-insecure-origin-as-secure=http://localhost
```

4. Now you can observe network traffic in the Network tab or SW activity in Application > Service Workers in Developer Tools

## Stack
The app was built using these aweseome technologies

- [x] [Webpack 3.5](https://webpack.github.io)
- [x] [React 16.x](https://facebook.github.io/react/)
- [x] [Redux 3.7](http://redux.js.org/)
- [x] [React Router 4](https://reacttraining.com/react-router/)
- [x] [Reselect](https://github.com/reactjs/reselect/)
- [x] [Babel](https://babeljs.io/)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [Jest](https://facebook.github.io/jest/)
- [x] [Flow](https://flow.org/en/)
- [x] [Yarn](https://yarnpkg.com/en/)
- [x] [Ducks](https://github.com/erikras/ducks-modular-redux/) 🐣
- [x] [Sass](http://sass-lang.com/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [D3](https://d3js.org/)

## Yarn Scripts

* `yarn` - install dependencies
* `yarn start` - run development server
* `yarn run prod` - run production server
* `yarn run build` - build app for deployment
* `yarn run serve` - serve previously built app using pushstate server
* `yarn run lint` - lint check
* `yarn run lint:fix` - lint check + autofixes + prettify code with __prettier__
* `yarn run test` - run test suite
* `yarn run test:fix` - run test suite watching files for changes
* `yarn run flow` - run flow type checking
* `yarn run update-types` - update flow library definitions

## NPM Scripts
Similar to Yarn, really...

* `npm install` - install dependencies
* `npm start` - run development server
* `npm run prod` - run production server
* `npm run build` - build app for deployment
* `npm run serve` - serve previously built app using pushstate server
* `npm run lint` - lint check
* `npm run lint:fix` - lint check + autofixes + prettify code with __prettier__
* `npm run test` - run test suite
* `npm run test:fix` - run test suite watching files for changes
* `npm run flow` - run flow type checking
* `npm run update-types` - update flow library definitions

## Honorary Mentions

* Thanks to [React experts at Modus Create](https://moduscreate.com), particularly [Tim Eagan](https://twitter.com/TimothyEagan), [Jason Malfatto](https://twitter.com/jmalfatto), [Brice Mason](https://twitter.com/bricemason), and [Esteban Las](https://twitter.com/elas78) for infinite amounts of experience poured into this app
* Kudos to [Andrea Grisogono](https://twitter.com/scrumolina) who Scrumorganized the team
* Thanks to community contributors who helped with code and screamed about issues. Yeah, we really do appreciate all the screaming. 
* [Addy Osmani](https://twitter.com/addyosmani) and [Sam Saccone](https://twitter.com/samccone) who helped with the PRPL pattern
* [Sean T Larkin](https://twitter.com/thelarkinn) who helped with Webpack wizardry

## Want more?
This project is maintained by [Modus Create](https://moduscreate.com). Fantastic React apps are in our DNA so give us a buzz if we can help with your awesome project.

## License
[MIT](License.md)
