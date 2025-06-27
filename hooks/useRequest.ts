import { useCallback, useReducer } from "react";

export interface RequestState {
  loading: boolean;
  data: any;
  error: string;
}
export interface RequestAction {
  type: "REQUEST" | "SUCCESS" | "FAILURE";
  payload?: any;
}
export interface RequestCallback {
  (): Promise<any>;
}

const initialState: RequestState = {
  loading: false,
  data: null,
  error: "",
};

function requestReducer(state: RequestState, action: RequestAction) {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function useRequest() {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  const apiRequest = useCallback(
    async (callback: RequestCallback) => {
      dispatch({ type: "REQUEST" });

      try {
        const data = await callback();
        dispatch({ type: "SUCCESS", payload: data });
      } catch (error: any) {
        dispatch({ type: "FAILURE", payload: error.message });
      }
    },
    [dispatch]
  );

  return { state, apiRequest };
}
