// DOM animation keeps the flap leaves independent of the 3D render loop.
export function animateDepartures(board) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const rows = [...board.querySelectorAll('.flight')]
    const cells = [...board.querySelectorAll('.flap')]
    const running = new Set()
    const animations = new Set()
    const timers = new Map()
    let stopped = false
    let arriving = true

    function half(character, side) {
        const element = document.createElement('span')
        element.className = `flap-half ${side}`
        const glyph = document.createElement('span')
        glyph.className = 'flap-glyph'
        glyph.textContent = character === ' ' ? '\u00a0' : character
        element.append(glyph)
        return element
    }

    function settle(cell, character) {
        cell.replaceChildren(half(character, 'upper'), half(character, 'lower'))
        cell.dataset.character = character
    }

    const canAnimate = () => !stopped && !document.hidden && !reducedMotion.matches && typeof Element.prototype.animate === 'function'
    function delay(milliseconds) {
        return new Promise(resolve => {
            const timer = setTimeout(() => { timers.delete(timer); resolve() }, milliseconds)
            timers.set(timer, resolve)
        })
    }

    async function flip(cell, next, duration) {
        if (!canAnimate()) return
        const previous = cell.dataset.character
        const upper = half(previous, 'upper')
        const lower = half(next, 'lower')
        upper.classList.add('flap-leaf')
        lower.classList.add('flap-leaf')
        cell.replaceChildren(half(next, 'upper'), half(previous, 'lower'), upper, lower)
        const falling = upper.animate([{ transform: 'rotateX(0deg)' }, { transform: 'rotateX(-90deg)' }], { duration: duration / 2, easing: 'ease-in', fill: 'forwards' })
        const landing = lower.animate([{ transform: 'rotateX(90deg)' }, { transform: 'rotateX(0deg)' }], { duration: duration / 2, delay: duration / 2, easing: 'ease-out', fill: 'both' })
        animations.add(falling)
        animations.add(landing)
        await Promise.all([falling.finished.catch(() => {}), landing.finished.catch(() => {})])
        animations.delete(falling)
        animations.delete(landing)
        if (!stopped) settle(cell, next)
    }

    async function rollField(field, refresh) {
        await Promise.all([...field.querySelectorAll('.flap')].map(async (cell, index) => {
            const target = cell.dataset.final
            if (!canAnimate() || target === ' ') return
            await delay(index * 45)
            if (!canAnimate()) return
            const targetIndex = alphabet.indexOf(target)
            if (!refresh) settle(cell, ' ')
            for (let step = refresh ? 3 : 4 + index % 3; step >= 0; step -= 1) {
                if (!canAnimate()) break
                await flip(cell, alphabet[(targetIndex - step + alphabet.length) % alphabet.length], refresh ? 200 : 210)
            }
            if (!stopped) settle(cell, target)
        }))
    }

    async function animateRow(row, refresh = false) {
        if (running.has(row) || !canAnimate()) return
        running.add(row)
        await Promise.all([...row.querySelectorAll(refresh ? '.code,.gate,.status' : '.code,.destination,.gate,.status')].map(field => rollField(field, refresh)))
        running.delete(row)
    }

    function stop() {
        stopped = true
        for (const [timer, resolve] of timers) { clearTimeout(timer); resolve() }
        timers.clear()
        animations.forEach(animation => animation.cancel())
        animations.clear()
        cells.forEach(cell => settle(cell, cell.dataset.final))
    }
    const onVisibility = () => { if (document.hidden) stop() }
    const onMotion = () => { if (reducedMotion.matches) stop() }
    const refresh = event => { if (!arriving) void animateRow(event.currentTarget, true) }
    rows.forEach(row => {
        row.addEventListener('pointerenter', refresh)
        row.addEventListener('focus', refresh)
    })
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotion)

    void Promise.all(rows.map(async (row, index) => {
        if (!canAnimate()) return
        await delay(index * 420)
        await animateRow(row)
    })).then(() => { arriving = false })

    return () => {
        stop()
        rows.forEach(row => {
            row.removeEventListener('pointerenter', refresh)
            row.removeEventListener('focus', refresh)
        })
        document.removeEventListener('visibilitychange', onVisibility)
        reducedMotion.removeEventListener('change', onMotion)
    }
}
