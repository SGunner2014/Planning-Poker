export enum MessageTypes {
  JOIN_ROOM = 'joinRoom',
  JOIN_ROOM_RESPONSE = 'joinRoomResponse',
  CREATE_ROOM = 'createRoom',
  CREATE_ROOM_RESPONSE = 'createRoomResponse',
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
  START_VOTING = 'startVoting',
  VOTE = 'vote',
  USER_VOTED = 'userVoted',
  VOTING_STARTED = 'votingStarted',
  REVEAL_CARDS = 'revealCards',
  CARDS_REVEALED = 'cardsRevealed',
}
