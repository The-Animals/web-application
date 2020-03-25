import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu style={{height: "20vh"}}/>
        <Container style={{height: "80vh"}}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
