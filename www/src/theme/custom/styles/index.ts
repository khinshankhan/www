export type CardType = "writing";

export interface ICardStyleProps {
  cardType: CardType;
  internal: string;
}

export const cardStyles = ({ cardType, internal }: ICardStyleProps) => {
  const animationTransition = `background 0.15s, border 0.15s, transform 0.3s linear`;

  return {
    _hover: {
      bgColor: `activeCardBg`,
      outline: `none`,
      borderColor: `internalActiveDecoration`,
      boxShadow: `0 0 10px ${internal}`,
      transform: { writing: `translateX(15px)` }[cardType],
    },
    _focusWithin: {
      bgColor: `activeCardBg`,
      outline: `none`,
      borderColor: `internalActiveDecoration`,
      boxShadow: `none`,
    },
    sx: {
      "-webkit-transition": animationTransition,
      transition: animationTransition,
    },
  };
};
