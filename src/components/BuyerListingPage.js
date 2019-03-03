import React from 'react';
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
  let totalPrice = getTotalPrice(itemSummaries);
  let averagePrice = (totalPrice / itemSummaries.length + 1).toFixed(2);
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
      <Grid item xs={3}>
        {card}
      </Grid>
    );
  });
  return (
    <div style={styles.cardStyles}>
      <Grid container spacing={24}>
        {itemCards}
      </Grid>
      <div>
        <Button color="primary" variant="contained" size="large">
          {`Buy our mystery pack!\r\n$${averagePrice}`}
        </Button>
      </div>
    </div>
  );
}

const getTotalPrice = itemSummaries => {
  let priceArray = itemSummaries.map(itemSummary => {
    return itemSummary.price.value;
  });
  return priceArray.reduce(
    (left, right) => Number.parseFloat(left) + Number.parseFloat(right),
    0,
  );
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
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

export default withStyles(styles)(BuyerListingPage);
