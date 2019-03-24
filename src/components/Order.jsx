import React, { Component } from 'react'
import { Button, Icon, Modal, Segment, Grid, Header, Form, Radio } from 'semantic-ui-react'

export class OrderSegment extends React.Component {
  state = { value: "Lightsails" }
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    return <Segment fluid inverted raised style={{
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

            <Modal trigger={
              <Button as='a' size='large' color="red" icon>
                {"Pre-Order"}
                <Icon name='right arrow' />
              </Button>
            }>
              <Modal.Header>Pickup</Modal.Header>
              <Modal.Content image>
                <div className='image'>
                  <Icon name='right arrow' />
                </div>
                <Modal.Description>
                  <p>Choose one of our great Vancouver partners to pickup from</p>
                  <Form>
                    <Form.Field>
                      <Radio
                        label=""
                        name='radioGroup'
                        value='Cat Café'
                        checked={this.state.value === 'Cat Café'}
                        onChange={this.handleChange}
                      />
                      <Icon name='coffee' />
                      <a href='https://twinsailsbrewing.com/'>Cat Café</a>{" 2821 Murray St, Port Moody"}
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label=""
                        name='radioGroup'
                        value='Lightsails'
                        checked={this.state.value === 'Lightsails'}
                        onChange={this.handleChange}
                      />
                      <Icon name='beer' />
                      <a href='https://twinsailsbrewing.com/'>Lightsails</a>{" 3397 Shore Ave, Port Moody"}
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label=""
                        name='radioGroup'
                        value='Tycoon Craft Brewery'
                        checked={this.state.value === 'Tycoon Craft Brewery'}
                        onChange={this.handleChange}
                      />
                      <Icon name='beer' />
                      <a href='https://twinsailsbrewing.com/'>Tycoon Craft Brewery</a>{" 4500 Forward Way, Vancouver"}
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label=""
                        name='radioGroup'
                        value='TIP Wine'
                        checked={this.state.value === 'TIP Wine'}
                        onChange={this.handleChange}
                      />
                      <Icon name='glass martini' />
                      <a href='https://twinsailsbrewing.com/'>TIP Wine</a>{" 800 Griffiths Way, Vancouver"}
                    </Form.Field>

                  </Form>


                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <NestedModal />
              </Modal.Actions>
            </Modal>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>;
  }
};

class NestedModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button primary icon>
            Proceed <Icon name='right chevron' />
          </Button>
        }
      >
        <Modal.Header>Thanks!</Modal.Header>
        <Modal.Content>
          <p>We'll contact you about your order shortly</p>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='All Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}

// export const ModalExampleMultiple = () => (
//   <Modal trigger={<Button>Multiple Modals</Button>}>
//     <Modal.Header>Modal #1</Modal.Header>
//     <Modal.Content image>
//       <div className='image'>
//         <Icon name='right arrow' />
//       </div>
//       <Modal.Description>
//         <p>We have more to share with you. Follow us along to modal 2</p>
//       </Modal.Description>
//     </Modal.Content>
//     <Modal.Actions>
//       <NestedModal />
//     </Modal.Actions>
//   </Modal>
// )
