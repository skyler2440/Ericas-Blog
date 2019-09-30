import React, { Component } from "react";
import { render } from "react-dom";
import {leftItems, rightItems} from './NavBarComponents';

import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

const NavBarDesktop = ({ leftItems, rightItems }) => (
    <Menu fixed="top" inverted>
      <Menu.Item>
        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      {_.map(leftItems, item => <Menu.Item {...item} />)}
      <Menu.Menu position="right">
        {_.map(rightItems, item => <Menu.Item {...item} />)}
      </Menu.Menu>
    </Menu>
  );

  export default NavBarDesktop