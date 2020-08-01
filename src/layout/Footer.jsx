import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { makeStyles } from "@material-ui/styles";
import { Container, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: "none",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  const doNothing = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary">
          <Link
            to="/"
            component={GatsbyLink}
            color="inherit"
            className={classes.link}
            onClick={doNothing}
          >
            &copy;
          </Link>{" "}
          Khinshan Khan 2016 - {currentYear}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
