const Contacts = () => {
  return (
    <section className="contacts-section">
      <div className="contacts-content">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@boutiquecoffee.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+359 321654987</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>
              4444 Coffee Street
              <br />
              Es Presso Street, CF 12345
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
