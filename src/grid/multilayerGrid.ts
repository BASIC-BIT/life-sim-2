import { Layer } from "../enum/grid";
import { Grid } from "./grid";

export class MultilayerGrid {
    public waterLayer: WaterLayer;
    public airLayer: AirLayer;
    public surfaceLayer: SurfaceLayer;
    public groundLayer: GroundLayer;
    public overlayLayer: OverlayLayer;
    public terrainLayer: TerrainLayer;

    public layers: GridLayer[];

    constructor(size: Size) {
        this.waterLayer = new WaterLayer(size);
        this.airLayer = new AirLayer(size);
        this.surfaceLayer = new SurfaceLayer(size);
        this.groundLayer = new GroundLayer(size);
        this.overlayLayer = new OverlayLayer(size);
        this.terrainLayer = new TerrainLayer(size);

        this.layers = [
            this.waterLayer,
            this.airLayer,
            this.surfaceLayer,
            this.groundLayer,
            this.overlayLayer,
            this.terrainLayer,
        ];
    }
}

export class GridLayer {
    private options: GridLayerOptions;
    private size: Size;

    protected constructor(options: GridLayerOptions, size: Size) {
        this.options = options;
        this.size = size;
    }
}

export interface GridLayerOptions {
    name: string;
    passable: Passability;
    layer: Layer;
    size: Size,
    zLevel: number,
}

export interface Passability {
    AIR: boolean,
    ALWAYS: boolean,
    LAND: boolean,
    UNDERGROUND: boolean,
    WATER: boolean
}

export interface Size {
    x: number;
    y: number;
}

export class SurfaceLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Surface",
            passable: {
                AIR: true,
                ALWAYS: false,
                LAND: true,
                UNDERGROUND: false,
                WATER: false,
            },
            layer: Layer.SURFACE,
            size,
            zLevel: 5,
        }, size);
    }
}

export class WaterLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Water",
            passable: {
                AIR: false,
                ALWAYS: false,
                LAND: false,
                UNDERGROUND: true,
                WATER: true,
            },
            layer: Layer.WATER,
            size,
            zLevel: 3,
        }, size);
    }
}

export class AirLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Air",
            passable: {
                AIR: true,
                ALWAYS: false,
                LAND: false,
                UNDERGROUND: false,
                WATER: false,
            },
            layer: Layer.AIR,
            size,
            zLevel: 100,
        }, size);
    }
}

export class GroundLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Ground",
            passable: {
                AIR: false,
                ALWAYS: false,
                LAND: false,
                UNDERGROUND: true,
                WATER: false,
            },
            layer: Layer.GROUND,
            size,
            zLevel: 4,
        }, size);
    }
}

export class OverlayLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Ground",
            passable: {
                AIR: true,
                ALWAYS: true,
                LAND: true,
                UNDERGROUND: true,
                WATER: true,
            },
            layer: Layer.OVERLAY,
            size,
            zLevel: 10000,
        }, size);
    }
}

export class TerrainLayer extends GridLayer {
    constructor(size: Size) {
        super({
            name: "Terrain",
            passable: {
                AIR: false,
                ALWAYS: false,
                LAND: false,
                UNDERGROUND: false,
                WATER: false,
            },
            layer: Layer.TERRAIN,
            size,
            zLevel: 1,
        }, size);
    }
}