import indicator from "../../assets/indicator.gif";
import "./loadingIndicator.scss";

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <img src={indicator} width="20px" alt="Loading..." />
    </div>
  );
};

export default LoadingIndicator;
