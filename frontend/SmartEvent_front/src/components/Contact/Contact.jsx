import React from 'react';
import './Contact.css';

function Contact() {
    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Your message has been sent!');
      // Add logic here to send the form data to a backend or email service
    };
  
    return (
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to reach out to us!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    );
  }
export default Contact;