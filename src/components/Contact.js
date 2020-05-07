import React, { useState } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import config from '../config';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Send');

  function updateName(e) {
    setName(e.target.value);
    setButtonText('Send');
  }

  function updateEmail(e) {
    setEmail(e.target.value);
    setButtonText('Send');
  }

  function updateMessage(e) {
    setMessage(e.target.value);
    setButtonText('Send');
  }

  function validateForm() {
    return name.length > 0 && email.length > 0 && message.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setButtonText('Sending...');
    fetch(config.emailURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        sourceEmail: config.emailAddress,
        siteDomain: window.location.host,
      }),
    }).then((response) => response.json()).then((json) => {
      if (json.MessageId) {
        setButtonText('Sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setButtonText('Send');
        window.alert('An error occurred with the contact form. Please send an email directly to steveparham@gmail.com.');
      }
    });
  }

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p className="contact-subheader">For purchase requests or general inquiries, please send me a message below.</p>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <FormControl
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={updateName}
          />
        </FormGroup>
        <FormGroup controlId="email">
          <FormControl
            placeholder="Your Email Address"
            type="email"
            value={email}
            onChange={updateEmail}
          />
        </FormGroup>
        <FormGroup controlId="message">
          <FormControl
            rows={10}
            as="textarea"
            placeholder="Your Message"
            value={message}
            onChange={updateMessage}
          />
        </FormGroup>
        <div>
          <Button
            block
            type="submit"
            size="lg"
            variant="outline-light"
            disabled={!validateForm()}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
