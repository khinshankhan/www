import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
  link: {
    textDecoration: "none",
  },
});

const Index = ({ description, title, preview, writeup }) => {
  const classes = useStyles();

  return (
    <Card>
      <Link
        to={writeup}
        component={GatsbyLink}
        color="inherit"
        className={classes.link}
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={preview} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          component={GatsbyLink}
          to={writeup}
        >
          Read More
        </Button>
        <Button size="small" color="secondary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Index;
