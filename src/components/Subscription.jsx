import React from "react";
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
  Modal,
  Input,
} from 'semantic-ui-react';
import Axios from "axios";

const mailjetApiKey = "2dc9aa6048a0421c216d1d97bb29df18";
const contactsApiUrl = "https://api.mailjet.com/v3/REST/contact";
const mailjetSecretKey = "c6fdbf15db421b045af409d78a8506c0";
const basicAuth = `Basic ${btoa(`${mailjetApiKey}:${mailjetSecretKey}`)}`;

export class MJSubscriptSegment extends React.Component {
  render() {
    return <Segment margin raised >
      <Grid>
        <Grid.Row>
          <Header as='h3' style={{ fontSize: '2em', padding: '.5em' }}>
            {"Sign up to stay updated on our progress"}
          </Header>

          <div style={{ padding: '.5em' }} class="mj-w-button mj-w-btn" data-token="033b2f2a4df6abd5eaab98e7a07dd0e9">
            <a href="#" data-token="033b2f2a4df6abd5eaab98e7a07dd0e9" onclick="mjOpenPopin(event, this)">
              <Button fluid color="red" >
                {"Subscribe "}
                <Icon style={{ padding: '.5em' }} name="mail" />
              </Button>
            </a>
          </div>
        </Grid.Row>
      </Grid>
    </Segment >;
  }
}

export class SubscriptionSegment extends React.Component {
  state = {
    email: "",
    isLoading: false,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  onChange(event, data) {
    console.log("On change data", data.value);
    this.setState({ email: data.value });
  }

  addContact() {
    // addContactToMJ(this.state.email);
    this.props.onSubscribe && this.props.onSubscribe();
  }

  render() {
    return <Segment margin raised >
      <Header as='h3' style={{ fontSize: '2em' }}>
        {"Sign up to stay updated on our progress"}
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12} stretched fluid>
            <Input fluid label="email" placeholder="cherry@lover.ca" onChange={this.onChange} />
          </Grid.Column>
          <Grid.Column width={4} fluid>
            <Modal trigger={
              <Button
                loading={this.state.isLoading}
                disabled={this.state.isLoading || !this.state.email}
                onClick={() => {
                  if (this.state.email)
                    this.setState({ isLoading: true }, () => setTimeout(() => this.setState({ isLoading: false }), 3000))
                }
                }
                fluid
                size="large"
                primary
              >
                {"Subscribe"}
              </Button>
            }>
              <Modal.Header>Thanks for Subscribing!</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='small' src={require("../assets/cherries.jpeg")} />
                <Modal.Description>
                  <Header>Lots of great things are headed your way</Header>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment >;
  }
};

const addContactToMJ = async (email) => {
  console.log("sending with email:", email, basicAuth);
  const response = await Axios.post(
    contactsApiUrl,
    {
      Email: email,
    },
    {
      headers: {
        Authorization: basicAuth,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    },
  );

  console.log("axios res:", response);

  return response;
};
