export const createDivBg = (url: string) => ({
  sx: {
    "::before": {
      content: `""`,
      background: `transparent url(${url}) no-repeat center center fixed`,
      position: `absolute`,
      opacity: 0.5,
      top: 0,
      left: 0,
      width: `100%`,
      height: `100%`,
      zIndex: -1,
    },
    "&:focus-within::before, &:hover::before": {
      opacity: 0.15,
    },
  },
});
