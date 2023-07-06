export interface Player {
  id: string;
  username: string;
}

export interface Room {
  id: string;
  users: Player[];
  ownerId: string;
}
