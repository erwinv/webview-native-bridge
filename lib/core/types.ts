import ReplyHandler from "./replyhandler"
import { slug } from 'cuid'

export type Nullable<T> = T extends null | undefined ? T : T | null | undefined
export type JsonPrimitive = string | number | boolean | null
export type Json = {
  [property: string]: JsonPrimitive | Json
} | JsonPrimitive

export type RequestId = ReturnType<typeof slug>
export type EventMap = Map<RequestId, ReplyHandler<Json>>

type Tuple<T=any> = readonly T[]

type AndroidJSHost = {
  [method: string]: <Args extends Tuple<string>>(...args: Args) => void | string
}

interface WebKitMessageHandler {
  postMessage(message: string): void
}

interface WebKit {
  messageHandlers: Record<string, WebKitMessageHandler>
}

declare global {
  var Android: Nullable<AndroidJSHost>
  interface Window {
    webkit: Nullable<WebKit>
  }
  function jsReceive(message: string): void
}
