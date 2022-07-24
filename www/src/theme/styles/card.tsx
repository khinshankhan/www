export interface ICardStyleProps {
  internal: string;
}

export const cardStyles = ({ internal }: ICardStyleProps) => {
  const animationTransition = `background 0.15s, border 0.15s, transform 0.3s linear`;

  return {
    _hover: {
      bgColor: `activeCardBg`,
      outline: `none`,
      borderColor: `internalActiveDecoration`,
      boxShadow: `0 0 10px ${internal}`,
      transform: `translateY(-10px)`,
    },
    _focusWithin: {
      bgColor: `activeCardBg`,
      outline: `none`,
      borderColor: `internalActiveDecoration`,
      boxShadow: `none`,
    },
    sx: {
      WebkitTransition: animationTransition,
      transition: animationTransition,
    },
  };
};
