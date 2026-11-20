/**
 * Per-tier signature palette for the reasoning-effort slider. Each stop on the
 * track owns a hue sampled from a fixed ice→teal→sky→blue→violet→magenta ramp,
 * so every effort level reads as its own "power stage" rather than one uniform
 * blue. Colors are interpolated by normalized position so any provider's effort
 * list (off/low/high/max, low/medium/high/xhigh/max, …) gets distinct tiers.
 * @module dsh-model-switcher/client/tiers
 */

/** Ramp stops: normalized position → hex hue. */
const STOPS: readonly (readonly [number, string])[] = [
  [0, '#8A93A3'],
  [0.25, '#2DD4A7'],
  [0.5, '#38BDF8'],
  [0.7, '#5B8CFF'],
  [0.85, '#8B5BFF'],
  [1, '#FF5B8C'],
]

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  const c = ca.map((v, i) => Math.round(v + ((cb[i] ?? v) - v) * t))
  return `#${c.map(v => v.toString(16).padStart(2, '0')).join('')}`
}

/** Signature hue of a normalized tier position (0..1). */
export function tierColor(t: number): string {
  const x = Math.max(0, Math.min(1, t))
  for (let i = 1; i < STOPS.length; i++) {
    const prev = STOPS[i - 1]
    const next = STOPS[i]
    if (prev === undefined || next === undefined) continue
    const [pa, ca] = prev
    const [pb, cb] = next
    if (x <= pb) return mix(ca, cb, pb === pa ? 0 : (x - pa) / (pb - pa))
  }
  const last = STOPS[STOPS.length - 1]
  return last === undefined ? '#5B8CFF' : last[1]
}

/** rgba() form of a hex hue at the given alpha. */
export function tierAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Lightened ink for text on dark surfaces. */
export function tierInk(hex: string): string {
  return mix(hex, '#FFFFFF', 0.55)
}

/** Mid hue between the ice fill start and the tier hue, for the fill ramp. */
export function tierMid(hex: string): string {
  return mix('#A9C4FF', hex, 0.5)
}

/** Landing-burst scale: higher tiers burst wider (Off dissipates, Max erupts). */
export function tierBurst(t: number): number {
  return 0.7 + Math.max(0, Math.min(1, t)) * 1.1
}