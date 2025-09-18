import { makeApplyContext } from "./MakeApplyContext";


export type Gender = "male" | "female" | "other";
export type BikeDriver = {
  firstName: string; lastName: string; phone: string; city: string | null;
  gender?: Gender; dob?: Date | null; nid?: string; license?: string; photo?: File | null;
};
export type BikeVehicle = {
  brand: string | null; model: string | null; regNo: string; year: string; fitnessNo: string;
};

const bikeDriverInit: BikeDriver = {
  firstName: "", lastName: "", phone: "", city: null,
  gender: undefined, dob: null, nid: "", license: "", photo: null,
};
const bikeVehicleInit: BikeVehicle = {
  brand: null, model: null, regNo: "", year: "", fitnessNo: "",
};

export const { Provider: BikeApplyProvider, useApply: useBikeApply } =
  makeApplyContext<BikeDriver, BikeVehicle>(bikeDriverInit, bikeVehicleInit);