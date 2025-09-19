import { createContext, useContext, useState, ReactNode } from "react";

export function makeApplyContext<TDriver, TVehicle>(driverInit: TDriver, vehicleInit: TVehicle) {
  type Ctx = {
    driver: TDriver;
    setDriver: (d: TDriver) => void;
    vehicle: TVehicle;
    setVehicle: (v: TVehicle) => void;
    reset: () => void;
  };

  const CtxObj = createContext<Ctx | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const [driver, setDriver] = useState<TDriver>(driverInit);
    const [vehicle, setVehicle] = useState<TVehicle>(vehicleInit);
    const reset = () => {
      setDriver(driverInit);
      setVehicle(vehicleInit);
    };
    return (
      <CtxObj.Provider value={{ driver, setDriver, vehicle, setVehicle, reset }}>
        {children}
      </CtxObj.Provider>
    );
  }

  function useApply() {
    const ctx = useContext(CtxObj);
    if (!ctx) throw new Error("useApply must be used within its Provider");
    return ctx;
  }

  return { Provider, useApply };
}