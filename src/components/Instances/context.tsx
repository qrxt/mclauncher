import React from "react";
import { useReducer } from "react";
import { Instance } from "types/instance";

interface InstancesContextInterface {
  instances: Instance[];
  isLoading: boolean;
  instancesSuccess: (newInstances: Instance[]) => void;
  instancesLoading: () => void;
}

enum InstancesActionKind {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
}

interface InstancesAction {
  type: InstancesActionKind;
  payload: Instance[];
}

interface InstancesState {
  instances: Instance[];
  isLoading: boolean;
}

const initialState: InstancesState = {
  instances: [],
  isLoading: true,
};

const reducer = (state: InstancesState, action: InstancesAction) => {
  const actions = {
    [InstancesActionKind.SUCCESS]: () => ({
      ...state,
      isLoading: false,
      instances: action.payload,
    }),
    [InstancesActionKind.LOADING]: () => ({
      ...state,
      isLoading: true,
      instances: [],
    }),
  };

  const reducerAction = actions[action.type];
  return reducerAction ? reducerAction() : state;
};

const initialContext: InstancesContextInterface = {
  instances: [],
  isLoading: false,
  instancesSuccess: () => null,
  instancesLoading: () => null,
};

export const InstancesContext =
  React.createContext<InstancesContextInterface>(initialContext);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    instances: state.instances,
    isLoading: state.isLoading,
    instancesSuccess: (newInstances: Instance[]) =>
      dispatch({
        type: InstancesActionKind.SUCCESS,
        payload: newInstances,
      }),
    instancesLoading: () =>
      dispatch({
        type: InstancesActionKind.LOADING,
        payload: [],
      }),
  };

  return (
    <InstancesContext.Provider value={value}>
      {children}
    </InstancesContext.Provider>
  );
};

export default Provider;
