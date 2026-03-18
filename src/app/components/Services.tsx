import { Link } from "react-router-dom";
import { services } from "../data/services";

const Services = () => {
  return (
    <section id="services" className="section services">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            <Link to={`/services/${service.slug}`}>Learn More</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
