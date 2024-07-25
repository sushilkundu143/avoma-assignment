module.exports = {
    extends: 'lighthouse:default',
    settings: {
      emulatedFormFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 360,
        height: 640,
        deviceScaleFactor: 3,
        disabled: false,
      },
    },
  };
  