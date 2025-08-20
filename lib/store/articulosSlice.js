import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const cargarArticulos = createAsyncThunk(
  'articulos/cargarArticulos',
  async (categoria = 'todas') => {
    const query =
      categoria && categoria !== 'todas'
        ? `?cat=${encodeURIComponent(categoria)}`
        : '';
    const res = await fetch(`/api/articulos${query}`);
    if (!res.ok) throw new Error('No se pudieron cargar los artículos');
    return await res.json();
  }
);

const articulosSlice = createSlice({
  name: 'articulos',
  initialState: {
    items: [],
    estado: 'inicial', // 'inicial' | 'cargando' | 'listo' | 'error'
    error: null,
    categoriaActual: 'todas',
  },
  reducers: {
    setCategoriaActual(state, action) {
      state.categoriaActual = action.payload || 'todas';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarArticulos.pending, (state) => {
        state.estado = 'cargando';
        state.error = null;
      })
      .addCase(cargarArticulos.fulfilled, (state, action) => {
        state.estado = 'listo';
        state.items = action.payload;
      })
      .addCase(cargarArticulos.rejected, (state, action) => {
        state.estado = 'error';
        state.error = action.error.message || 'Error desconocido';
      });
  },
});

export const { setCategoriaActual } = articulosSlice.actions;
export default articulosSlice.reducer;
