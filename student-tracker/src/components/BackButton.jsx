// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // dashboard route
  };

  return (
    <button className="back-button" type="button" onClick={handleBack}>
      ← Back to Dashboard
    </button>
  );
}

export default BackButton;
