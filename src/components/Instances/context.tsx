import { filter } from "lodash";
import React from "react";
import { useReducer } from "react";
import { Instance } from "types/instance";

interface InstancesContextInterface {
  instances: Instance[];
  isLoading: boolean;
  selectedInstance: Instance | null;
  setSelectedInstance: (selectedInstance: Instance | null) => void;
  instancesSuccess: (newInstances: Instance[]) => void;
  instancesLoading: () => void;
  deleteInstance: (name: string) => void;
}

enum InstancesActionKind {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  DELETE = "DELETE",
  SELECT_INSTANCE = "SELECT_INSTANCE",
}

interface InstancesAction {
  type: InstancesActionKind;
  payload: {
    instances: Instance[];
    selectedInstance: Instance | null;
  };
}

interface InstancesState {
  instances: Instance[];
  isLoading: boolean;
  selectedInstance: Instance | null;
}

const initialState: InstancesState = {
  instances: [],
  isLoading: true,
  selectedInstance: null,
};

const reducer = (state: InstancesState, action: InstancesAction) => {
  const actions = {
    [InstancesActionKind.SUCCESS]: () => ({
      ...state,
      isLoading: false,
      instances: action.payload.instances,
    }),
    [InstancesActionKind.LOADING]: () => ({
      ...state,
      isLoading: true,
      instances: [],
    }),
    [InstancesActionKind.DELETE]: () => {
      const instances = action.payload.instances;

      return {
        ...state,
        instances,
      };
    },
    [InstancesActionKind.SELECT_INSTANCE]: () => {
      const selectedInstance = action.payload.selectedInstance;

      return {
        ...state,
        selectedInstance,
      };
    },
  };

  const reducerAction = actions[action.type];
  return reducerAction ? reducerAction() : state;
};

const initialContext: InstancesContextInterface = {
  instances: [],
  isLoading: false,
  selectedInstance: null,
  setSelectedInstance: () => null,
  instancesSuccess: () => null,
  instancesLoading: () => null,
  deleteInstance: () => null,
};

export const InstancesContext =
  React.createContext<InstancesContextInterface>(initialContext);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    instances: state.instances,
    isLoading: state.isLoading,
    selectedInstance: state.selectedInstance,
    setSelectedInstance: (selectedInstance: Instance | null) =>
      dispatch({
        type: InstancesActionKind.SELECT_INSTANCE,
        payload: {
          selectedInstance,
          instances: state.instances,
        },
      }),
    instancesSuccess: (newInstances: Instance[]) =>
      dispatch({
        type: InstancesActionKind.SUCCESS,
        payload: {
          selectedInstance: state.selectedInstance,
          instances: newInstances,
        },
      }),
    instancesLoading: () =>
      dispatch({
        type: InstancesActionKind.LOADING,
        payload: {
          selectedInstance: state.selectedInstance,
          instances: [],
        },
      }),
    deleteInstance: (name: string) => {
      const newInstances = filter(
        state.instances,
        (instance) => instance.name !== name
      );

      dispatch({
        type: InstancesActionKind.DELETE,
        payload: {
          instances: newInstances,
          selectedInstance: state.selectedInstance,
        },
      });
    },
  };

  return (
    <InstancesContext.Provider value={value}>
      {children}
    </InstancesContext.Provider>
  );
};

export default Provider;
