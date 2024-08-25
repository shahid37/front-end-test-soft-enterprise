// slices/VehicleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const VehicleSlice = createSlice({
  name: "vehicleSlice",
  initialState: {
    count: 0,
    vehicleImages: [],
    vehicleFeature: [],
    rentalInfo: null,
    insuranceInfo: {},
    vehicleAdditionalInfo:null,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setVehicleImages: (state, { payload }) => {
      state.vehicleImages = payload;
    },
    setVehicleFeature: (state, { payload }) => {
      state.vehicleFeature = payload;
    },
    setVehicleRentalInformation: (state, { payload }) => {
      state.rentalInfo = payload;
    },
    setVehicleInsuranceInfo: (state, { payload }) => {
      state.insuranceInfo = payload;
    },
    setVehicleAdditionalInfo: (state, { payload }) => {
      state.vehicleAdditionalInfo = payload;
    },
  },
});

export const {
  increment,
  decrement,
  setVehicleImages,
  setVehicleFeature,
  setVehicleInsuranceInfo,
  setVehicleAdditionalInfo,
  setVehicleRentalInformation,
} = VehicleSlice.actions;
export default VehicleSlice.reducer;
