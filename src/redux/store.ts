import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './reducer/companySlice'; // Ensure the path to companySlice is correct

// Configuring the Redux store
const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

// Typing for TypeScript users (if applicable)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;