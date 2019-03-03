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
import bannerImage from '../images/apple_items.jpg';
import {white} from 'ansi-colors';
import BuyerListingPage from 'components/BuyerListingPage';
import SellerListingPage from 'components/SellerListingPage';
import firebase from 'firebase';

import {buyFlow} from 'api/buyFlow';

const config = {
  apiKey: 'AIzaSyBg6o5rZBWF0yUkNfxSxoj-pCjP3ATK5A4',
  authDomain: 'hacktech2019-42079.firebaseapp.com',
  databaseURL: 'https://hacktech2019-42079.firebaseio.com',
  projectId: 'hacktech2019-42079',
  storageBucket: 'hacktech2019-42079.appspot.com',
  messagingSenderId: '319199126538',
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

  componentWillMount() {
    firebase.initializeApp(config);
    fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        21092 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#p^1#I^3#f^0#r^0#t^H4sIAAAAAAAAAOVXa4wTVRTebveZpQuJwAIilsE3zvROp9N2BtpNd5dHeewu25XIKm6mM3fo0M5MmXvLbhOjy8ojhhjhh+GfrooIaAyChKgJ+EODIZjgg9UoIaIxkPgHYgImxNU7s2XprgRYKEJi06Sdc8899/u+c869c0FfVe0TmxdvvuRxVZcP9IG+cpeLrQO1VZVz693lMyrLQJGDa6Dvob6Kfve5+UjSM1mxA6KsaSDo7dUzBhIdY4TKWYZoSkhDoiHpEIlYFhOx5ctEPwPErGViUzYzlDfeEqGgGk4G/FIwxLF8CCZZYjWuxOw0I5QkCxwf5mQY8IcDfIgn4wjlYNxAWDJwhPIDVqABR76dLBABKwYAEwoHuijvSmghzTSICwOoqANXdOZaRVivD1VCCFqYBKGi8djCRFss3rKgtXO+ryhWtKBDAks4h0Y/NZsK9K6UMjl4/WWQ4y0mcrIMEaJ80eEVRgcVY1fA3AJ8R2pe9qshNShwQIU8J5REyYWmpUv4+jBsi6bQquMqQgNrOH8jQYkYybVQxoWnVhIi3uK1f1bkpIymatCKUAuaYqti7e1UNCXJaQzlFD3yp72jhVbZoAL5YDJIh3lJ4gRZLSw0HK2g8piVmk1D0WzNkLfVxE2QoIajtAGCyBdpQ5zajDYrpmIbUbGG/isahoQuO6fDSczhlGGnFepECK/zeOMMjMzG2NKSOQxHIowdcCQiXZPNago1dtApxUL19KIIlcI4K/p8PT09TA/HmNYanx8A1vf08mUJOQV1ibJ97V53/LUbT6A1h4oMyUykiTifJVh6SakSAMYaKsqFeVbwF3QfDSs61vovQxFn3+iGKFWDBEJJJQBY0iasBAIQlqJDooUi9dk4YFLK07pkpSHOZiQZ0jKps5wOLU0ROV71c2EV0kpQUOmAoKp0kleCNKtCCCBMJmUh/H9qlJst9YRsZmG7mdHkfGkKvmTFbintkoXzCZjJEMPNVv01SSKb5J2nZ/f6eCjaMRAJImU1xq5tRjZ1nymRTc02dTuob4t3LJuN63oOS8kMjJdoQ7s7m9k16WnktL+nOJH8DSdSU4bPacbJJoPWy4wFkZmzyBsK02YfW51mGhpkE8CWmclAayV724m+x/I7zr3y1niX8KAeJ2/S6+ydrG05o5ES6r5L7O5uVjUJ31usWZ5ngyDEAXBbvJqdnHbm/4uzaDz0FpsIQ+UOvFf6Rl9yo2XOh+13HQT9rg/JPRn4wMPsHDC7yv1UhXvCDKRhyGiSyiBtjUHubhZk0jCflTSrvMr1zMx9e7qLrtUDq8G0kYt1rZutK7plg5lXRyrZiQ0eVgAc4FgiSwB0gTlXRyvYqRWTm97Z2eyZGni55f2vItN3v47uO+d6BXhGnFyuyrKKflfZwWndG1uPzlAHZk65PLW8Y/bWwZRqzlIe+6664dK8RT80Njbu/hMPbVnUINRUf7/svX2PnPR0nJzw1q5DP57bvq1m1eBFefCLNw/of1zemtpf9wC1ZF7T/X/vnbyh61TSXffp2saq419yR5TXVj0/tOFAPZ0+4/llQjK9/kz+1CT11dwH0fShb85HPnpp9Yo39k4Zurzi98/cwYFJvUsDi6a8vU48duhR4eLJd+sbDh/149TZF8JDZ5/ceEzUtz2788TSLcFNO05X76ifN7em4lvg+vn8x5/vUg//NXed2HF8yYPP7fpk94VtJ77e9FPodHvNxIUHPbPmwO1LHp99IXW+dpBbsGf6kRcb9v/m+1UfTt8/+R36I/AQAAA=',
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
        21136 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#p^1#I^3#f^0#r^0#t^H4sIAAAAAAAAAOVXa4wTVRTebveZpQuJwAIilsE3zvROp9N2BtpNd5dHeewu25XIKm6mM3fo0M5MmXvLbhOjy8ojhhjhh+GfrooIaAyChKgJ+EODIZjgg9UoIaIxkPgHYgImxNU7s2XprgRYKEJi06Sdc8899/u+c869c0FfVe0TmxdvvuRxVZcP9IG+cpeLrQO1VZVz693lMyrLQJGDa6Dvob6Kfve5+UjSM1mxA6KsaSDo7dUzBhIdY4TKWYZoSkhDoiHpEIlYFhOx5ctEPwPErGViUzYzlDfeEqGgGk4G/FIwxLF8CCZZYjWuxOw0I5QkCxwf5mQY8IcDfIgn4wjlYNxAWDJwhPIDVqABR76dLBABKwYAEwoHuijvSmghzTSICwOoqANXdOZaRVivD1VCCFqYBKGi8djCRFss3rKgtXO+ryhWtKBDAks4h0Y/NZsK9K6UMjl4/WWQ4y0mcrIMEaJ80eEVRgcVY1fA3AJ8R2pe9qshNShwQIU8J5REyYWmpUv4+jBsi6bQquMqQgNrOH8jQYkYybVQxoWnVhIi3uK1f1bkpIymatCKUAuaYqti7e1UNCXJaQzlFD3yp72jhVbZoAL5YDJIh3lJ4gRZLSw0HK2g8piVmk1D0WzNkLfVxE2QoIajtAGCyBdpQ5zajDYrpmIbUbGG/isahoQuO6fDSczhlGGnFepECK/zeOMMjMzG2NKSOQxHIowdcCQiXZPNago1dtApxUL19KIIlcI4K/p8PT09TA/HmNYanx8A1vf08mUJOQV1ibJ97V53/LUbT6A1h4oMyUykiTifJVh6SakSAMYaKsqFeVbwF3QfDSs61vovQxFn3+iGKFWDBEJJJQBY0iasBAIQlqJDooUi9dk4YFLK07pkpSHOZiQZ0jKps5wOLU0ROV71c2EV0kpQUOmAoKp0kleCNKtCCCBMJmUh/H9qlJst9YRsZmG7mdHkfGkKvmTFbintkoXzCZjJEMPNVv01SSKb5J2nZ/f6eCjaMRAJImU1xq5tRjZ1nymRTc02dTuob4t3LJuN63oOS8kMjJdoQ7s7m9k16WnktL+nOJH8DSdSU4bPacbJJoPWy4wFkZmzyBsK02YfW51mGhpkE8CWmclAayV724m+x/I7zr3y1niX8KAeJ2/S6+ydrG05o5ES6r5L7O5uVjUJ31usWZ5ngyDEAXBbvJqdnHbm/4uzaDz0FpsIQ+UOvFf6Rl9yo2XOh+13HQT9rg/JPRn4wMPsHDC7yv1UhXvCDKRhyGiSyiBtjUHubhZk0jCflTSrvMr1zMx9e7qLrtUDq8G0kYt1rZutK7plg5lXRyrZiQ0eVgAc4FgiSwB0gTlXRyvYqRWTm97Z2eyZGni55f2vItN3v47uO+d6BXhGnFyuyrKKflfZwWndG1uPzlAHZk65PLW8Y/bWwZRqzlIe+6664dK8RT80Njbu/hMPbVnUINRUf7/svX2PnPR0nJzw1q5DP57bvq1m1eBFefCLNw/of1zemtpf9wC1ZF7T/X/vnbyh61TSXffp2saq419yR5TXVj0/tOFAPZ0+4/llQjK9/kz+1CT11dwH0fShb85HPnpp9Yo39k4Zurzi98/cwYFJvUsDi6a8vU48duhR4eLJd+sbDh/149TZF8JDZ5/ceEzUtz2788TSLcFNO05X76ifN7em4lvg+vn8x5/vUg//NXed2HF8yYPP7fpk94VtJ77e9FPodHvNxIUHPbPmwO1LHp99IXW+dpBbsGf6kRcb9v/m+1UfTt8/+R36I/AQAAA=',
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
        13595 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer v^1.1#i^1#p^1#I^3#f^0#r^0#t^H4sIAAAAAAAAAOVXa4wTVRTebveZpQuJwAIilsE3zvROp9N2BtpNd5dHeewu25XIKm6mM3fo0M5MmXvLbhOjy8ojhhjhh+GfrooIaAyChKgJ+EODIZjgg9UoIaIxkPgHYgImxNU7s2XprgRYKEJi06Sdc8899/u+c869c0FfVe0TmxdvvuRxVZcP9IG+cpeLrQO1VZVz693lMyrLQJGDa6Dvob6Kfve5+UjSM1mxA6KsaSDo7dUzBhIdY4TKWYZoSkhDoiHpEIlYFhOx5ctEPwPErGViUzYzlDfeEqGgGk4G/FIwxLF8CCZZYjWuxOw0I5QkCxwf5mQY8IcDfIgn4wjlYNxAWDJwhPIDVqABR76dLBABKwYAEwoHuijvSmghzTSICwOoqANXdOZaRVivD1VCCFqYBKGi8djCRFss3rKgtXO+ryhWtKBDAks4h0Y/NZsK9K6UMjl4/WWQ4y0mcrIMEaJ80eEVRgcVY1fA3AJ8R2pe9qshNShwQIU8J5REyYWmpUv4+jBsi6bQquMqQgNrOH8jQYkYybVQxoWnVhIi3uK1f1bkpIymatCKUAuaYqti7e1UNCXJaQzlFD3yp72jhVbZoAL5YDJIh3lJ4gRZLSw0HK2g8piVmk1D0WzNkLfVxE2QoIajtAGCyBdpQ5zajDYrpmIbUbGG/isahoQuO6fDSczhlGGnFepECK/zeOMMjMzG2NKSOQxHIowdcCQiXZPNago1dtApxUL19KIIlcI4K/p8PT09TA/HmNYanx8A1vf08mUJOQV1ibJ97V53/LUbT6A1h4oMyUykiTifJVh6SakSAMYaKsqFeVbwF3QfDSs61vovQxFn3+iGKFWDBEJJJQBY0iasBAIQlqJDooUi9dk4YFLK07pkpSHOZiQZ0jKps5wOLU0ROV71c2EV0kpQUOmAoKp0kleCNKtCCCBMJmUh/H9qlJst9YRsZmG7mdHkfGkKvmTFbintkoXzCZjJEMPNVv01SSKb5J2nZ/f6eCjaMRAJImU1xq5tRjZ1nymRTc02dTuob4t3LJuN63oOS8kMjJdoQ7s7m9k16WnktL+nOJH8DSdSU4bPacbJJoPWy4wFkZmzyBsK02YfW51mGhpkE8CWmclAayV724m+x/I7zr3y1niX8KAeJ2/S6+ydrG05o5ES6r5L7O5uVjUJ31usWZ5ngyDEAXBbvJqdnHbm/4uzaDz0FpsIQ+UOvFf6Rl9yo2XOh+13HQT9rg/JPRn4wMPsHDC7yv1UhXvCDKRhyGiSyiBtjUHubhZk0jCflTSrvMr1zMx9e7qLrtUDq8G0kYt1rZutK7plg5lXRyrZiQ0eVgAc4FgiSwB0gTlXRyvYqRWTm97Z2eyZGni55f2vItN3v47uO+d6BXhGnFyuyrKKflfZwWndG1uPzlAHZk65PLW8Y/bWwZRqzlIe+6664dK8RT80Njbu/hMPbVnUINRUf7/svX2PnPR0nJzw1q5DP57bvq1m1eBFefCLNw/of1zemtpf9wC1ZF7T/X/vnbyh61TSXffp2saq419yR5TXVj0/tOFAPZ0+4/llQjK9/kz+1CT11dwH0fShb85HPnpp9Yo39k4Zurzi98/cwYFJvUsDi6a8vU48duhR4eLJd+sbDh/149TZF8JDZ5/ceEzUtz2788TSLcFNO05X76ifN7em4lvg+vn8x5/vUg//NXed2HF8yYPP7fpk94VtJ77e9FPodHvNxIUHPbPmwO1LHp99IXW+dpBbsGf6kRcb9v/m+1UfTt8/+R36I/AQAAA=',
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

  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }

  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }

  render() {
    const {babelLoaded, itemsBeauty, itemsHousehold, itemsTech} = this.state;
    const {data, location, items, next} = this.props;
    const {codeExamples, examples, marketing} = data;
    const {isLogin} = this.state;
    const {handleLogin} = this.handleLogin;
    const {handleLogout} = this.handleLogout;

    const code = codeExamples.edges.reduce((lookup, {node}) => {
      lookup[node.mdAbsolutePath] = node;
      return lookup;
    }, {});

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
                  backgroundImage: `url(${bannerImage})`,
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
                      fontSize: 45,
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
                  <p
                    css={{
                      paddingTop: 15,
                      textAlign: 'center',
                      fontSize: 24,
                      letterSpacing: '0.01em',
                      fontWeight: 200,
                      color: colors.white,
                      [media.size('xsmall')]: {
                        fontSize: 16,
                        maxWidth: '12em',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      },

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 20,
                        fontSize: 30,
                      },
                    }}>
                    Tech
                  </p>
                  <Flex
                    valign="center"
                    css={{
                      paddingTop: 40,

                      [media.greaterThan('xlarge')]: {
                        paddingTop: 65,
                      },
                    }}>
                    <CtaItem>
                      <ButtonLink
                        to="/docs/getting-started.html"
                        type="primary">
                        Buy
                      </ButtonLink>
                    </CtaItem>
                  </Flex>
                </Container>
              </div>
            </div>
          </header>
          <BuyerListingPage />

          <SellerListingPage
            itemsBeauty={itemsBeauty}
            itemsHousehold={itemsHousehold}
            itemsTech={itemsTech}
          />

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
      <LoginPage handleLogin={() => this.handleLogin()} />
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
