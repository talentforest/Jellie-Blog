const withPWA = require('next-pwa')({
  dest: 'public',
});

const settings = {
  env: {},
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: 'public',
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? settings : withPWA(settings);
