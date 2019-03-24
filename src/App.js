import React, { Component } from 'react';
import './semantic/dist/semantic.css';
import PropTypes from 'prop-types';
import cherry from "./assets/cherry.jpg";
import leafy from "./assets/leafy.png";
import okdrop from "./assets/okdrop.svg";
import cherries from "./assets/cherries.jpeg";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

const purple = "#763760";
const green = "#89BF6B";

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text >

    <Image centered size="large" src={okdrop}></Image>
    <Header
      as='h2'
      content='Seamlessly providing fresh, organic, local Okanagan produce to the Lower Mainland directly from farmers, through partnerships with like-minded small businesses'
      style={{
        fontSize: mobile ? '1em' : '1.5em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>
  </Container >
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign='center'
            style={{
              minHeight: 400, padding: '4em 0em', backgroundColor: "#ffffff",
              backgroundImage: `url(https://ak8.picdn.net/shutterstock/videos/4664138/thumb/1.jpg)`
            }}
            vertical
          >
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item as='a'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>
                    Log in
                  </Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const PurposeSegment = () => (
  <Segment style={{
    paddingBottom: '4em',
    backgroundColor: "rgba(55,33,55, 1)",
    backgroundImage: "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94))"
  }}
    vertical
    inverted
  >
    <Container textAlign="center" text inverted>
      <Header as='h3' style={{ fontSize: '2em', padding: "2em" }} inverted>
        {"Our Farmers"}
      </Header>
    </Container>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={1}>
          <Icon name="right arrow" size="huge" />
        </Grid.Column>
        <Grid.Column width={7} >
          <Header as='h3' style={{ fontSize: '2em' }} inverted>
            {"fresh organic produce"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            {"We selects the best organic farms in the Okanagan to..."}
          </p>
        </Grid.Column>
        <Grid.Column width={1}>
          <Icon name="right arrow" size="huge" />
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h3' style={{ fontSize: '2em' }} inverted>
            {"delivered to your backdoor"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes that's right, you thought it was the stuff of dreams, but even bananas can be
            bioengineered.
            </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={1}>
          <Icon name="right arrow" size="huge" />
        </Grid.Column>
        <Grid.Column width={15}>
          <Header as='h3' style={{ fontSize: '2em' }} inverted>
            {"pick it up from one of our partners"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes that's right, you thought it was the stuff of dreams, but even bananas can be
            bioengineered.
            </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const FarmersSegment = () => (
  <Segment
    style={{
      padding: '0em',
      backgroundImage: "radial-gradient(at 50% 100%, rgba(233, 255, 255, 1), rgb(255, 255, 233, 1))"
    }}
    vertical
  >
    <Container textAlign="center" text >
      <Header as='h3' style={{ fontSize: '2em', padding: "2em" }}>
        {"Our Farmers"}
      </Header>
    </Container>
    <Grid celled='internally' columns='equal' stackable>
      <Grid.Row textAlign='left'>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Image src={leafy} size="large" circular centered />
        </Grid.Column>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            {"Farmer 1"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            {"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign='left'>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            {"Farmer 1"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            {"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."}
          </p>
        </Grid.Column>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Image src={leafy} size="large" circular centered />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const App = () => (
  <ResponsiveContainer>
    <PurposeSegment />
    <FarmersSegment />

    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default App;
