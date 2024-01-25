import React, { ReactNode, createContext, useReducer, useContext, useEffect } from 'react'
import realmsMetadata from '@/underworld/data/database.json'
import { City } from '@/underworld/utils/realms'
import { useLootUnderworld } from '@avante/crawler-react'

//
// React + Typescript + Context
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context
//

//--------------------------------
// Constants
//
export const initialState = {
  realmId: 1, // 6915,
  cityIndex: null,
  cityEntryCoord: null,
  city: null,
  chamberId: 0n,
  // constants
  logo: '/pubic/logo.png',
  realmsMetadata,
}

const UnderworldActions = {
  SET_REALM_ID: 'SET_REALM_ID',
  SET_CITY_INDEX: 'SET_CITY_INDEX',
  SET_CITY: 'SET_CITY',
  SET_CHAMBER: 'SET_CHAMBER',
}

//--------------------------------
// Types
//
type UnderworldStateType = {
  realmId: number,
  cityIndex: number | null,
  cityEntryCoord: bigint | null,
  city: City | null,
  chamberId: bigint,
  // constants
  logo: string,
  realmsMetadata: any,
}

type ActionType =
  | { type: 'SET_REALM_ID', payload: number }
  | { type: 'SET_CITY_INDEX', payload: number }
  | { type: 'SET_CITY', payload: any }
  | { type: 'SET_CHAMBER', payload: bigint }



//--------------------------------
// Context
//
const UnderworldContext = createContext<{
  state: UnderworldStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})

//--------------------------------
// Provider
//
interface UnderworldProviderProps {
  children: string | JSX.Element | JSX.Element[] | ReactNode
}
const UnderworldProvider = ({
  children,
}: UnderworldProviderProps) => {
  const { underworld } = useLootUnderworld()
  const [state, dispatch] = useReducer((state: UnderworldStateType, action: ActionType) => {
    let newState = { ...state }
    switch (action.type) {
      case UnderworldActions.SET_REALM_ID: {
        // Selected new Realm, clear current city and chamber
        newState.realmId = action.payload as number
        newState.cityIndex = null
        newState.cityEntryCoord = null
        newState.city = null
        newState.chamberId = 0n
        break
      }
      case UnderworldActions.SET_CITY_INDEX: {
        // Selected new City, clear current city and chamber, wait for City data
        newState.cityIndex = action.payload as number
        newState.cityEntryCoord = null
        newState.city = null
        newState.chamberId = 0n
        break
      }
      case UnderworldActions.SET_CITY: {
        // Fetched City data, set current city and chamber
        newState.cityEntryCoord = action.payload ? underworld.makeRealmEntryChamberIdFromCoord(newState.realmId, action.payload.coord) : null
        newState.city = action.payload ? { ...action.payload } : null
        newState.chamberId = newState.cityEntryCoord ?? 0n
        break
      }
      case UnderworldActions.SET_CHAMBER: {
        // Selected new Chamber
        newState.chamberId = action.payload
        break
      }
      default:
        console.warn(`UnderworldProvider: Unknown action [${action.type}]`)
        return state
    }
    return newState
  }, initialState)

  return (
    <UnderworldContext.Provider value={{ state, dispatch }}>
      {children}
    </UnderworldContext.Provider>
  )
}

export { UnderworldProvider, UnderworldContext, UnderworldActions }


//--------------------------------
// Hooks
//

export const useUnderworldContext = () => {
  const { state, dispatch } = useContext(UnderworldContext)
  return {
    ...state,
    dispatch,
    UnderworldActions,
  }
}

