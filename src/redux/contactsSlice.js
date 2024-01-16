import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://65a51c5a52f07a8b4a3e5f05.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contactData => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await fetch(`${API_URL}/${contactId}`, {
      method: 'DELETE',
    });
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [addContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export default contactsSlice.reducer;
