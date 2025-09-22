import { makeApplyContext } from "./MakeApplyContext";

export type Gender = "male" | "female" | "other";
export type CarDriver = {
  firstName: string; lastName: string; phone: string; city: string | null;
  gender?: Gender; dob?: Date | null; nid?: string; license?: string; photo?: File | null;
};
export type CarVehicle = {
  brand: string | null; model: string | null; regNo: string; year: string; fitnessNo: string; taxTokenNo: string;
};

const carDriverInit: CarDriver = {
  firstName: "", lastName: "", phone: "", city: null,
  gender: undefined, dob: null, nid: "", license: "", photo: null,
};
const carVehicleInit: CarVehicle = {
  brand: null, model: null, regNo: "", year: "", fitnessNo: "", taxTokenNo: "",
};

export const { Provider: CarApplyProvider, useApply: useCarApply } =
  makeApplyContext<CarDriver, CarVehicle>(carDriverInit, carVehicleInit);