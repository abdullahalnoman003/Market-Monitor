import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import warningAnimation from "../Animation/AdminAnimation.json";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <section className="section-shell flex min-h-[80vh] items-center justify-center py-12">
      <div className="surface-card w-full max-w-3xl px-6 py-10 text-center sm:px-10">
        <div className="mx-auto w-48 sm:w-56">
          <Lottie animationData={warningAnimation} loop />
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-error/30 bg-error/10 px-4 py-1 text-sm font-medium text-error">
          <FaShieldAlt /> Access restricted
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-base-content sm:text-4xl">Unauthorized Access</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-base-content/70 sm:text-base">
          You do not have permission to view this page. If you believe this is an error, please contact an administrator.
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-warning mt-8 gap-2 rounded-full px-6"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
