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
  const {classes, itemSummaries, onBuy, bought} = props;
  let totalPrice = getTotalPrice(itemSummaries);
  let averagePrice = (totalPrice / itemSummaries.length + 1).toFixed(2);
  const buttonMessage = bought
    ? 'Look forward to getting your mystery item!'
    : `Buy our mystery pack!\r\n$${averagePrice}`;
  console.log(bought);
  const itemCards = itemSummaries.map(itemSummary => {
    const {title, image, price, itemHref} = itemSummary;
    const imageUrl = image.imageUrl;
    const card = (
      <Card className={classes.card}>
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
          {/* <Button size="small" color="primary" href={itemHref} target="_blank">
            Visit seller's website
          </Button> */}
          <Typography>${price.value}</Typography>
        </CardActions>
      </Card>
    );
    return (
      <Grid item xs={3} key={title}>
        {card}
      </Grid>
    );
  });
  return (
    <div style={styles.cardStyles}>
      <Grid
        container
        spacing={24}
        style={{paddingLeft: '5%', paddingBottom: '3%', paddingTop: '5%'}}>
        {itemCards}
      </Grid>
      <div>
        <Button
          onClick={() => onBuy()}
          color="primary"
          variant="contained"
          size="large">
          {buttonMessage}
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
