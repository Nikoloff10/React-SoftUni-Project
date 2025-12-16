import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Boutique Coffee Market</h1>

        <section className="about-section">
          <h2>Project Overview</h2>
          <p>
            Boutique Coffee Market is a full-stack web application built as a
            React project for SoftUni's REACT course. This platform serves as an
            online marketplace dedicated to specialty coffee enthusiasts,
            combining e-commerce functionality with a community forum for coffee
            lovers.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Coffee Catalog</h3>
              <p>
                Browse through our curated selection of premium coffee products.
                Each product includes detailed information, pricing, and images
                to help you make the perfect choice.
              </p>
            </div>
            <div className="feature-item">
              <h3>Shopping Cart</h3>
              <p>
                Authenticated users can add products to their cart, adjust
                quantities, and manage their selections before checkout. The
                cart persists across sessions for a seamless shopping
                experience.
              </p>
            </div>
            <div className="feature-item">
              <h3>Community Forum</h3>
              <p>
                Share your coffee experiences, brewing techniques, and product
                reviews. Registered users can create posts, engage in
                discussions, and connect with fellow coffee enthusiasts.
              </p>
            </div>
            <div className="feature-item">
              <h3>User Profiles</h3>
              <p>
                Create and customize your personal profile. Manage your forum
                posts, track your activity, and build your presence in the
                coffee community.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React 19.2.0 - UI library</li>
                <li>React Router DOM 7.10.1 - Client-side routing</li>
                <li>Vite 7.2.4 - Build tool and dev server</li>
                <li>FontAwesome - Icon library</li>
                <li>CSS3 - Styling</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>
                  SoftUni Practice Server *which is NOT my property* - RESTful
                  API
                </li>
                <li>JSON-based data storage</li>
                <li>User authentication and authorization</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Project Architecture</h2>
          <p>
            The application follows modern React best practices with a
            component-based architecture. It implements Context API for state
            management, including UserContext for authentication and CartContext
            for shopping cart functionality. Protected routes ensure secure
            access to authenticated features, while guest routes handle public
            pages.
          </p>
        </section>

        <section className="about-section">
          <h2>Development Purpose</h2>
          <p>
            This project was developed as part of the SoftUni curriculum to
            demonstrate proficiency in:
          </p>
          <ul>
            <li>React fundamentals and hooks</li>
            <li>State management with Context API</li>
            <li>React Router for navigation</li>
            <li>RESTful API integration</li>
            <li>User authentication and authorization</li>
            <li>Responsive web design</li>
            <li>Component composition and reusability</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
