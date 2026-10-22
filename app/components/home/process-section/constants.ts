import type { TAxonGlyph, TAxonSurface } from '~/components/graphics/axon-glyph/types'
import { AXON_DOTS, AXON_SITE, AXON_TICKS } from '~/constants/axon-drawing'
import type { TPoint3 } from '~/types/axonometry'
import { ISO } from '~/utils/axonometry'

const surface = (points: TPoint3[], tone: TAxonSurface['tone'] = 'top'): TAxonSurface => ({
    path: ISO.toPath(points, true), tone,
})
const detail = (points: TPoint3[]): TAxonSurface => ({ path: ISO.toPath(points), tone: 'detail' })

// Only the three visible faces. Opaque surfaces hide the dot grid underneath.
function volume(from: TPoint3, to: TPoint3): TAxonSurface[] {
    return [
        surface([
            { x: from.x, y: from.y, z: to.z }, { x: to.x, y: from.y, z: to.z },
            { x: to.x, y: to.y, z: to.z }, { x: from.x, y: to.y, z: to.z },
        ], 'front'),
        surface([
            { x: to.x, y: from.y, z: to.z }, { x: to.x, y: from.y, z: from.z },
            { x: to.x, y: to.y, z: from.z }, { x: to.x, y: to.y, z: to.z },
        ], 'side'),
        surface([
            { x: from.x, y: to.y, z: from.z }, { x: to.x, y: to.y, z: from.z },
            { x: to.x, y: to.y, z: to.z }, { x: from.x, y: to.y, z: to.z },
        ]),
    ]
}

const site = { site: AXON_SITE, dots: AXON_DOTS, ticks: AXON_TICKS }

export const PROCESS_GLYPHS: TAxonGlyph[] = [
    {
        ...site,
        // Site survey: a plot plan and a magnifying glass, not an empty grid.
        surfaces: [
            surface([
                { x: -25, y: 2, z: -22 }, { x: 25, y: 2, z: -22 },
                { x: 25, y: 2, z: 22 }, { x: -25, y: 2, z: 22 },
            ]),
            // A conventional circular lens and a solid handle, drawn as one object.
            // Keep the plot clean underneath so no contour can read as a second handle.
            { path: 'M6.1 3 L8 1.1 L15.4 8.5 Q16.4 9.5 15.4 10.5 Q14.4 11.5 13.4 10.5 Z', tone: 'side' },
            { path: 'M10 -5 A10 10 0 1 0 -10 -5 A10 10 0 1 0 10 -5 Z', tone: 'top' },
        ],
    },
    {
        ...site,
        // Concept: one legible architectural mass, with no hidden back edges.
        surfaces: volume({ x: -22, y: 0, z: -20 }, { x: 22, y: 28, z: 20 }),
    },
    {
        ...site,
        // Project: a folded drawing sheet with a simple floor plan.
        surfaces: [
            surface([
                { x: -27, y: 3, z: -23 }, { x: 18, y: 3, z: -23 },
                { x: 27, y: 3, z: -14 }, { x: 27, y: 3, z: 23 },
                { x: -27, y: 3, z: 23 },
            ]),
            surface([
                { x: 18, y: 3, z: -23 }, { x: 18, y: 3, z: -14 },
                { x: 27, y: 3, z: -14 },
            ], 'side'),
            detail([
                { x: 5, y: 3, z: 15 }, { x: 18, y: 3, z: 15 },
                { x: 18, y: 3, z: -12 }, { x: -18, y: 3, z: -12 },
                { x: -18, y: 3, z: 15 }, { x: -3, y: 3, z: 15 },
            ]),
            detail([{ x: 0, y: 3, z: -12 }, { x: 0, y: 3, z: 4 }]),
            detail([{ x: 0, y: 3, z: 0 }, { x: 18, y: 3, z: 0 }]),
        ],
    },
    {
        ...site,
        // Realisation: a finished pavilion, not several overlapping cages.
        surfaces: [
            ...volume({ x: -28, y: -2, z: -22 }, { x: 28, y: 1, z: 22 }),
            ...volume({ x: -23, y: 1, z: -17 }, { x: 23, y: 25, z: 17 }),
            detail([{ x: 0, y: 1, z: 17 }, { x: 0, y: 25, z: 17 }]),
            ...volume({ x: -28, y: 25, z: -22 }, { x: 28, y: 28, z: 22 }),
        ],
    },
]
