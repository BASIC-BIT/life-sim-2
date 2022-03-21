import { Layer } from "../enum/grid";
import { Cell } from "../grid/cell";
import { Color } from "../models/color";
import { Position } from "../models/coords";
import { Trait, TraitType } from "./animal/traits";

export abstract class Entity {
    public options: EntityOptions;
    public cell: Cell;
    private traits: { [TraitType]: Trait };

    protected constructor(options: EntityOptions, cell: Cell) {
        this.options = options;
        this.cell = cell;
    }
}

export interface EntityOptions {
    layer: Layer;
    color: Color;
    type: string;
}