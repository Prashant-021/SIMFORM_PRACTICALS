import React from 'react';
import Header from './components/header/Header';
import { Col, Container, Row } from 'react-bootstrap'
import AddTodo from './components/addtodo/AddTodo'

import Displaydate from './components/date/Displaydate'

import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row className='bodySec'>
          <Col className='contentBox col-12 col-md-6 col-lg-3 px-3 px-md-4 py-5 bg-light border border-1 rounded'>
            <Displaydate />
            <AddTodo />
            <Toaster/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
