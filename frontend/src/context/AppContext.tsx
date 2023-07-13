import { Player } from "@/utils/types";
import React, { createContext } from "react";

export enum RoomState {
  Voting = "voting",
  Lobby = "lobby",
  Review = "review",
}

export type AppStateType = {
  inRoom: boolean;
  state: RoomState;
  roomId?: string;
  isHost?: boolean;
  hostId?: string;
  userId?: string;
  username?: string;
  players?: Player[];
  votedPlayers?: Set<string>;
  playerVotes?: Record<string, number | string>;
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
      players: Player[];
      hostId: string;
    }
  | {
      type: "addPlayer";
      player: Player;
    }
  | {
      type: "removePlayer";
      userId: string;
      ownerId: string;
    }
  | {
      type: "setRoomState";
      state: RoomState;
    }
  | {
      type: "setPlayerVoted";
      userId: string;
    }
  | {
      type: "setPlayerVotes";
      playerVotes: Record<string, number | string>;
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
        hostId: action.hostId,
      };
    case "addPlayer":
      return {
        ...state,
        players: [...(state.players ?? []), action.player],
      };
    case "removePlayer":
      return {
        ...state,
        players: state.players?.filter((player) => player.id !== action.userId),
        isHost: action.ownerId === state.userId,
      };
    case "setRoomState":
      return {
        ...state,
        state: action.state,
      };
    case "setPlayerVoted":
      return {
        ...state,
        votedPlayers: new Set(state.votedPlayers ?? []).add(action.userId),
      };
    case "setPlayerVotes":
      return {
        ...state,
        playerVotes: action.playerVotes,
      };
    default:
      return state;
  }
};

const defaultValues: AppStateType = {
  inRoom: false,
  state: RoomState.Lobby,
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
