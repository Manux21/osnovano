import type { TAxonTowerModule } from './types'

type TPoint3 = { x: number; y: number; z: number }

const round = (value: number) => Math.round(value * 100) / 100

// A strict architectural axonometry. Every edge keeps the same direction on
// every level so the construction remains precise and optically stable.
function project(point: TPoint3) {
    const rise = 0.285

    return {
        x: round(point.x - point.z),
        y: round((point.x + point.z) * rise - point.y * 0.96),
    }
}

function path(points: TPoint3[], closed = false) {
    const commands = points.map((point, index) => {
        const projected = project(point)
        return `${index === 0 ? 'M' : 'L'}${projected.x} ${projected.y}`
    })

    return `${commands.join(' ')}${closed ? ' Z' : ''}`
}

function segment(from: TPoint3, to: TPoint3) {
    return path([from, to])
}

function corners(width: number, depth: number, y: number): TPoint3[] {
    return [
        { x: -width / 2, y, z: -depth / 2 },
        { x: width / 2, y, z: -depth / 2 },
        { x: width / 2, y, z: depth / 2 },
        { x: -width / 2, y, z: depth / 2 },
    ]
}

function plate(width: number, depth: number, y: number) {
    return path(corners(width, depth, y), true)
}

function box(width: number, depth: number, height: number, y: number) {
    const bottom = corners(width, depth, y)
    const top = corners(width, depth, y + height)

    return [
        path(bottom, true),
        path(top, true),
        ...top.map((corner, index) => segment(corner, bottom[index]!)),
    ].join(' ')
}

function grid(width: number, depth: number, y: number, steps: number) {
    const lines: string[] = []

    for (let step = 1; step < steps; step += 1) {
        const ratio = step / steps
        lines.push(
            segment(
                { x: -width / 2 + width * ratio, y, z: -depth / 2 },
                { x: -width / 2 + width * ratio, y, z: depth / 2 },
            ),
            segment(
                { x: -width / 2, y, z: -depth / 2 + depth * ratio },
                { x: width / 2, y, z: -depth / 2 + depth * ratio },
            ),
        )
    }

    return lines.join(' ')
}

function ticks(width: number, depth: number, y: number, size: number) {
    return corners(width, depth, y).map((corner) => {
        const point = project(corner)
        return `M${point.x - size} ${point.y}h${size * 2}M${point.x} ${point.y - size}v${size * 2}`
    }).join(' ')
}

const BASE_WIDTH = 880
const BASE_DEPTH = 440

export const BAND_VIEW_BOX = '-760 -850 1520 1120'
export const BAND_BASE = box(BASE_WIDTH, BASE_DEPTH, 34, -28)
export const BAND_BASE_GRID = grid(BASE_WIDTH, BASE_DEPTH, 6, 10)
export const BAND_BASE_TICKS = ticks(BASE_WIDTH, BASE_DEPTH, -28, 8)
export const BAND_AXIS = segment({ x: 0, y: -42, z: 0 }, { x: 0, y: 838, z: 0 })

const MODULES = [
    { id: 'plinth', x: 0, z: 0, y: 22, width: 650, depth: 350, height: 98, steps: 5 },
    { id: 'core', x: -16, z: 8, y: 122, width: 330, depth: 260, height: 190, steps: 3, inner: true },
    { id: 'cantilever', x: 28, z: -8, y: 306, width: 650, depth: 300, height: 68, steps: 5 },
    { id: 'middle', x: -42, z: 14, y: 360, width: 500, depth: 315, height: 174, steps: 4, inner: true },
    { id: 'upper', x: 30, z: -10, y: 522, width: 465, depth: 290, height: 156, steps: 4 },
    { id: 'crown', x: 10, z: -5, y: 666, width: 340, depth: 245, height: 132, steps: 3, inner: true },
]

export const BAND_MODULES: TAxonTowerModule[] = MODULES.map((module) => {
    const offset = project({ x: module.x, y: 0, z: module.z })
    const sectionY = module.y + module.height * 0.48

    return {
        id: module.id,
        offsetX: offset.x,
        offsetY: offset.y,
        volume: box(module.width, module.depth, module.height, module.y),
        grid: grid(module.width, module.depth, module.y + module.height, module.steps),
        inner: module.inner
            ? box(
                module.width * 0.64,
                module.depth * 0.58,
                module.height * 0.76,
                module.y + module.height * 0.12,
            )
            : undefined,
        section: module.id === 'core' || module.id === 'middle'
            ? plate(module.width, module.depth, sectionY)
            : undefined,
    }
})
