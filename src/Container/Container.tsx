import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
      {children}
    </div>
  );
};

export default Container;
