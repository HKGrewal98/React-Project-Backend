import React, { useState, useEffect } from 'react';
import ContactDetails from '../ContactUs/ContactDetails';
import ContactForm from '../ContactUs/ContactForm';
import '../ContactUs/contact.css'; // import CSS file

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetch('/contact')
      .then((response) => response.json())
      .then((data) => setContactDetails(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (formData) => {
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        setFormError(error.message);
      });
  };

  return (
    <div className="container">
      <div className="contact-details">
        <ContactDetails contactDetails={contactDetails} />
      </div>
      <div className="contact-form">
        <ContactForm onSubmit={handleSubmit} formError={formError} />
      </div>
    </div>
  );
};

export default ContactUs;
