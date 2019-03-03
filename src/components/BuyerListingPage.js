import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function BuyerListingPage(props) {
  const {classes, itemSummaries} = props;
  console.log(itemSummaries);
  const itemCards = itemSummaries.map(itemSummary => {
    const {title, image, price, itemHref} = itemSummary;
    const imageUrl = image.imageUrl;
    const card = (
      <Card className={classes.card} key={title}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image={imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" href={itemHref} target="_blank">
            Visit seller's website
          </Button>
          <Typography>${price.value}</Typography>
        </CardActions>
      </Card>
    );
    return (
      <Grid item xs>
        {card}
      </Grid>
    );
  });
  return (
    <div style={styles.cardStyles}>
      <Grid container spacing={24}>
        {itemCards}
      </Grid>
      {/* <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image={Puppy}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card> */}
    </div>
  );
}

BuyerListingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  cardStyles: {
    marginTop: '3%',
    marginBottom: '3%',
    marginLeft: '2%',
  },
};

export default withStyles(styles)(BuyerListingPage);
