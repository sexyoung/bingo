# Class

## Room
- name
- user[]
- `sendMessage`

## User
- id
- name
- matrix
- `sendMessage`

### JoinRoom extends Room
- `invite`
- `kick`
- `startGame`

## JoinUser extends User
- percentage (watting)
- room

## GameRoom extends Room
- size
- winStr
- winLine
- turnIndex
- checkList
- `checked`

## GameUser extends User
- winCount (gaming)
- room