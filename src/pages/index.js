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
import {buyFlow} from 'api/buyFlow';
import {itemsRef} from 'api/firebase';

const getItems = itemsRef.once('value');

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
    await buyFlow();
    // console.log('initiate');
    // console.log(await initiateCheckoutSession());
    // console.log('initiate');
  }

  async getItems() {
    const firebaseData = await itemsRef
      .once('value')
      .then(snapshot => snapshot.val());
    this.setState({items: firebaseData});
  }

  componentWillMount() {
    this.getItems();
    fetch(
      'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=' +
        21136 +
        '&limit=20',
      {
        method: 'GET',
        headers: {
          Authorization:
            'v^1.1#i^1#p^1#I^3#r^0#f^0#t^H4sIAAAAAAAAAOVXa2wUVRTu9oWARRS1SDGsA6JA5r0z3R3YTZYuyCZAC1uqlmidnblDx86LuXdpF0NSqzb4QIMkJvKQYuKDkAYIwUcCGiUm9EeNEZX4QI2gPIzPiPxQEu/MLmVbCVBYhMTNJLtz7rnnft93zrl3L9NZOXJ697zuU1WBEaU9nUxnaSDAjmZGVlbMGFNWOqGihClwCPR0Tuks7yo7NgvKpuFIiwF0bAuCYIdpWFDyjVEi41qSLUMdSpZsAighRUrFF8yXOIqRHNdGtmIbRDCZiBIKr0RCqqjyERWkQ7yIrdaZmI12lKgVOVlluJCqqGGtNizjcQgzIGlBJFsoSnAMGyEZHj+NLCfhR+CpMBNuJoJNwIW6bWEXiiFiPlzJn+sWYD0/VBlC4CIchIgl43NT9fFkYs7Cxll0QaxYXocUklEGDn6rs1UQbJKNDDj/MtD3llIZRQEQEnQst8LgoFL8DJhLgO9LLdeqgBHVUG0tG2Y5USiKlHNt15TR+XF4Fl0lNd9VAhbSUfZCimI10g8DBeXfFuIQyUTQ+1qUkQ1d04EbJebMjt8fb2ggYq2y0oaA0koO/GhYnCA1VlSBIKZFMizIMh9RtPxCuWh5mYesVGdbqu6JBoMLbTQbYNRgqDZMgTbYqd6qd+Ma8hAV+oUGNOSbvaTmsphBrZaXV2BiIYL+64UzMDAbIVdPZxAYiDB0wJcI59pxdJUYOujXYr58OmCUaEXIkWi6vb2daucp211GcwzD0vctmJ9SWoGJm63D9Ho9569feAKp+1QUgGdCXUJZB2PpwLWKAVjLiBgfFtgIl9d9MKzYUOu/DAWc6cEdUawOETiRE/FOlNZkEWghvhgdEssXKe3hAGk5S5qy2waQY8gKIBVcZxkTuLoq8YLG8WENkKoY0chQRNPItKCKJKsBwACQTiuR8P+pUS621FOK7YAG29CVbFEKvnjF7qoNsouyKWAY2HCxVX9OktAjecXpeb0+LIpeDIiDyI5OebVNKbZJ2zLe1DxTi4/6snjHHSdpmhkkpw2QLM6GdpU2s3PS0/Fxf01xwvnLJVJXc+c05WeTgisUygXQzrj4LwpV7x1bjXYbsPAmgFzbMIDbxF52oq+x/A5zr7w03sU7qIfJG/c6d0VrWzF0XEItV4fdVc6qLqNrizUrCKzICmwtf1m86vycNmb/g7NoWPTm2RAB9Qr8r6QH33JjJf6H7QrsZroCO/FFmaGZO9nJzB2VZUvKy66fAHUEKF3WKKgvs/DlzQVUG8g6su6WVgaWTtyxtaXgXt3zADN+4GY9sowdXXDNZiaeHalgb6iuYiMMz/Asx3IC38xMPjtazt5afvM39l01p/uP9Lf09y56NvFjaPVXuz5kqgacAoGKkvKuQMlDxKP7jlLx3fCdxC+hr6dXrfztuxPPNxF97mnikd74ge5P1p6MHg69u/mn8eRtax58XV+C7m3/6/hkbvqorZurm/fdtGXCpNvbji0fP+vX955+K/HE96889fPKj08er1l1su/U9pf73pyx5WD8sV2t6rSXln8x5oUT9ePGvHZg3Kr1Gtg4tm7St9O298zdULN21My0u/PzeZPGHqwW3l6x/oMV++++sar60Npt2eT7gfK+0o+W9PZu3PvcLWv6Z+z6c/e+NxbsTbya/fQIHXe790w9uO7x5FFVmLljSts6riqqvrh/w57OVYc3rYtuO7J6efoeUzz0ZQn6LPJk3x8Tl/7t0j8seqb9uk1T5sdG1BBTf8+l7x+JnM3p8RAAAA==',
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
            'Bearer v^1.1#i^1#p^1#I^3#r^0#f^0#t^H4sIAAAAAAAAAOVXa2wUVRTu9oWARRS1SDGsA6JA5r0z3R3YTZYuyCZAC1uqlmidnblDx86LuXdpF0NSqzb4QIMkJvKQYuKDkAYIwUcCGiUm9EeNEZX4QI2gPIzPiPxQEu/MLmVbCVBYhMTNJLtz7rnnft93zrl3L9NZOXJ697zuU1WBEaU9nUxnaSDAjmZGVlbMGFNWOqGihClwCPR0Tuks7yo7NgvKpuFIiwF0bAuCYIdpWFDyjVEi41qSLUMdSpZsAighRUrFF8yXOIqRHNdGtmIbRDCZiBIKr0RCqqjyERWkQ7yIrdaZmI12lKgVOVlluJCqqGGtNizjcQgzIGlBJFsoSnAMGyEZHj+NLCfhR+CpMBNuJoJNwIW6bWEXiiFiPlzJn+sWYD0/VBlC4CIchIgl43NT9fFkYs7Cxll0QaxYXocUklEGDn6rs1UQbJKNDDj/MtD3llIZRQEQEnQst8LgoFL8DJhLgO9LLdeqgBHVUG0tG2Y5USiKlHNt15TR+XF4Fl0lNd9VAhbSUfZCimI10g8DBeXfFuIQyUTQ+1qUkQ1d04EbJebMjt8fb2ggYq2y0oaA0koO/GhYnCA1VlSBIKZFMizIMh9RtPxCuWh5mYesVGdbqu6JBoMLbTQbYNRgqDZMgTbYqd6qd+Ma8hAV+oUGNOSbvaTmsphBrZaXV2BiIYL+64UzMDAbIVdPZxAYiDB0wJcI59pxdJUYOujXYr58OmCUaEXIkWi6vb2daucp211GcwzD0vctmJ9SWoGJm63D9Ho9569feAKp+1QUgGdCXUJZB2PpwLWKAVjLiBgfFtgIl9d9MKzYUOu/DAWc6cEdUawOETiRE/FOlNZkEWghvhgdEssXKe3hAGk5S5qy2waQY8gKIBVcZxkTuLoq8YLG8WENkKoY0chQRNPItKCKJKsBwACQTiuR8P+pUS621FOK7YAG29CVbFEKvnjF7qoNsouyKWAY2HCxVX9OktAjecXpeb0+LIpeDIiDyI5OebVNKbZJ2zLe1DxTi4/6snjHHSdpmhkkpw2QLM6GdpU2s3PS0/Fxf01xwvnLJVJXc+c05WeTgisUygXQzrj4LwpV7x1bjXYbsPAmgFzbMIDbxF52oq+x/A5zr7w03sU7qIfJG/c6d0VrWzF0XEItV4fdVc6qLqNrizUrCKzICmwtf1m86vycNmb/g7NoWPTm2RAB9Qr8r6QH33JjJf6H7QrsZroCO/FFmaGZO9nJzB2VZUvKy66fAHUEKF3WKKgvs/DlzQVUG8g6su6WVgaWTtyxtaXgXt3zADN+4GY9sowdXXDNZiaeHalgb6iuYiMMz/Asx3IC38xMPjtazt5afvM39l01p/uP9Lf09y56NvFjaPVXuz5kqgacAoGKkvKuQMlDxKP7jlLx3fCdxC+hr6dXrfztuxPPNxF97mnikd74ge5P1p6MHg69u/mn8eRtax58XV+C7m3/6/hkbvqorZurm/fdtGXCpNvbji0fP+vX955+K/HE96889fPKj08er1l1su/U9pf73pyx5WD8sV2t6rSXln8x5oUT9ePGvHZg3Kr1Gtg4tm7St9O298zdULN21My0u/PzeZPGHqwW3l6x/oMV++++sar60Npt2eT7gfK+0o+W9PZu3PvcLWv6Z+z6c/e+NxbsTbya/fQIHXe790w9uO7x5FFVmLljSts6riqqvrh/w57OVYc3rYtuO7J6efoeUzz0ZQn6LPJk3x8Tl/7t0j8seqb9uk1T5sdG1BBTf8+l7x+JnM3p8RAAAA==',
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
            'Bearer v^1.1#i^1#p^1#I^3#r^0#f^0#t^H4sIAAAAAAAAAOVXa2wUVRTu9oWARRS1SDGsA6JA5r0z3R3YTZYuyCZAC1uqlmidnblDx86LuXdpF0NSqzb4QIMkJvKQYuKDkAYIwUcCGiUm9EeNEZX4QI2gPIzPiPxQEu/MLmVbCVBYhMTNJLtz7rnnft93zrl3L9NZOXJ697zuU1WBEaU9nUxnaSDAjmZGVlbMGFNWOqGihClwCPR0Tuks7yo7NgvKpuFIiwF0bAuCYIdpWFDyjVEi41qSLUMdSpZsAighRUrFF8yXOIqRHNdGtmIbRDCZiBIKr0RCqqjyERWkQ7yIrdaZmI12lKgVOVlluJCqqGGtNizjcQgzIGlBJFsoSnAMGyEZHj+NLCfhR+CpMBNuJoJNwIW6bWEXiiFiPlzJn+sWYD0/VBlC4CIchIgl43NT9fFkYs7Cxll0QaxYXocUklEGDn6rs1UQbJKNDDj/MtD3llIZRQEQEnQst8LgoFL8DJhLgO9LLdeqgBHVUG0tG2Y5USiKlHNt15TR+XF4Fl0lNd9VAhbSUfZCimI10g8DBeXfFuIQyUTQ+1qUkQ1d04EbJebMjt8fb2ggYq2y0oaA0koO/GhYnCA1VlSBIKZFMizIMh9RtPxCuWh5mYesVGdbqu6JBoMLbTQbYNRgqDZMgTbYqd6qd+Ma8hAV+oUGNOSbvaTmsphBrZaXV2BiIYL+64UzMDAbIVdPZxAYiDB0wJcI59pxdJUYOujXYr58OmCUaEXIkWi6vb2daucp211GcwzD0vctmJ9SWoGJm63D9Ho9569feAKp+1QUgGdCXUJZB2PpwLWKAVjLiBgfFtgIl9d9MKzYUOu/DAWc6cEdUawOETiRE/FOlNZkEWghvhgdEssXKe3hAGk5S5qy2waQY8gKIBVcZxkTuLoq8YLG8WENkKoY0chQRNPItKCKJKsBwACQTiuR8P+pUS621FOK7YAG29CVbFEKvnjF7qoNsouyKWAY2HCxVX9OktAjecXpeb0+LIpeDIiDyI5OebVNKbZJ2zLe1DxTi4/6snjHHSdpmhkkpw2QLM6GdpU2s3PS0/Fxf01xwvnLJVJXc+c05WeTgisUygXQzrj4LwpV7x1bjXYbsPAmgFzbMIDbxF52oq+x/A5zr7w03sU7qIfJG/c6d0VrWzF0XEItV4fdVc6qLqNrizUrCKzICmwtf1m86vycNmb/g7NoWPTm2RAB9Qr8r6QH33JjJf6H7QrsZroCO/FFmaGZO9nJzB2VZUvKy66fAHUEKF3WKKgvs/DlzQVUG8g6su6WVgaWTtyxtaXgXt3zADN+4GY9sowdXXDNZiaeHalgb6iuYiMMz/Asx3IC38xMPjtazt5afvM39l01p/uP9Lf09y56NvFjaPVXuz5kqgacAoGKkvKuQMlDxKP7jlLx3fCdxC+hr6dXrfztuxPPNxF97mnikd74ge5P1p6MHg69u/mn8eRtax58XV+C7m3/6/hkbvqorZurm/fdtGXCpNvbji0fP+vX955+K/HE96889fPKj08er1l1su/U9pf73pyx5WD8sV2t6rSXln8x5oUT9ePGvHZg3Kr1Gtg4tm7St9O298zdULN21My0u/PzeZPGHqwW3l6x/oMV++++sar60Npt2eT7gfK+0o+W9PZu3PvcLWv6Z+z6c/e+NxbsTbya/fQIHXe790w9uO7x5FFVmLljSts6riqqvrh/w57OVYc3rYtuO7J6efoeUzz0ZQn6LPJk3x8Tl/7t0j8seqb9uk1T5sdG1BBTf8+l7x+JnM3p8RAAAA==',
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
    console.log('in render');

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
          {/* <header css={{}}>
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
          </header> */}
          <BuyerListingPage itemSummaries={this.state.items} />

          {/* <SellerListingPage
            itemsBeauty={itemsBeauty}
            itemsHousehold={itemsHousehold}
            itemsTech={itemsTech}
          /> */}

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
