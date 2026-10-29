import { readdir, readFile } from 'node:fs/promises'
import { resolve, relative, join, sep } from 'node:path'
import { createHash } from 'node:crypto'

const root = process.cwd()
const hosting = JSON.parse(await readFile(join(root, 'firebase.json'), 'utf8')).hosting
if (hosting.public !== 'build') throw new Error('Firebase must serve the verified build directory')
if (!hosting.rewrites?.some(rule => rule.source === '**' && rule.destination === '/index.html')) {
    throw new Error('Missing Firebase SPA rewrite')
}

async function files(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    return (await Promise.all(entries.map(entry => {
        const path = join(directory, entry.name)
        return entry.isDirectory() ? files(path) : [path]
    }))).flat()
}

const publicDirectory = join(root, 'public')
const buildDirectory = join(root, 'build')
const publicFiles = await files(publicDirectory)
const digest = buffer => createHash('sha256').update(buffer).digest('hex')
for (const path of publicFiles) {
    const output = join(buildDirectory, relative(publicDirectory, path))
    if (digest(await readFile(path)) !== digest(await readFile(output))) {
        throw new Error(`Built asset does not match source: ${relative(root, path)}`)
    }
}

const html = await readFile(join(buildDirectory, 'index.html'), 'utf8')
if (html.includes('/src/') || html.includes('%PUBLIC_URL%')) throw new Error('Unbuilt entry point in production HTML')
const assetUrls = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(match => match[1])
if (!assetUrls.some(url => url.endsWith('.js')) || !assetUrls.some(url => url.endsWith('.css'))) {
    throw new Error('Production HTML must reference built JavaScript and CSS')
}
for (const url of assetUrls) {
    const path = resolve(buildDirectory, `.${url}`)
    if (!path.startsWith(`${buildDirectory}${sep}`)) throw new Error('Asset path escaped the build directory')
    await readFile(path)
}
console.log(`Verified ${publicFiles.length} public assets, ${assetUrls.length} bundled references, and Firebase Hosting settings`)
