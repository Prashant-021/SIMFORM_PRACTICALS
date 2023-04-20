import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


const Header = () => {
  return (
    <Navbar bg="dark" variant='dark'>
        <Container className='justify-content-start'>
          <Navbar.Brand>Todo App in React</Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header
