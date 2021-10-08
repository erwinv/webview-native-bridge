import { Dispatcher } from "../core/dispatcher"

export default class NativeAPI {
  static async getUser() {
    type User = {
      level: 'guest' | 'user' | 'customer'
      uid?: string
      customer_id?: string
    }
    return NativeAPI.dispatcher.dispatch<User>('getUser')
  }

  private static dispatcher: Dispatcher
  static setDispatcher(dispatcher: Dispatcher) {
    NativeAPI.dispatcher = dispatcher
  }
}
