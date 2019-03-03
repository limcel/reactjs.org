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

class Home extends Component {
  state = {
    babelLoaded: false,
    isLogin: false,
    isAdmin: false,
    isUser: false,
  };

  componentDidMount() {
    console.log('componentDidMount load');
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
    console.log('component will mount ran');
    const apiKey =
      'v^1.1#i^1#f^0#I^3#r^0#p^1#t^H4sIAAAAAAAAAOVXfWwURRTv9dpihYJWogiYHgtoBHdv9/b27nbhDq8tDYeFVq6ULwH3Y7Zdure77MzZXiDYVAMxYNQ/0MYAKVGDRUGKaIga/wA0gRAjEsJHlEojxL+IMSQmRMXZ7VGulQClrZB4d8nevHnz5v1+772ZfXRrUfGMjfM2/lHiGZXf0Uq35ns8zGi6uKhw5lhv/sTCPDpHwdPROq21oM3762wopnRLWASgZRoQ+FpSugEFVxgl0rYhmCLUoGCIKQAFJAvJ+IJqIUDRgmWbyJRNnfAlKqNEMAxYhQmHpVCYjTAcj6XGdZt1ZpQAAYVWFSYYjgRDUkDC0xCmQcKASDRQlAjQDE/SLP7V0WGB4wQ2QgW4yHLCVw9sqJkGVqFoIuZ6K7hr7RxXb+2pCCGwETZCxBLxqmRNPFE5d2HdbH+OrViWhiQSURr2H1WYCvDVi3oa3Hob6GoLybQsAwgJf6x3h/5Ghfh1Z+7CfZdpRpHDUpgFTJDlmYjL9NCprDLtlIhu7Ycj0RRSdVUFYCANZW7HKGZDWgNklB0txCYSlT7n8Xxa1DVVA3aUmFseXxavrSVijaLchIDcSPb9qV1USapMSAFcSAqREU4UWV5Wsxv1WsvSPGCnCtNQNIc06FtoonKAvQYDuQnmcIOVaowaO64ix6NcPb6PQ2a5E9TeKKZRo+HEFaQwET53ePsI9K1GyNakNAJ9FgZOuBRFCdGyNIUYOOnmYjZ9WmCUaETIEvz+5uZmqpmlTLvBH6Bpxr90QXVSbgQpkXB0nVp39bXbLyA1F4oM8EqoCShjYV9acK5iB4wGIsZGOIYPZHnv71ZsoPRfghzM/v4VMVwVovI8D/gwD2RZVCUlOBwVEssmqd/xA0hihkyJdhNAli7KgJRxnqVTwNYUgeXUABtRAamEeJUM8qpKSpwSIhkVABoASZL5yP+pUO401ZOyaYFaU9fkzPAk/LAlu63UijbKJIGuY8GdZv1NQUIH5MjDc2p9MBAdGxAbES2NcnKbks2U3xTxoeaIVrteDwl33LISqVQaiZIOEsN0oN2bw+ym8DR83d9XmHD8egOpKb33NOVGk4IvyZQNoJm28SsKVeNcW3VmEzDwIYBsU9eBXc8MOdD3WXwHeVbeHe5hvKgHiRvXOjOSuS3rGk6h1fcI3b2Nqiai+ws1w3G4t+JxizUkXBVuTOsy/8VdNBh480yIgDIC75X+/k1uLM/9MG2ez+g2Txfuk2k/PZ2ZSk8p8i4u8I6ZCDUEKE1UKag1GLh5swHVBDKWqNn5RZ4Vk/d1rs5pqztW0hP6GutiLzM6p8umJ9+YKWTGPVbC8DSLv2GOYyPL6ak3ZguYRwvGJ+bP2nnw6GXr8LKu0b+Hf4gUth9aT5f0KXk8hXkFbZ488NCSJbWJZ19o+ylvw8n9PdKqcx1vXtl9tedA1Vdfww+fuKhoe0zviq075s9q2rI0ubtl8av53Ru+ndx5YuYjXcrij6cXI/5cGfXn9gdJ35GzRdt8ZudTp+r/qjtyuqr9ox3o5JTjj+9aeWzaoaOv8+81PFN6wCz9fE/+zyUf7K8uKZzz9/knl20/9vI6aSd3YfP4N86PrWkJtB8989oDFzp7Gi8fPl42Y03zpB8Pdu/75pOL8hVwprz9atV3b1VfA8yYd5U53awtx56uKIuuL700yjfzlxPvn937cHJ92SsVqz59Z+3+s951pS++/f0u81Ri67Ujm75Yu2DzvC8vnN5SfenwuFETfos/t3dS98FtXb3h+wct8zME8BAAAA==';
    const catId = 20863;
    const xhr = new XMLHttpRequest();
    xhr.open(
      'get',
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        catId +
        '&limit=20',
      true,
    );
    xhr.setRequestHeader('Authorisation', 'Bearer ' + apiKey);

    xhr.onload = function() {
      var userResponse = JSON.parse(xhr.responseText);
      console.log(userResponse);
    };
  }

  handleLogin() {
    console.log('handle login ran');
    this.setState({
      isLogin: true,
    });
  }

  handleLogout() {
    console.log('handle logout ran');
    this.setState({
      isLogin: false,
    });
  }
  async printAllItems() {
    console.log('function call');
    try {
      console.log(await searchForItems('Earphones'));
      console.log('function called');
    } catch (e) {
      console.log(e.response);
    }
  }

  render() {
    const {babelLoaded} = this.state;
    const {data, location} = this.props;
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

          {/* <SellerListingPage /> */}

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
