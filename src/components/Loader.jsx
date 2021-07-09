import React from "react";

const Loader = () => (
  <div className={"loader-background"}>
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="cube" />
      </div>
      <div className="loader-wrapper">
        <div className="cube" />
      </div>
      <div className="loader-wrapper">
        <div className="cube" />
      </div>
    </div>
  </div>
);
export default Loader;