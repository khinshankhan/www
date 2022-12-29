export const bgStyles = {
  ".shared-nav-bg": {
    // HACK: px just works on breakpoints
    backgroundImage: "linear-gradient($navStartBg, $background 275px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  },
};

export default bgStyles;
