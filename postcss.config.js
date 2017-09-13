const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 iOS versions',
        'last 2 Safari versions',
        'last 2 Edge versions',
      ],
    }),
  ],
};
