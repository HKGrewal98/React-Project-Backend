import React, { useState, useEffect } from 'react';

const ContactDetails = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/contact')
      .then((response) => response.json())
      .then((data) => setContactDetails(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div >
      {contactDetails ? (
        <div>
          <h2>Contact Us :-</h2><br/><br/>
          <p>
            <strong>Address:</strong> {contactDetails.address}
          </p>
          <p>
            <strong>Phone:</strong> {contactDetails.phone}
          </p>
          <p>
            <strong>Email:</strong> {contactDetails.email}
          </p>
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : 'Loading...'}</p>
      )}
    </div>
  );
};

export default ContactDetails;
