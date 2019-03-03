import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
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
// import and use material ui elements here

let id = 0;
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
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  renderDropdownOptions() {
    return (
      <div style={styles.sellerItemStyle}>
        <h2 style={styles.h2Styling}> Select Category Below </h2>
        <FormControl variant="outlined">
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
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
            <option value={'Tech'}>Tech</option>
            <option value={'Beauty'}>Beauty</option>
            <option value={'Clothing'}>Clothing</option>
            <option value={'Homeware'}>Homeware</option>
          </Select>
        </FormControl>
      </div>
    );
  }

  renderSelectedTable() {
    return (
      <div style={styles.selectedTable}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Seller Stars</TableCell>
                <TableCell align="right">Retail Price</TableCell>
                <TableCell align="right">Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.sellerRatings}</TableCell>
                  <TableCell align="right">{row.retailPrice}</TableCell>
                  <TableCell align="right">{row.currentPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  render() {
    const {classes} = this.props;

    //console.log(this.state.category);
    return (
      <div>
        {' '}
        Hello world (this.state.category === undefined)? (
        <div>{this.renderDropdown()}</div>) : (this.state.category === 'Tech')?
        (
        <div>
          {this.renderDropdown()}
          <div style={styles.middle}>{this.renderSelectedTable()}</div>
        </div>
        ) : null )
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
