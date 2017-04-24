# Budgeting - React + Redux + React Router 4 Sample App

Sample app demonstrating the power and simplicity of React, Redux, React Router, and Webpack 2. Includes tree shaking configuration. 

[See demo online](https://budgeting-a937b.firebaseapp.com/).

![React, Redux, Router, Webpack, Sass](https://cloud.githubusercontent.com/assets/733074/25338311/193a1a40-28ff-11e7-8f22-9a5d9dac7b84.png)

## Budgeting Application
The is a simple budget management application. It tracks inflow and outflow, shows remaining budget, and interesting reports with charts. As such, it offers more features than the usual Todo App. 

The budgeting app is a showcase project that demonstrates important decisions in architecture and development of a modern React application.

Feel free to use it as a reference app or a starter kit.

## Key concepts:

- [x] [Webpack 2 Tree shaking](http://moduscreate.com/webpack-2-tree-shaking-configuration/)
- [x] [PRPL pattern](www.slideshare.net/grgur/prpl-pattern-with-webpack-and-react) with minimal application core
- [x] Automatic code splitting with React Router 4 and `import()` statement
- [x] Automatic common chunk bundling
- [x] CSS modules

## Performance
![Budgeting App Performance](https://cloud.githubusercontent.com/assets/733074/25339194/1af94448-2902-11e7-8982-c1a9b647fac0.png)
_The app loads in 1 second on 3G, cache disabled_

Budgeting app is blazing fast, thanks to the smart architecture and Webpack 2 configuration. It takes about 1000ms (1s) to load it on 3G (see above).

**But how?** 

1. **Minimal application core.** We decided to ditch the usual convention of creating a vendor chunk. Instead, it's bundled in the app core. The app core is actually very small, containing just the code needed to bootstrap the app.
2. **Common code is a chunk.** We let Webpack figure out which bundles we reuse in chunks and create a common chunk that's also asyncronous. 
3. **Redux module injection**. Each chunk contains respective views __and__ redux modules. Yes, that means reducers, action creators, actions - are all dynamically injected as we navigate through routes. That adds to the _minimal application core_ concept and PRPL pattern. 
4. **H2 Push.** The app is hosted on Firebase and we use the magic of HTTP2 Push to push some of the scripts before they are requested.

## Charts
Charts are developed using the awesome D3 library. The idea behind showing charts is not only to show beautiful content, but also to demonstrate how to keep heavy content in a chunk that owns it. 

D3 is used in the `/reports` route only. Given that major routes are separate chunks (code splitting FTW!), the entire D3 library is bundled with the code that needs it. That makes the `/reports` route a bit heavier than the initial `/budget` route, but it also makes routes much faster to load.

## Stack
The app was built using these aweseome technologies

- [x] [Webpack 2.4](https://webpack.github.io)
- [x] [React 15.x](https://facebook.github.io/react/)
- [x] [Redux 3.6](http://redux.js.org/)
- [x] [React Router 4](https://reacttraining.com/react-router/)
- [x] [Reselect](https://github.com/reactjs/reselect/)
- [x] [Babel](https://babeljs.io/)
- [x] [Prettier](https://github.com/prettier/prettier)
- [x] [Yarn](https://yarnpkg.com/en/)
- [x] [Ducks](https://github.com/erikras/ducks-modular-redux/) 🐣
- [x] [Sass](http://sass-lang.com/)
- [x] [D3](https://d3js.org/)

## Yarn Scripts

* `yarn` - install dependencies
* `yarn start` - run development server
* `yarn run prod` - run production server
* `yarn run build` - build app for deployment
* `yarn run lint` - lint check
* `yarn run lint:fix` - lint check + autofixes + prettify code with __prettier__

## NPM Scripts
Similar to Yarn, really...

* `npm install` - install dependencies
* `npm start` - run development server
* `npm run prod` - run production server
* `npm run build` - build app for deployment
* `npm run lint` - lint check
* `npm run lint:fix` - lint check + autofixes + prettify code with __prettier__

## Want more?
This project is maintained by [Modus Create](https://moduscreate.com). Fantastic React apps are in our DNA so give as a buzz if we can help with your awesome project.

## License
[MIT](License.md)
