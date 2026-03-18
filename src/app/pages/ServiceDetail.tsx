import { Link, useParams } from "react-router-dom";
import { services } from "../data/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="section service-detail">
        <h1>Service Not Found</h1>
        <Link to="/">Back to Home</Link>
      </section>
    );
  }

  return (
    <section className="section service-detail">
      <h1>{service.title}</h1>
      <p>{service.details}</p>
      <Link to="/">Back to Home</Link>
    </section>
  );
};

export default ServiceDetail;
