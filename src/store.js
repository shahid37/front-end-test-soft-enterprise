// store.js
import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './pages/addNewVechicle/slice/vechicleSlice';

export default configureStore({
  reducer: {
    vehicleSlice: vehicleReducer,
  },
});