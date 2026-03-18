import { FormEvent } from "react";

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="contact" className="section contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your name" aria-label="Your name" />
        <input type="email" placeholder="Email address" aria-label="Email address" />
        <textarea placeholder="How can we help?" aria-label="Message" rows={4} />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
