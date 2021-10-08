import { PlatformUnsupportedError } from "./error"

type MobilePlatform = 'iOS' | 'Android'

export function getPlatform(): MobilePlatform {
  const ua = window.navigator.userAgent

  if (/[Aa]ndroid/.test(ua)) {
    return 'Android'
  }
  if (/iOS|iPhone|iPad/.test(ua)) {
    return 'iOS'
  }

  throw new PlatformUnsupportedError(ua)
}