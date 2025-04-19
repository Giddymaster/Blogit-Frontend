import { useEffect } from "react";
import PropTypes from "prop-types";
import useUserStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const user = useUserStore((state) => state?.user || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <div>{children}</div>;
}
Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
