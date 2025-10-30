import { makeApplyContext } from "./MakeApplyContext";



type Driver = {
  fullName: string;
  phone: string;
  nid?: string;
  address?: string;
};

type Vehicle = {
  type: "truck" | "ambulance" | "bus" | "shuttle";
  regNo?: string;
  capacity?: number;
};

const driverInit: Driver = {
  fullName: "",
  phone: "",
  nid: "",
  address: "",
};

const vehicleInit: Vehicle = {
  type: "truck",
  regNo: "",
  capacity: undefined,
};

export const {
  Provider: ServiceApplyProvider,
  useApply: useServiceApply,
} = makeApplyContext<Driver, Vehicle>(driverInit, vehicleInit);
