import type { TAxonometryOptions, TPoint2, TPoint3 } from '~/types/axonometry'

const ISO_ANGLE = Math.PI / 6
const ISO_COS = Math.cos(ISO_ANGLE)
const ISO_SIN = Math.sin(ISO_ANGLE)
const DOT_LENGTH = 0.01
const PRECISION = 100

function round(value: number): number {
    return Math.round(value * PRECISION) / PRECISION
}

export function createAxonometry(options: TAxonometryOptions = {}) {
    const {
        xRun = ISO_COS,
        xRise = ISO_SIN,
        zRun = ISO_COS,
        zRise = ISO_SIN,
        lift = 1,
    } = options

    function project(point: TPoint3): TPoint2 {
        return {
            x: point.x * xRun - point.z * zRun,
            y: point.x * xRise + point.z * zRise - point.y * lift,
        }
    }

    function toPath(points: TPoint3[], closed = false): string {
        const commands = points.map((point, index) => {
            const { x, y } = project(point)

            return `${index === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`
        })

        return closed ? `${commands.join(' ')} Z` : commands.join(' ')
    }

    function segmentPath(from: TPoint3, to: TPoint3): string {
        return toPath([from, to])
    }

    function plateCorners(width: number, depth: number, y: number): TPoint3[] {
        const halfWidth = width / 2
        const halfDepth = depth / 2

        return [
            { x: -halfWidth, y, z: -halfDepth },
            { x: halfWidth, y, z: -halfDepth },
            { x: halfWidth, y, z: halfDepth },
            { x: -halfWidth, y, z: halfDepth },
        ]
    }

    function platePath(width: number, depth: number, y: number): string {
        return toPath(plateCorners(width, depth, y), true)
    }

    function volumeCorners(from: TPoint3, to: TPoint3, y: number): TPoint3[] {
        return [
            { x: from.x, y, z: from.z },
            { x: to.x, y, z: from.z },
            { x: to.x, y, z: to.z },
            { x: from.x, y, z: to.z },
        ]
    }

    function volumeFacePath(from: TPoint3, to: TPoint3): string {
        return toPath(volumeCorners(from, to, to.y), true)
    }

    function volumePath(from: TPoint3, to: TPoint3): string {
        const top = volumeCorners(from, to, to.y)
        const bottom = volumeCorners(from, to, from.y)
        const pillars = top.map((corner, index) => segmentPath(corner, bottom[index]!))

        return [toPath(top, true), toPath(bottom, true), ...pillars].join(' ')
    }

    function boxPath(width: number, depth: number, height: number, y: number): string {
        const halfWidth = width / 2
        const halfDepth = depth / 2

        return volumePath(
            { x: -halfWidth, y, z: -halfDepth },
            { x: halfWidth, y: y + height, z: halfDepth },
        )
    }

    function gridPaths(width: number, depth: number, y: number, steps: number): string[] {
        const halfWidth = width / 2
        const halfDepth = depth / 2
        const lines: string[] = []

        for (let step = 1; step < steps; step += 1) {
            const ratio = step / steps

            lines.push(
                segmentPath(
                    { x: -halfWidth + width * ratio, y, z: -halfDepth },
                    { x: -halfWidth + width * ratio, y, z: halfDepth },
                ),
                segmentPath(
                    { x: -halfWidth, y, z: -halfDepth + depth * ratio },
                    { x: halfWidth, y, z: -halfDepth + depth * ratio },
                ),
            )
        }

        return lines
    }

    function gridPath(width: number, depth: number, y: number, steps: number): string {
        return gridPaths(width, depth, y, steps).join(' ')
    }

    function columnsPath(
        width: number,
        depth: number,
        y: number,
        height: number,
        steps: number,
    ): string {
        const halfWidth = width / 2
        const halfDepth = depth / 2
        const pillars: string[] = []

        for (let column = 0; column <= steps; column += 1) {
            for (let row = 0; row <= steps; row += 1) {
                const x = -halfWidth + (width * column) / steps
                const z = -halfDepth + (depth * row) / steps

                pillars.push(segmentPath({ x, y, z }, { x, y: y + height, z }))
            }
        }

        return pillars.join(' ')
    }

    function cornerTicksPath(width: number, depth: number, y: number, size: number): string {
        return plateCorners(width, depth, y)
            .map((corner) => {
                const { x, y: projectedY } = project(corner)

                return `M${round(x - size)} ${round(projectedY)}h${size * 2}M${round(x)} ${round(projectedY - size)}v${size * 2}`
            })
            .join(' ')
    }

    function dotsPath(
        width: number,
        depth: number,
        y: number,
        columns: number,
        rows = columns,
    ): string {
        const halfWidth = width / 2
        const halfDepth = depth / 2
        const dots: string[] = []

        for (let column = 0; column <= columns; column += 1) {
            for (let row = 0; row <= rows; row += 1) {
                const { x, y: projectedY } = project({
                    x: -halfWidth + (width * column) / columns,
                    y,
                    z: -halfDepth + (depth * row) / rows,
                })

                dots.push(`M${round(x)} ${round(projectedY)}h${DOT_LENGTH}`)
            }
        }

        return dots.join(' ')
    }

    return {
        project,
        toPath,
        segmentPath,
        platePath,
        volumePath,
        volumeFacePath,
        boxPath,
        gridPath,
        gridPaths,
        columnsPath,
        cornerTicksPath,
        dotsPath,
    }
}

export const ISO = createAxonometry()

export const FLAT = createAxonometry({
    xRun: 1,
    xRise: 0.055,
    zRun: 0.95,
    zRise: 0.33,
    lift: 0.32,
})
