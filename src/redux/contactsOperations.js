import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await fetch('https://yourapi.mockapi.io/contacts');
    const data = await response.json();
    return data;
  }
);
