import React from "react";
import quotes from "src/assets/quotes.json";

const breakdownQuote = (abstract) => {
  if (abstract.quotes != undefined) {
    return {
      name: abstract.name,
      quote:
        abstract.quotes[Math.floor(Math.random() * abstract.quotes.length)],
    };
  }

  if (abstract.quote == undefined) {
    return breakdownQuote(
      abstract.list[Math.floor(Math.random() * abstract.list.length)]
    );
  }

  return abstract;
};

const randomQuote = () => {
  return breakdownQuote(quotes[Math.floor(Math.random() * quotes.length)]);
};

const RandomQuote = () => {
  const quote = randomQuote();
  return (
    <center>
      <p>
        &ldquo;{quote.quote}&rdquo; <br /> --{quote.name}
      </p>
    </center>
  );
};

export default RandomQuote;
