'use client';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import { crearStore } from '@/lib/store';

export default function ReduxProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) storeRef.current = crearStore();
  return <Provider store={storeRef.current}>{children}</Provider>;
}
