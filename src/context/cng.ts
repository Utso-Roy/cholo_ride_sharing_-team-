import { makeApplyContext } from "./MakeApplyContext";

export type Gender = "male" | "female" | "other";
export type CNGDriver = {
  firstName: string; lastName: string; phone: string; city: string | null;
  gender?: Gender; dob?: Date | null; nid?: string; license?: string; photo?: File | null;
};
export type CNGVehicle = {
  brand: string | null; model: string | null; regNo: string; year: string; fitnessNo: string; taxTokenNo: string;
};

const cngDriverInit: CNGDriver = {
  firstName: "", lastName: "", phone: "", city: null,
  gender: undefined, dob: null, nid: "", license: "", photo: null,
};
const cngVehicleInit: CNGVehicle = {
  brand: null, model: null, regNo: "", year: "", fitnessNo: "", taxTokenNo: "",
};

export const { Provider: CNGApplyProvider, useApply: useCNGApply } =
  makeApplyContext<CNGDriver, CNGVehicle>(cngDriverInit, cngVehicleInit);