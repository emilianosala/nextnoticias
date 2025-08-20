import { createSlice } from '@reduxjs/toolkit';

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: {
    ids: [],
  },
  reducers: {
    alternarFavorito(state, action) {
      const id = action.payload;
      const i = state.ids.indexOf(id);
      if (i >= 0) state.ids.splice(i, 1);
      else state.ids.push(id);
    },
  },
});

export const { alternarFavorito } = favoritosSlice.actions;
export default favoritosSlice.reducer;
