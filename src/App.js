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
  Input,
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
  <Container
    text
    style={{
      maxHeight: "900px",
      height: "900px",
    }}
  >
    <div class="ui top fixed white icon menu main" >
      <a class="active item right" > Get Started</a >
      <a class="item " > What's inside the box</a>
      <a class="item">Sign up</a>
    </div >
    <Image centered size="massive" src={okdrop} />
    <Header
      textAlign="center"
      as='h2'
      style={{
        fontSize: mobile ? '1em' : '1.5em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    >
    <Icon name="heart" color="red" size="large" />
    {"An Okanagan orchard in your backyard"}
    </Header>
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
              minHeight: 400, padding: '4em 0em',
              backgroundColor: "#ffffff",
              // backgroundImage: `url(https://i.imgur.com/MVZRqqn.jpg)`,
              background: "linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0)), url(https://i.imgur.com/MVZRqqn.jpg)",
              backgroundSize: "cover",
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
    // backgroundImage: "radial-gradient(at 50% 100%, rgba(85, 21, 30, 1), rgba(85, 21, 30, 1), rgb(80, 20, 55, 1))",
    backgroundImage: "radial-gradient(at 50% 100%, rgba(40, 30, 40, 1), rgba(40, 30, 40, 1))",
    // backgroundImage: "radial-gradient(at 50% 0%, rgba(40, 30, 40, 1), rgba(40, 30, 40, 1))",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  }}
    vertical
    inverted
  >
    <Container textAlign="center" text inverted style={{ padding: "1em" }}>
      <Header as='h3' style={{
        fontSize: '3em', padding: "1em",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "-90px",
        // backgroundImage: "radial-gradient(at 50% 100%, rgba(85, 21, 30, 1), rgba(85, 21, 30, 1))",
        backgroundImage: "radial-gradient(at 50% 0%, rgba(40, 30, 40, 1), rgba(40, 30, 40, 1))",
        borderRadius: "25px",
      }}
        inverted
      >
        {"Grow Together"}
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
          <p style={{ fontSize: '1.25em' }}>
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
      // backgroundImage: "radial-gradient(at 50% 100%, rgba(233, 255, 255, 1), rgb(255, 255, 233, 1))"
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
          <Image src={cherries} size="large" circular centered />
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
          {"Want to stay updated?"}
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          {"Subscribe to get stuff stuff stuff"}
        </p>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Input fluid label="email" placeholder="cherry@lover.ca"/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button primary as='a' size='large'>
                {"Subscribe"}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          {"Or"}
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Ready to order?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          {"You really know your stuff!"}
        </p>
        <Button as='a' size='large' primary>
          {"Pre-Order"}
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <footer class="ui inverted center aligned segment">
        <a href="https://www.instagram.com/unearthedfarm/"><i class="big instagram icon"></i></a>
        <a href="https://twitter.com/OKhomestead"><i class="big twitter icon"></i></a>
        <a href="https://www.facebook.com/unearthedfarm/"><i class="big facebook icon"></i></a></footer>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Team</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Season Pre-Order</List.Item>
                <List.Item as='a'>FAQ</List.Item>
                <List.Item as='a'>How Does It Work</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Get in touch
              </Header>
              <p>
                {"We might be out in the farm now, but we'll get back to you!"}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)
export default App;
