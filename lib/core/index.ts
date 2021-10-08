import { EventMap } from "./types"
import { Dispatcher } from "./dispatcher"
import { Receiver } from "./receiver"

export function init() {
  const events = new Map() as EventMap
  const dispatcher = new Dispatcher(events)
  const receiver = new Receiver(events)
  return [dispatcher, receiver] as const
}
