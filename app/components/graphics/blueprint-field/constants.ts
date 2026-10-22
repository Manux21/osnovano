import { ISO } from '~/utils/axonometry'

const SIZE = 620

export const FIELD_VIEW_BOX = '-560 -360 1120 700'

export const FIELD_OUTLINE = ISO.platePath(SIZE, SIZE, 0)

export const FIELD_GRID = ISO.gridPaths(SIZE, SIZE, 0, 10)

export const FIELD_DOTS = ISO.dotsPath(SIZE * 0.9, SIZE * 0.9, 0, 12)

export const FIELD_VOLUMES = [
    ISO.volumePath({ x: -250, y: 0, z: -210 }, { x: -160, y: 74, z: -120 }),
    ISO.volumePath({ x: -40, y: 0, z: -280 }, { x: 60, y: 108, z: -190 }),
    ISO.volumePath({ x: 170, y: 0, z: -230 }, { x: 260, y: 58, z: -140 }),
]
