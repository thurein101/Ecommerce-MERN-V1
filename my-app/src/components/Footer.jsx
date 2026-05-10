import { NavLink } from "react-router-dom";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
        {/* Left */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Thurein MyoMin</span>. All Rights Reserved
        </p>

        {/* Right */}
        <div className="flex gap-6">
          <FooterLink to="/about" label="About" onClick={handleClick} />
          <FooterLink to="/contact" label="Contact" onClick={handleClick} />
          <FooterLink to="/privacy" label="Privacy Policy" onClick={handleClick} />
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="hover:text-white transition-colors duration-200"
  >
    {label}
  </NavLink>
);

export default Footer;
