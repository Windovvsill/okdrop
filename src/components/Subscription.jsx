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
    console.log(this.state.isLoading);
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
