import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export const defaultStaleTime = 0

export enum Queries {
  companies = 'companies',
  colors = 'vehiclesColors',
  brands = 'vehiclesBrands',
  types = 'vehiclesTypes',
  departments = 'departments',
  vehiclesActives = 'vehiclesActives',
  vehiclesInactives = 'vehiclesInactives',
  vehiclesAvailable = 'vehiclesAvailable',
  expiredKmBalance = 'expiredKmBalance',
  driversActives = 'driversActives',
  driversInactives = 'driversInactives',
  reservationsOpened = 'reservationsOpened',
  reservationsCanceled = 'reservationsCanceled',
  reservationsCompleted = 'reservationsCompleted',
  reservationsInProgress = 'reservationsInProgress',
  reservationsRejected = 'reservationsRejected',
  reservationsReserved = 'reservationsReserved',
  reservationById = 'reservationById',
  policyText = 'agreePolicyText',
  policyPageText = 'policyText',
  user = 'user',
}
export type QueryKey = keyof typeof Queries
