import { useState } from "react";
import "./styles.css";

const beneficiaries = {
  "ATUL RAJNIKANT GAGLANI": 67588121298090,
  "JAYNIL ATUL GAGLANI": 24972472768750
};

export default function App() {
  const [url, setUrl] = useState("");

  const handleURLChange = (e) => setUrl(e.target.value);

  const copyResultURL = (beneficiaryId) => {
    if (beneficiaryId) {
      const res = String(url)
        .replace(
          "select-beneficiary?",
          `booking/time-slot?beneficiaryIds=${beneficiaryId}&`
        )
        .replace("&utm_source=telegram?", "");
      navigator.clipboard.writeText(res);
      return window?.open(res, "_blank");
    }
    alert("Please select valid beneficiary");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const [_, { value: beneficiary }] = e.target.form;
    if (beneficiary && beneficiary !== "Select Beneficiary") {
      console.log(beneficiary);
      return copyResultURL(beneficiaries[beneficiary]);
    }
    alert("Please select beneficiary");
  };

  return (
    <div className="text--center">
      <form>
        <div className="input__box">
          <input
            className="input"
            type="url"
            onChange={handleURLChange}
            placeholder="Enter URL"
            required
          />
        </div>
        <div className="input__box">
          <select
            required
            className="input"
            name="beneficiary"
            defaultValue="Select Beneficiary"
          >
            <option value="Select Beneficiary" disabled hidden>
              Select Beneficiary
            </option>
            <option value="ATUL RAJNIKANT GAGLANI">
              ATUL RAJNIKANT GAGLANI
            </option>
            <option value="JAYNIL ATUL GAGLANI">JAYNIL ATUL GAGLANI</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleFormSubmit}
          className="button button--primary subtitle--sm button--sm"
          style={{ color: "white" }}
        >
          Open Result
        </button>
      </form>
    </div>
  );
}
