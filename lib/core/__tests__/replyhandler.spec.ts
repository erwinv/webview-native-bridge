import _ from 'lodash'
import ReplyHandler from "../replyhandler"

async function isPending<T>(p: Promise<T>) {
  const s = Symbol('pending')
  return Promise.race([p, Promise.resolve(s)])
    .then(r => r === s)
    .catch(() => false)
}

let replyHandler = new ReplyHandler<boolean>()

test('replyHandler.promise is pending initially', async () => {
  expect(await isPending(replyHandler.promise)).toBe(true)
})

test('replyHandler.promise resolves when replyHandler.resolve is called', async () => {
  const resolutionValue = _.sample([true, false]) as boolean
  replyHandler.resolve(resolutionValue)

  await expect(replyHandler.promise).resolves.toBe(resolutionValue)
})

test('replyHandler.promise rejects when replyHandler.reject is called', async () => {
  replyHandler = new ReplyHandler()
  const rejectionReason = new Error('A series of unfortunate events')
  replyHandler.reject(rejectionReason)

  await expect(replyHandler.promise).rejects.toEqual(rejectionReason)
})
