import { RequestId, EventMap, Nullable, Json } from "./types"

export interface ReplyFromNative {
  replyTo: RequestId
  result: Json
  error: Nullable<Json>
}

export class Receiver {
  constructor(private events: EventMap) {
  }

  receive(message: string) {
    const {
      replyTo,
      result,
      error
    } = JSON.parse(message) as ReplyFromNative

    const replyHandler = this.events.get(replyTo)

    if (!replyHandler) {
      console.warn(`No registered reply handler for event: ${replyTo}`)
      return
    }

    this.events.delete(replyTo)

    if (error) {
      replyHandler.reject(error)
    } else {
      replyHandler.resolve(result)
    }
  }
}
