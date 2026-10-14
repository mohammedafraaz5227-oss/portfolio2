import React from "react";
import { Secret } from "@/components/ui/hover-text-reveal-1";

export const DemoOne: React.FC = () => {
  const mySecretWords = ["VISIT", "EASEMIZE", "UI"];
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <Secret items={mySecretWords} />
    </div>
  );
};

export default DemoOne;
