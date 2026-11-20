/**
 * Guard: the built client bundle's module-loader id must equal package.json
 * `name` (dsh resolves the client bundle by package name), and the host half
 * must export the same plugin name. Run after `build`, before `publish`.
 *
 *   node scripts/check-bundle-id.mjs
 */
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const name = pkg.name

const client = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const banner = client.match(/__ModuleLoader__\.load\(\{\s*id:\s*[`"']([^`"']+)[`"']/)
if (!banner) {
  console.error('check-bundle-id: no __ModuleLoader__.load({ id: ... }) banner found in lib/client.js')
  process.exit(1)
}
if (banner[1] !== name) {
  console.error(`check-bundle-id: client bundle id "${banner[1]}" != package name "${name}" (fix tsdown.config.ts ID)`)
  process.exit(1)
}

const host = readFileSync(new URL('../lib/index.js', import.meta.url), 'utf8')
if (!host.includes(name)) {
  console.error(`check-bundle-id: host lib/index.js does not reference plugin name "${name}"`)
  process.exit(1)
}

console.log(`check-bundle-id: OK — client bundle id and host name both "${name}"`)