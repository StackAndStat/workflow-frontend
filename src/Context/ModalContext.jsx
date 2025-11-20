import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isAddModalOpen, setIsAddModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("Context must be used within ModalProvider");
  }

  return context;
};

export { ModalProvider, useModal };
