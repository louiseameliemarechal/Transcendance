import { ServerEvents } from "./ServerEvents"

export type ServerPayloads = {
  [ServerEvents.Pong]: any
}