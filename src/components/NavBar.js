import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'


function NavBar() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to = "/">
            <h2 className = "navBarHeading">Buy Nothing</h2>
          </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>

              <NavDropdown title="Find Things" id="collapsible-nav-dropdown">
                <LinkContainer to="/browseCategories">
                  <NavDropdown.Item>Browse Listings</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/searchListings">
                  <NavDropdown.Item>Search Listings</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to="/checkLottery">
                  <NavDropdown.Item>Check Lottery Statuses</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown title="List Things" id="collapsible-nav-dropdown">
                <LinkContainer to="/listItem">
                  <NavDropdown.Item>List Item</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/myCurrentListings">
                  <NavDropdown.Item>Check Current Listings</NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to="/myPastListings">
                  <NavDropdown.Item>View Past Listings</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown title="My Info" id="collapsible-nav-dropdown">
                <LinkContainer to="/myProfile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/myMessages">
                  <NavDropdown.Item>My Messages</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      )
    }

export default NavBar;