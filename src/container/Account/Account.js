import React, { Component } from "react";
import { Form, TextArea, Input, Grid, Button } from "semantic-ui-react";
import EosApi from "eosjs-api";

const endpoint = "https://api.eosnewyork.io";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      info: "",
      balance: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    let account = this.state.account;
    let options = {
      httpEndpoint: endpoint,
      verbose: false
    };
    let eos = EosApi(options);
    eos
      .getAccount(account)
      .then(result =>
        this.setState({ info: result, balance: result.core_liquid_balance })
      );
  }
  render() {
    return (
      <Grid style={{ height: "100vh" }} verticalAlign="middle" centered>
        <Grid.Column style={{ width: "100vh" }}>
          <Form className="Form" size="large">
            <Form.Field
              control={Input}
              label="Account name"
              name="account"
              placeholder="Account name"
              value={this.state.account}
              onChange={this.onChange}
            />
            <Form.Field
              control={TextArea}
              label="Account Balance"
              name="balance"
              placeholder="Account Balance"
              value={this.state.balance}
              onChange={this.onChange}
            />
            <Form.Field
              control={TextArea}
              placeholder="Account information"
              style={{ height: "50vh" }}
              value={JSON.stringify(this.state.info)}
            />
          </Form>
          <br />
          <Button type="submit" onClick={this.onSubmit}>
            Submit
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Account;
