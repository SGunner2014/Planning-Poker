import React, { createContext } from "react";

export type AppStateType = {
  inRoom: boolean;
  roomId?: string;
  isHost?: boolean;
  username?: string;
  players?: string[];
};

type AppAction =
  | {
      type: "joinRoom";
      roomId: string;
      isHost: boolean;
    }
  | {
      type: "leaveRoom";
    }
  | {
      type: "setUsername";
      username?: string;
    }
  | {
      type: "setPlayers";
      players?: string[];
    };

const appReducer = (state: AppStateType, action: AppAction): AppStateType => {
  switch (action.type) {
    case "joinRoom":
      return {
        ...state,
        inRoom: true,
        roomId: action.roomId,
        isHost: action.isHost,
      };
    case "leaveRoom":
      return {
        ...state,
        inRoom: false,
        roomId: undefined,
        isHost: undefined,
      };
    case "setUsername":
      return {
        ...state,
        username: action.username,
      };
    case "setPlayers":
      return {
        ...state,
        players: action.players,
      };
    default:
      return state;
  }
};

const defaultValues: AppStateType = {
  inRoom: false,
};

export const AppContext = createContext<{
  state: AppStateType;
  updateApp: React.Dispatch<AppAction>;
}>({
  state: defaultValues,
  updateApp: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [state, updateApp] = React.useReducer(appReducer, defaultValues);

  return (
    <AppContext.Provider value={{ state, updateApp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);
