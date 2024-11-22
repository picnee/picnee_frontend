import React from "react";

const RegistErrorMsg = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-[#ff0000] mt-2">{children}</span>;
};

export default RegistErrorMsg;
