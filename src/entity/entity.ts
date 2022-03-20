import { Layer } from "../enum/grid";
import { Color } from "../models/color";

export abstract class Entity {
    public options: EntityOptions;

    protected constructor(options: EntityOptions) {
        this.options = options;
    }
}

export interface EntityOptions {
    layer: Layer;
    color: Color;
    type: string;
}