import { configureStore } from '@reduxjs/toolkit';
import articulosReducer from './articulosSlice';
import favoritosReducer from './favoritosSlice';

export function crearStore(preloadedState) {
  return configureStore({
    reducer: {
      articulos: articulosReducer,
      favoritos: favoritosReducer,
    },
    preloadedState,
  });
}
