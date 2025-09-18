import { createContext, useContext, useState, ReactNode } from "react";

export type Gender = "male" | "female" | "other";

export type DriverForm = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string | null;
  gender?: Gender;
  dob?: Date | null;
  nid?: string;
  license?: string;
  photo?: File | null;
};

export type VehicleForm = {
  brand: string | null;
  model: string | null;
  regNo: string;
  year: string;
  fitnessNo: string;
};

type Ctx = {
  driver: DriverForm;
  setDriver: (d: DriverForm) => void;
  vehicle: VehicleForm;
  setVehicle: (v: VehicleForm) => void;
  reset: () => void;
};

const BikeApplyContext = createContext<Ctx | null>(null);

const initialDriver: DriverForm = {
  firstName: "",
  lastName: "",
  phone: "",
  city: null,
  gender: undefined,
  dob: null,
  nid: "",
  license: "",
  photo: null,
};

const initialVehicle: VehicleForm = {
  brand: null,
  model: null,
  regNo: "",
  year: "",
  fitnessNo: "",
};

export function BikeApplyProvider({ children }: { children: ReactNode }) {
  const [driver, setDriver] = useState<DriverForm>(initialDriver);
  const [vehicle, setVehicle] = useState<VehicleForm>(initialVehicle);
  const reset = () => {
    setDriver(initialDriver);
    setVehicle(initialVehicle);
  };
  return (
    <BikeApplyContext.Provider value={{ driver, setDriver, vehicle, setVehicle, reset }}>
      {children}
    </BikeApplyContext.Provider>
  );
}

export function useBikeApply() {
  const ctx = useContext(BikeApplyContext);
  if (!ctx) throw new Error("useBikeApply must be used within BikeApplyProvider");
  return ctx;
}
