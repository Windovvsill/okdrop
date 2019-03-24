import React, { Component } from 'react';
import './semantic/dist/semantic.css';
import PropTypes from 'prop-types';
import cherry from "./assets/cherry.jpg";
import leafy from "./assets/leafy.png";
import okdrop from "./assets/okdrop.svg";
import okdroppng from "./assets/okdrop.png";
import cherries from "./assets/cherries.jpeg";
import jordan from "./assets/jordan.png";
import elena from "./assets/elena.jpg";
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
import { SubscriptionSegment } from "./components/Subscription";
import { OrderSegment } from "./components/Order";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// https://tomchentw.github.io/react-google-maps/#usage 
//https://blog.alexdevero.com/custom-styled-google-map-react/ 
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 49.292480, lng: -123.089070 }}
    defaultOptions={{
      disableDefaultUI: true, // disable default map UI
      draggable: true, // make map draggable
      keyboardShortcuts: false, // disable keyboard shortcuts
      scaleControl: true, // allow scale controle
      scrollwheel: true, // allow scroll wheel
    }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 49.281480, lng: -123.085070 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 49.284515, lng: -123.095648 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 49.268880, lng: -123.104567 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 49.323776, lng: -123.102458 }} />}
  </GoogleMap>
));



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
const HomepageHeading = ({ mobile, props }) => (
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
    <Image centered size="massive" src={okdroppng} />
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

    <SubscriptionSegment />


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
    <Container textAlign="center" inverted style={{ padding: "1em" }}>
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
    <Grid stackable verticalAlign='middle'>
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
        <Grid.Column width={8}>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfzZcRoNSI796bqhDRYRCS44csbZ8rNOY&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Grid.Column>
        <Grid.Column width={1}>
          <Icon name="right arrow" size="huge" />
        </Grid.Column>
        <Grid.Column width={7}>
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
    <Segment>

    </Segment>
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
    </Container>
    <Grid celled='internally' columns='equal' stackable>
      <Grid.Row textAlign='left'>
        <Grid.Column verticalAlign="middle" style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Image src={jordan} size="large" circular centered />
        </Grid.Column>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            {"Meet Farmer Jordan"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Location</strong>: Helen’s Acres, Mission Creek Park, Kelowna, BC (5 acres) Produce: Cherries, Apricots, Blueberries, Cherries, Tomatoes, Nectarines, Zucchini, Green Onions, Radishes, Corn, Peppers, Green Beans, Peas, Nectarines, Peaches, Pears, Plums, Apples, Onions, Tomatoes, Cucumbers, Cantaloupe, Lettuce, Peaches, Plums, Pears, Apples, Onions, Squash, Apples, Pumpkins, Squash Season’s </p>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Growing</strong>: 9th season. </p>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Philosophy</strong>: We farm according to the belief that healthy, delicious food is inextricably linked to the health of the soil that produces it. Healthy soil is teeming with microorganisms (a teaspoon of rich garden soil can hold up to one billion bacteria and several thousand protozoa) and organic matter--the decaying remains of plants, animals, and all those microbes. Both of these elements tend towards absence in farming systems that make heavy, sustained use of synthetic fertilizers, pesticides, and herbicides. A carrot is not a carrot. We also strive to keep the time between harvest and distribution as short as possible to ensure that our produce is consumed at or very near its peak of freshness.
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row textAlign='left'>
        <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Header as='h3' style={{ fontSize: '2em' }}>
            {"Meet Elena"}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Location</strong>: North Vancouver </p>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Family size</strong>: 4 and two kitties </p>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Loves</strong>: Organic produce, non-dairy products and Okanagan wine.
          </p>
          <p style={{ fontSize: '1.33em' }}>
            <strong>Why she loves Okanagan Drop</strong>: She is a busy mother feeding 3 teens in the lower mainland, so you can imagine they go through A LOT of food. She strives to feed her family with healthy, organic, high-quality foods, but with everything always on the go, she has a difficult time finding Okanagan produce. She doesn’t want to go out of her way to search Okanagan. But she does support local farmers and would like to know where her food comes. The whole aspect of receiving weekly boxes of Okanagan produce gives her the experience of having an orchard right in her backyard. Also, it teaches her younger kids how as the season progresses how different fruits and veggies ripen.

          </p>
        </Grid.Column>
        <Grid.Column verticalAlign="middle" style={{ paddingBottom: '2em', paddingTop: '2em' }}>
          <Image src={elena} size="large" circular centered />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

class App extends React.Component {
  onSubscribe() {

  }

  render() {

    return <ResponsiveContainer>
      <PurposeSegment />
      <FarmersSegment />

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <SubscriptionSegment onSubscribe={this.onSubscribe} />
          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            {"Or"}
          </Divider>

          <OrderSegment />
          {/* <Segment inverted raised style={{
            backgroundImage: "radial-gradient(at 50% 100%, rgba(90, 21, 30, 1), rgba(85, 0, 30, 1), rgb(80, 20, 77, 1))",
          }}>
            <Grid>
              <Grid.Row columns={2} inverted>
                <Grid.Column width={12} inverted>
                  
                    <Header as='h3' style={{ fontSize: '2em' }} inverted>
                      {"Ready to order?"}
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      {"You really know your stuff!"}
                    </p>
                </Grid.Column>
                <Grid.Column width={4} verticalAlign="middle">
                    <Button as='a' size='large' primary icon>
                      {"Pre-Order"}
                      <Icon name='right arrow' />
                    </Button>

                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment> */}
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
    </ResponsiveContainer>;
  }
}
export default App;
