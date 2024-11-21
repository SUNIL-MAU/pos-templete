import { createSlice } from '@reduxjs/toolkit';
import companyData from '../../data/data.json';

const initialState = {
  companies: companyData,
  status: 'idle',
  error: null,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    editCompany: (state, action) => {
      const { id, updatedCompany } = action.payload;
      const index = state.companies.findIndex((company) => company.id === id);
      if (index !== -1) state.companies[index] = updatedCompany;
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload,
      );
    },
  },
});

export const { addCompany, editCompany, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
