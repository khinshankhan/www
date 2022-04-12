const semanticTokens = {
  colors: {
    bg: {
      default: `white`,
      _dark: `blueGray.800`,
    },
    bgContrast: {
      default: `blueGray.800`,
      _dark: `whiteAlpha.900`,
    },
    dividerColor: {
      default: `blueGray.200`,
      _dark: `whiteAlpha.800`,
    },
    // NOTE: it really isn't necessary to build out the entirety of the palette and its accents for the brand since
    // they're mostly specific colors for specific parts of the site. So to save some time, I won't...

    // TODO: look into better contrasting colors to reach AAA accessibility
    internal: {
      // NOTE: slightly unaccessible(near the cusp of AA) for light but according to
      // https://uxmovement.com/buttons/the-myths-of-color-contrast-accessibility/ it should be fine
      default: `#AC9100`,
      _dark: `#FBD000`,
    },
    external: {
      // NOTE: slightly unaccessible (AA) for both
      default: `#037dae`,
      _dark: `#049CD8`,
    },
  },
};

export default semanticTokens;
