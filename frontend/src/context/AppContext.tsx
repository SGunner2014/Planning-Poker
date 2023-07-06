import { Player } from "@/utils/types";
import React, { createContext } from "react";

export type AppStateType = {
  inRoom: boolean;
  roomId?: string;
  isHost?: boolean;
  userId?: string;
  username?: string;
  players?: Player[];
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
      userId: string;
      username: string;
    }
  | {
      type: "setPlayers";
      players?: Player[];
    }
  | {
      type: "addPlayer";
      player: Player;
    }
  | {
      type: "removePlayer";
      id: string;
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
        userId: action.userId,
        username: action.username,
      };
    case "setPlayers":
      return {
        ...state,
        players: action.players,
      };
    case "addPlayer":
      return {
        ...state,
        players: [...(state.players ?? []), action.player],
      };
    case "removePlayer":
      return {
        ...state,
        players: state.players?.filter((player) => player.id !== action.id),
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
