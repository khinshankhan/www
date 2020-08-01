import React from "react";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: { textColor: "white", backgroundColor: theme.palette.primary.main },
  main: {
    marginTop: theme.spacing(8),
  },
}));

const Content = ({ theme, content }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.main}>{content}</Container>
    </div>
  );
};

export default Content;
