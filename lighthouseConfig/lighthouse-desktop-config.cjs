module.exports = {
    extends: 'lighthouse:default',
    settings: {
      emulatedFormFactor: 'desktop',
      screenEmulation: {
        mobile: true,
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        disabled: false,
      },
    },
  };
  