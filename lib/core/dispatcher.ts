import { NotImplementedError, PlatformFeatureMissingError, TimeoutError } from "./error"
import { Json, RequestId, EventMap } from "./types"
import ReplyHandler from "./replyhandler"
import { getPlatform } from "./util"
import { slug } from 'cuid'
import { ReplyFromNative } from "./receiver"

export interface RequestToNative {
  id: RequestId
  name: string
  data: Json
}

export class Dispatcher {
  constructor(private events: EventMap) {
  }

  dispatch<R extends Json>(name: string, data?: Json, timeout?: number): Promise<R> {
    const id: RequestId = slug()

    const request = JSON.stringify({
      id,
      name,
      data: data ?? {},
    } as RequestToNative)

    switch (getPlatform()) {
      case 'Android':
        if (!Android) {
          throw new PlatformFeatureMissingError('Android JS Host')
        }

        if (!Android[name] && !Android.dispatch) {
          throw new NotImplementedError('Android.dispatch')
        }

        const maybeReply = Android[name]
          ? Android[name](request)
          : Android.dispatch(request)

        if (maybeReply) {
          const reply = JSON.parse(maybeReply) as ReplyFromNative
          return reply.error
            ? Promise.reject(reply.error)
            : Promise.resolve(reply.result as R)
        }

      case 'iOS':
        if (!window.webkit) {
          throw new PlatformFeatureMissingError('iOS WebKit')
        }

        if (!window.webkit.messageHandlers[name] && !window.webkit.messageHandlers.dispatcher) {
          throw new NotImplementedError('window.webkit.messageHandlers.dispatcher')
        }

        const messageHandler = window.webkit.messageHandlers[name]
          ?? window.webkit.messageHandlers.dispatcher
        messageHandler.postMessage(request)
    }

    const replyHandler = new ReplyHandler<Json>()
    this.events.set(id, replyHandler)
  
    if (timeout) {
      setTimeout(() => {
        this.events.delete(id)
        replyHandler.reject(new TimeoutError(name, id))
      }, timeout)
    }
  
    return replyHandler.promise as Promise<R>
  }
}

