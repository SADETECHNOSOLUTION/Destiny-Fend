import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    selectedDepartment: null,
  },
  reducers: {
    setDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    clearDepartment: (state) => {
      state.selectedDepartment = null;
    },
  },
});

export const { setDepartment, clearDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
