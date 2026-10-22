import type { TPoint3 } from '~/types/axonometry'
import { ISO } from '~/utils/axonometry'

export type TSceneTone = 'top' | 'front' | 'side' | 'detail'
export type TSceneLayer = { path: string; tone: TSceneTone }
export type TScenePart = { id: string; offset: [number, number]; layers: TSceneLayer[] }

const polygon = (points: TPoint3[], tone: TSceneTone = 'front'): TSceneLayer => ({
    path: ISO.toPath(points, true), tone,
})
const line = (from: TPoint3, to: TPoint3): TSceneLayer => ({
    path: ISO.segmentPath(from, to), tone: 'detail',
})

// Visible, opaque faces keep hidden edges out of the assembled drawing.
function block(from: TPoint3, to: TPoint3): TSceneLayer[] {
    return [
        polygon([
            { x: from.x, y: from.y, z: to.z }, { x: to.x, y: from.y, z: to.z },
            { x: to.x, y: to.y, z: to.z }, { x: from.x, y: to.y, z: to.z },
        ]),
        polygon([
            { x: to.x, y: from.y, z: to.z }, { x: to.x, y: from.y, z: from.z },
            { x: to.x, y: to.y, z: from.z }, { x: to.x, y: to.y, z: to.z },
        ], 'side'),
        polygon([
            { x: from.x, y: to.y, z: from.z }, { x: to.x, y: to.y, z: from.z },
            { x: to.x, y: to.y, z: to.z }, { x: from.x, y: to.y, z: to.z },
        ], 'top'),
    ]
}

export const SERVICE_SCENES: Record<string, TScenePart[]> = {
    architecture: [
        { id: 'foundation', offset: [0, 7], layers: block({ x: -37, y: -3, z: -24 }, { x: 37, y: 0, z: 24 }) },
        { id: 'facades', offset: [-5, -1], layers: [
            ...block({ x: -30, y: 0, z: -17 }, { x: 30, y: 27, z: 17 }),
            ...[-10, 10].map((x) => line({ x, y: 0, z: 17 }, { x, y: 27, z: 17 })),
            line({ x: 30, y: 0, z: 0 }, { x: 30, y: 27, z: 0 }),
        ] },
        { id: 'roof', offset: [0, -13], layers: block({ x: -35, y: 27, z: -22 }, { x: 35, y: 30, z: 22 }) },
        { id: 'upper-volume', offset: [6, -22], layers: block({ x: 5, y: 30, z: -16 }, { x: 25, y: 37, z: -1 }) },
    ],
    interior: [
        { id: 'right-wall', offset: [10, -3], layers: [
            // The opening is part of the wall silhouette, not a line drawn over it.
            polygon([
                { x: -28, y: 0, z: -25 }, { x: 8, y: 0, z: -25 },
                { x: 8, y: 24, z: -25 }, { x: 19, y: 24, z: -25 },
                { x: 19, y: 0, z: -25 }, { x: 28, y: 0, z: -25 },
                { x: 28, y: 31, z: -25 }, { x: -28, y: 31, z: -25 },
            ]),
            polygon([
                { x: -28, y: 31, z: -27 }, { x: 28, y: 31, z: -27 },
                { x: 28, y: 31, z: -25 }, { x: -28, y: 31, z: -25 },
            ], 'top'),
            polygon([
                { x: 28, y: 0, z: -27 }, { x: 28, y: 31, z: -27 },
                { x: 28, y: 31, z: -25 }, { x: 28, y: 0, z: -25 },
            ], 'side'),
        ] },
        { id: 'left-wall', offset: [-10, -3], layers: [
            ...block({ x: -30, y: 0, z: -27 }, { x: -28, y: 31, z: 25 }),
            polygon([
                { x: -28, y: 11, z: -11 }, { x: -28, y: 25, z: -11 },
                { x: -28, y: 25, z: 11 }, { x: -28, y: 11, z: 11 },
            ], 'top'),
        ] },
    ],
    commercial: [
        { id: 'partition', offset: [10, -4], layers: [
            polygon([
                { x: -27, y: 0, z: -23 }, { x: 28, y: 0, z: -23 },
                { x: 28, y: 31, z: -23 }, { x: -27, y: 31, z: -23 },
            ]),
            ...[-9, 10].map((x) => line({ x, y: 0, z: -23 }, { x, y: 31, z: -23 })),
        ] },
        { id: 'canopy', offset: [0, -14], layers: [
            ...[-18, 18].map((x) => line({ x, y: 29, z: -14 }, { x, y: 43, z: -14 })),
            ...block({ x: -29, y: 26, z: -20 }, { x: 29, y: 28, z: -7 }),
        ] },
        { id: 'counter', offset: [-7, 6], layers: block({ x: -26, y: 0, z: 10 }, { x: 24, y: 12, z: 23 }) },
    ],
}
