/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

import ButtonLink from 'components/ButtonLink';
import Button from '@material-ui/core/Button';
import Container from 'components/Container';
import Flex from 'components/Flex';
import CodeExample from 'components/CodeExample';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {graphql} from 'gatsby';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import Layout from 'components/Layout';
import {colors, media, sharedStyles} from 'theme';
import loadScript from 'utils/loadScript';
import createOgUrl from 'utils/createOgUrl';
import {babelURL} from 'site-constants';
import logoWhiteSvg from 'icons/logo-white.svg';
import LoginPage from 'components/LoginPage';
import techImage from '../images/apple_items.jpg';
import householdImage from '../images/household.jpg';
import beautyImage from '../images/beauty.jpg';
import {white} from 'ansi-colors';
import BuyerListingPage from 'components/BuyerListingPage';
import SellerListingPage from 'components/SellerListingPage';
import {itemsRef} from 'api/firebase';
import {themesRef} from '../api/firebase';

const getItems = itemsRef.once('value');

const Banner = {
  technology: techImage,
  household: householdImage,
  beauty: beautyImage,
};

class Home extends Component {
  state = {
    babelLoaded: false,
    isLogin: false,
    isAdmin: false,
    isUser: false,
    categoryId: 20863,
    itemsBeauty: [],
    itemsHousehold: [],
    itemsTech: [],
    items: [],
    currentTheme: '',
    bought: false,
  };

  async componentDidMount() {
    loadScript(babelURL).then(
      () => {
        this.setState({
          babelLoaded: true,
        });
      },
      error => {
        console.error('Babel failed to load.');
      },
    );
  }

  async getItems() {
    const firebaseData = await itemsRef
      .once('value')
      .then(snapshot => snapshot.val());
    this.setState({items: Object.values(firebaseData)});
  }

  async getTheme() {
    const firebaseData = await themesRef
      .once('value')
      .then(snapshot => snapshot.val());
    const themeArray = Object.values(firebaseData);
    const currentTheme = themeArray[themeArray.length - 1];
    this.setState({currentTheme});
  }

  onBuy = () => {
    this.setState({bought: true});
  };

  componentWillMount() {
    this.getItems();
    this.getTheme();
    fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        21136 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAAAOVXfWwTZRhf125zwJwmhK8g6Q6MBnfX++hd24OWdB3LGoGVtVv4CC7Xu/fouevdeffWrRJw2RI0MRE0RIwSQ4KaICEThfhNgIh/qIQ/IJohiGhI+IqCGjBqgu9dy+gmAQZFSGyatPe8z/u8v9/veZ73vZfsq66dvbZ17aU6V03l5j6yr9LlosaTtdVVj93vrpxWVUGWOLg2983q8/S7T821hKxq8O3AMnTNAt7erKpZvGMMYzlT43XBUixeE7LA4qHIJ6MLF/A0QfKGqUNd1FXMG28OYxRNswExyDESy/lJvx9ZtSsxU3oYY2mWIYMsx6QlTqYkgMYtKwfimgUFDYYxmqRCOMmgb4oK8AzN0xzBcfQyzNsJTEvRNeRCkFjEgcs7c80SrNeHKlgWMCEKgkXi0ZZkWzTePH9Raq6vJFakqEMSCjBnjXyK6RLwdgpqDlx/Gcvx5pM5UQSWhfkihRVGBuWjV8DcAnxHalr0C+lAWgwCNhDyy1RZpGzRzawAr4/DtigSLjuuPNCgAvM3UhSpkX4SiLD4tAiFiDd77Z/FOUFVZAWYYWx+U3RpNJHAIhlB7IZAzODDfxLtzbhMcRJguTSHB1lBYEKiXFyoEK0o86iVYromKbZolneRDpsAQg1Ga0OXaIOc2rQ2MypDG1GpX+iKhiy3zE5qIYs5mNHsvIIsEsLrPN44A8OzITSVdA6C4QijBxyJwphgGIqEjR50arFYPr1WGMtAaPA+X09PD9HDELq50keTJOVbsnBBUsyArIAhX7vXC/7KjSfgikNFRG2K/HmYNxCWXlSrCIC2EoswQZYK0UXdR8KKjLb+y1DC2TeyI8rVIRKQg1RABHJIpmRABsvRIZFikfpsHCAt5PGsYHYDaKiCCHAR1VkuC0xF4hlWppmgDHCJC8m4PyTLeJqVOBwhASQA6bQYCv6fGuVmSz0p6gZI6Koi5stS8OUrdlNKCCbMJ4GqIsPNVv01SVo2yTtOz+71MVG0Y1goiGAohF3bhKhnfbqANjXb1OWgvi3eUcOIZ7M5KKRVEC/PhnaXNrNr0lPQcX9PcUL5KyRSkQrnNOFkk7CeFgkTWHrORK8oRJt9bKX0bqChTQCauqoCs5O67UTfY/kd4155a7zLd1CPkTfqdfqO1raoKqiEuu4Ou7ucVUWA9xZrimUpjvEzfu62eMWcnKby/8FZNCZ6rboFgXQH3it9I2+5kQrnQ/W7dpH9rh3ookz6yIepmWRDtbvD454wzVIgIBRBJixlpYYubyYgukHeEBSzstq1fPq7W7tK7tWbV5BThm/WtW5qfMk1m5x+daSKqp9cR4VIhmSoAEPT3DJy5tVRDzXJM/GVXzJH5rzu3v/r1NOLh96cOvlU7/oIWTfs5HJVVXj6XRUbz1/o+uytLbEZv4PHv2CWbgNPHT9xuOWNhvz23HeJiz83DJ19+cjn2w9P6nt0lWfCtkNDfx98D/frr00T1jUt/2rP6ZPjgp3tZOL797dsOMNc+BTuSw4saTyKZX07x20JLHZN3fP1R38dev43+timmk/OVA8e/ZI5SO9undL5wx/fDux/4GJNZn39x5cxscfNnDuEHfiG3Xd+1rHY4IF5e7Cd8Q96Blq6HzIaa1dMvGQaZ9c9W9/QRCcuNq6es2b13lXvXDjZ/cKDl+t2BWKDJwbHv/hSTetPq47fl0htmLljbawj/sy8gaUzPnxu+asbtz5SO7RXn91f+eePnjVYIz/noNJxbujt3U/MnZTaVEjfP4VI2RzxEAAA',
        },
      },
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          itemsBeauty: response.itemSummaries,
        }),
      );

    fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        13595 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAAAOVXfWwTZRhf125zwJwmhK8g6Q6MBnfX++hd24OWdB3LGoGVtVv4CC7Xu/fouevdeffWrRJw2RI0MRE0RIwSQ4KaICEThfhNgIh/qIQ/IJohiGhI+IqCGjBqgu9dy+gmAQZFSGyatPe8z/u8v9/veZ73vZfsq66dvbZ17aU6V03l5j6yr9LlosaTtdVVj93vrpxWVUGWOLg2983q8/S7T821hKxq8O3AMnTNAt7erKpZvGMMYzlT43XBUixeE7LA4qHIJ6MLF/A0QfKGqUNd1FXMG28OYxRNswExyDESy/lJvx9ZtSsxU3oYY2mWIYMsx6QlTqYkgMYtKwfimgUFDYYxmqRCOMmgb4oK8AzN0xzBcfQyzNsJTEvRNeRCkFjEgcs7c80SrNeHKlgWMCEKgkXi0ZZkWzTePH9Raq6vJFakqEMSCjBnjXyK6RLwdgpqDlx/Gcvx5pM5UQSWhfkihRVGBuWjV8DcAnxHalr0C+lAWgwCNhDyy1RZpGzRzawAr4/DtigSLjuuPNCgAvM3UhSpkX4SiLD4tAiFiDd77Z/FOUFVZAWYYWx+U3RpNJHAIhlB7IZAzODDfxLtzbhMcRJguTSHB1lBYEKiXFyoEK0o86iVYromKbZolneRDpsAQg1Ga0OXaIOc2rQ2MypDG1GpX+iKhiy3zE5qIYs5mNHsvIIsEsLrPN44A8OzITSVdA6C4QijBxyJwphgGIqEjR50arFYPr1WGMtAaPA+X09PD9HDELq50keTJOVbsnBBUsyArIAhX7vXC/7KjSfgikNFRG2K/HmYNxCWXlSrCIC2EoswQZYK0UXdR8KKjLb+y1DC2TeyI8rVIRKQg1RABHJIpmRABsvRIZFikfpsHCAt5PGsYHYDaKiCCHAR1VkuC0xF4hlWppmgDHCJC8m4PyTLeJqVOBwhASQA6bQYCv6fGuVmSz0p6gZI6Koi5stS8OUrdlNKCCbMJ4GqIsPNVv01SVo2yTtOz+71MVG0Y1goiGAohF3bhKhnfbqANjXb1OWgvi3eUcOIZ7M5KKRVEC/PhnaXNrNr0lPQcX9PcUL5KyRSkQrnNOFkk7CeFgkTWHrORK8oRJt9bKX0bqChTQCauqoCs5O67UTfY/kd4155a7zLd1CPkTfqdfqO1raoKqiEuu4Ou7ucVUWA9xZrimUpjvEzfu62eMWcnKby/8FZNCZ6rboFgXQH3it9I2+5kQrnQ/W7dpH9rh3ookz6yIepmWRDtbvD454wzVIgIBRBJixlpYYubyYgukHeEBSzstq1fPq7W7tK7tWbV5BThm/WtW5qfMk1m5x+daSKqp9cR4VIhmSoAEPT3DJy5tVRDzXJM/GVXzJH5rzu3v/r1NOLh96cOvlU7/oIWTfs5HJVVXj6XRUbz1/o+uytLbEZv4PHv2CWbgNPHT9xuOWNhvz23HeJiz83DJ19+cjn2w9P6nt0lWfCtkNDfx98D/frr00T1jUt/2rP6ZPjgp3tZOL797dsOMNc+BTuSw4saTyKZX07x20JLHZN3fP1R38dev43+timmk/OVA8e/ZI5SO9undL5wx/fDux/4GJNZn39x5cxscfNnDuEHfiG3Xd+1rHY4IF5e7Cd8Q96Blq6HzIaa1dMvGQaZ9c9W9/QRCcuNq6es2b13lXvXDjZ/cKDl+t2BWKDJwbHv/hSTetPq47fl0htmLljbawj/sy8gaUzPnxu+asbtz5SO7RXn91f+eePnjVYIz/noNJxbujt3U/MnZTaVEjfP4VI2RzxEAAA',
        },
      },
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          itemsHousehold: response.itemSummaries,
        }),
      );

    fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        21092 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#f^0#r^0#I^3#p^1#t^H4sIAAAAAAAAAOVXfWwTZRhf125zwJwmhK8g6Q6MBnfX++hd24OWdB3LGoGVtVv4CC7Xu/fouevdeffWrRJw2RI0MRE0RIwSQ4KaICEThfhNgIh/qIQ/IJohiGhI+IqCGjBqgu9dy+gmAQZFSGyatPe8z/u8v9/veZ73vZfsq66dvbZ17aU6V03l5j6yr9LlosaTtdVVj93vrpxWVUGWOLg2983q8/S7T821hKxq8O3AMnTNAt7erKpZvGMMYzlT43XBUixeE7LA4qHIJ6MLF/A0QfKGqUNd1FXMG28OYxRNswExyDESy/lJvx9ZtSsxU3oYY2mWIYMsx6QlTqYkgMYtKwfimgUFDYYxmqRCOMmgb4oK8AzN0xzBcfQyzNsJTEvRNeRCkFjEgcs7c80SrNeHKlgWMCEKgkXi0ZZkWzTePH9Raq6vJFakqEMSCjBnjXyK6RLwdgpqDlx/Gcvx5pM5UQSWhfkihRVGBuWjV8DcAnxHalr0C+lAWgwCNhDyy1RZpGzRzawAr4/DtigSLjuuPNCgAvM3UhSpkX4SiLD4tAiFiDd77Z/FOUFVZAWYYWx+U3RpNJHAIhlB7IZAzODDfxLtzbhMcRJguTSHB1lBYEKiXFyoEK0o86iVYromKbZolneRDpsAQg1Ga0OXaIOc2rQ2MypDG1GpX+iKhiy3zE5qIYs5mNHsvIIsEsLrPN44A8OzITSVdA6C4QijBxyJwphgGIqEjR50arFYPr1WGMtAaPA+X09PD9HDELq50keTJOVbsnBBUsyArIAhX7vXC/7KjSfgikNFRG2K/HmYNxCWXlSrCIC2EoswQZYK0UXdR8KKjLb+y1DC2TeyI8rVIRKQg1RABHJIpmRABsvRIZFikfpsHCAt5PGsYHYDaKiCCHAR1VkuC0xF4hlWppmgDHCJC8m4PyTLeJqVOBwhASQA6bQYCv6fGuVmSz0p6gZI6Koi5stS8OUrdlNKCCbMJ4GqIsPNVv01SVo2yTtOz+71MVG0Y1goiGAohF3bhKhnfbqANjXb1OWgvi3eUcOIZ7M5KKRVEC/PhnaXNrNr0lPQcX9PcUL5KyRSkQrnNOFkk7CeFgkTWHrORK8oRJt9bKX0bqChTQCauqoCs5O67UTfY/kd4155a7zLd1CPkTfqdfqO1raoKqiEuu4Ou7ucVUWA9xZrimUpjvEzfu62eMWcnKby/8FZNCZ6rboFgXQH3it9I2+5kQrnQ/W7dpH9rh3ookz6yIepmWRDtbvD454wzVIgIBRBJixlpYYubyYgukHeEBSzstq1fPq7W7tK7tWbV5BThm/WtW5qfMk1m5x+daSKqp9cR4VIhmSoAEPT3DJy5tVRDzXJM/GVXzJH5rzu3v/r1NOLh96cOvlU7/oIWTfs5HJVVXj6XRUbz1/o+uytLbEZv4PHv2CWbgNPHT9xuOWNhvz23HeJiz83DJ19+cjn2w9P6nt0lWfCtkNDfx98D/frr00T1jUt/2rP6ZPjgp3tZOL797dsOMNc+BTuSw4saTyKZX07x20JLHZN3fP1R38dev43+timmk/OVA8e/ZI5SO9undL5wx/fDux/4GJNZn39x5cxscfNnDuEHfiG3Xd+1rHY4IF5e7Cd8Q96Blq6HzIaa1dMvGQaZ9c9W9/QRCcuNq6es2b13lXvXDjZ/cKDl+t2BWKDJwbHv/hSTetPq47fl0htmLljbawj/sy8gaUzPnxu+asbtz5SO7RXn91f+eePnjVYIz/noNJxbujt3U/MnZTaVEjfP4VI2RzxEAAA',
        },
      },
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          itemsTech: response.itemSummaries,
        }),
      );
  }

  handleChangeCategoryId(categoryId) {}

  handleLoginAdmin() {
    this.setState({
      isLogin: true,
      isAdmin: true,
    });
  }

  handleLoginUser() {
    this.setState({
      isLogin: true,
      isUser: true,
    });
  }

  handleLogout() {
    this.setState({
      isLogin: false,
      isUser: false,
      isAdmin: false,
    });
  }

  render() {
    const {babelLoaded, itemsBeauty, itemsHousehold, itemsTech} = this.state;
    const {data, location} = this.props;
    const {codeExamples} = data;
    const {isLogin} = this.state;

    const code = codeExamples.edges.reduce((lookup, {node}) => {
      lookup[node.mdAbsolutePath] = node;
      return lookup;
    }, {});
    console.log('in render now');
    console.log(this.props);
    return isLogin ? (
      <Layout location={location}>
        <TitleAndMetaTags
          title="React &ndash; A JavaScript library for building user interfaces"
          ogUrl={createOgUrl('index.html')}
        />

        <div css={{width: '100%'}}>
          <header css={{}}>
            <div
              css={{
                paddingTop: 45,
                paddingBottom: 20,

                [media.greaterThan('small')]: {
                  paddingTop: 60,
                  paddingBottom: 70,
                },

                [media.greaterThan('xlarge')]: {
                  paddingTop: 95,
                  paddingBottom: 85,
                  maxWidth: 1500, // Positioning of background logo
                  height: '700px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  position: 'relative',
                  backgroundImage: `url(${Banner[this.state.currentTheme]})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '100% 100%',
                  backgroundSize: '100% 110%',
                },
              }}>
              <div
                css={{
                  // Content should be above absolutely-positioned hero image
                  position: 'relative',
                }}>
                <Container>
                  <h1
                    css={{
                      color: colors.white,
                      textAlign: 'center',
                      margin: 0,
                      fontSize: 60,
                      fontWeight: 400,
                      fontFamily: 'Helvetica Neue',
                      letterSpacing: '0.01em',
                      [media.size('xsmall')]: {
                        fontSize: 30,
                      },
                      [media.greaterThan('xlarge')]: {
                        fontSize: 60,
                      },
                    }}>
                    This Month's Theme
                  </h1>
                  <h1
                    css={{
                      paddingTop: 15,
                      textAlign: 'center',
                      fontSize: 60,
                      letterSpacing: '0.01em',
                      fontWeight: 400,
                      color: colors.white,
                      marginTop: '3%',
                      [media.size('xsmall')]: {
                        fontSize: 16,
                        maxWidth: '12em',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      },

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 20,
                        fontSize: 40,
                      },
                    }}>
                    {this.state.currentTheme.charAt(0).toUpperCase() +
                      this.state.currentTheme.slice(1)}
                  </h1>
                  <Flex
                    valign="center"
                    css={{
                      paddingTop: 40,

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 65,
                      },
                    }}>
                    {this.state.isAdmin ? (
                      <CtaItem>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large">
                          Purchase stock
                        </Button>
                      </CtaItem>
                    ) : null}
                  </Flex>
                </Container>
              </div>
            </div>
          </header>
          {this.state.isUser && (
            <BuyerListingPage
              itemSummaries={this.state.items}
              onBuy={this.onBuy}
              bought={this.state.bought}
            />
          )}
          {this.state.isAdmin && (
            <SellerListingPage
              itemsBeauty={itemsBeauty}
              itemsHousehold={itemsHousehold}
              itemsTech={itemsTech}
            />
          )}

          <section
            css={{
              background: colors.dark,
              color: colors.white,
              paddingTop: 45,
              paddingBottom: 45,
            }}>
            <Container styles={{alignItems: 'center'}}>
              <Button
                variant="contained"
                onClick={() => {
                  this.handleLogout();
                }}>
                Logout
              </Button>
            </Container>
          </section>
        </div>
      </Layout>
    ) : (
      <LoginPage
        handleLoginAdmin={() => this.handleLoginAdmin()}
        handleLoginUser={() => this.handleLoginUser()}
      />
    );
  }
}

Home.propTypes = {
  data: PropTypes.shape({
    examples: PropTypes.object.isRequired,
    marketing: PropTypes.object.isRequired,
  }).isRequired,
};

const CtaItem = ({children, primary = false}) => (
  <div
    css={{
      width: '50%',
      textAlign: 'center',
      marginLeft: '25%',
    }}>
    {children}
  </div>
);

export const pageQuery = graphql`
  query IndexMarkdown {
    codeExamples: allExampleCode {
      edges {
        node {
          id
          code
          mdAbsolutePath
        }
      }
    }

    examples: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/examples//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            title
            domid
          }
          html
        }
      }
    }
    marketing: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//home/marketing//"}}
      sort: {fields: [frontmatter___order], order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

export default Home;

const sectionStyles = {
  marginTop: 20,
  marginBottom: 15,

  [media.greaterThan('medium')]: {
    marginTop: 60,
    marginBottom: 65,
  },
};

const headingStyles = {
  '&&': {
    marginBottom: 20,
  },
};
