import { init } from './core'
import NativeAPI from './api'

const [dispatcher, receiver] = init()
NativeAPI.setDispatcher(dispatcher)

function jsReceive(message: string) {
  receiver.receive(message)
}
