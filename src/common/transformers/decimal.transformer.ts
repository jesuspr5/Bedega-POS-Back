import { ValueTransformer } from 'typeorm';

export const decimalTransformer: ValueTransformer = {
  to: (value: number) => value, // lo guarda igual
  from: (value: string | null): number => (value !== null ? Number(value) : 0), // lo convierte a número
};
