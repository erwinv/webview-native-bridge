export class PlatformUnsupportedError extends Error {
  constructor(public userAgent: string) {
    super(`Platform unsupported: ${userAgent}`)
  }
}

export class PlatformFeatureMissingError extends Error {
  constructor(public featureName: string) {
    super(`Platform feature missing: ${featureName}`)
  }
}

export class NotImplementedError extends Error {
  constructor(public interfaceName: string) {
    super(`Not implemented: ${interfaceName}`)
  }
}

export class TimeoutError extends Error {
  constructor(public requestName: string, public requestId: string) {
    super(`Request timed out: name(${requestName}), id(${requestId})`)
  }
}
