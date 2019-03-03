import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import firebase from 'firebase';
// import and use material ui elements here

let id = 0;
let InputLabelRef = '';
function createData(
  name,
  description,
  sellerRatings,
  retailPrice,
  currentPrice,
) {
  id += 1;
  return {id, name, description, sellerRatings, retailPrice, currentPrice};
}

const rows = [
  createData('LG TV', 159, 6.0, 24, 4.0),
  createData('Mechanical Keyboard', 237, 9.0, 37, 4.3),
  createData('Bose Headphones', 262, 16.0, 24, 6.0),
];

class SellerListingPage extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      labelWidth: 0,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    firebase
      .database()
      .ref('theme/')
      .push(event.target.value);

    firebase
      .database()
      .ref('items')
      .remove();
  };

  renderDropdownOptions() {
    return (
      <div style={styles.sellerItemStyle}>
        <h2 style={styles.h2Styling}> Select Category Below </h2>
        <FormControl variant="outlined">
          <InputLabel
            ref={ref => {
              InputLabelRef = ref;
            }}
            htmlFor="outlined-category-native-simple">
            Category
          </InputLabel>
          <Select
            native
            value={this.state.category}
            onChange={this.handleChange('category')}
            input={
              <OutlinedInput
                name="category"
                labelWidth={this.state.labelWidth}
                id="outlined-category-native-simple"
              />
            }>
            <option value="" />
            <option value={'Technology'}>Tech</option>
            <option value={'Beauty'}>Beauty</option>
            <option value={'Household Appliances'}>Household</option>
          </Select>
        </FormControl>
      </div>
    );
  }

  renderSelectedTable(category, props) {
    var listToMap;

    if (category === 'beauty') {
      listToMap = props.itemsBeauty;
    } else if (category === 'tech') {
      listToMap = props.itemsTech;
    } else if (category === 'household') {
      listToMap = props.itemsHousehold;
    } else {
      listToMap = '';
    }

    return (
      <div style={styles.selectedTable}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Seller Feedback</TableCell>
                <TableCell align="right">Add to Box</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listToMap.map(item => (
                <TableRow key={item.id}>
                  <TableCell align="left">
                    {' '}
                    <img src={item.image.imageUrl} />
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="right">{item.price.value}</TableCell>
                  <TableCell align="right">
                    {item.seller.feedbackScore}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        console.log('adding now');
                        firebase
                          .database()
                          .ref('items/')
                          .push(item);
                      }}>
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  render() {
    let itemsBeauty,
      itemsHousehold,
      itemsTech = this.props;
    const category = this.state;

    console.log(this.state.category);

    return (
      <div style={styles.sellerItemStyle}>
        <h2 style={styles.h2Styling}> Select Category Below </h2>
        <FormControl variant="outlined">
          <InputLabel
            ref={ref => {
              InputLabelRef = ref;
            }}
            htmlFor="outlined-category-native-simple">
            Category
          </InputLabel>
          <Select
            native
            value={this.state.category}
            onChange={this.handleChange('category')}
            input={
              <OutlinedInput
                name="category"
                labelWidth={this.state.labelWidth}
                id="outlined-category-native-simple"
              />
            }>
            <option value="" />
            <option value={'Technology'}>Tech</option>
            <option value={'Beauty'}>Beauty</option>
            <option value={'Household'}>Household</option>
          </Select>
        </FormControl>

        {this.state.category === ''
          ? ''
          : this.renderSelectedTable(this.state.category, this.props)}
      </div>
    );
  }
}

const styles = {
  sellerItemStyle: {
    textAlign: 'center',
    marginTop: '3%',
    marginBottom: '3%',
  },
  h2Styling: {
    marginTop: '3%',
    marginBottom: '3%',
  },
  middle: {
    textAlign: 'center',
  },
  selectedTable: {
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: '3%',
    marginTop: '3%',
  },
};

export default SellerListingPage;
