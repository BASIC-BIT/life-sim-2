import { Layer } from "../enum/grid";
import { Cell } from "../grid/cell";
import { Color } from "../models/color";
import { Position } from "../models/coords";
import { Trait, Traits, TraitType } from "./animal/traits";

export abstract class Entity {
    public options: EntityOptions;
    public cell: Cell;
    protected traits: Traits;

    protected constructor(options: EntityOptions, cell: Cell, traits?: Traits) {
        this.options = options;
        this.cell = cell;
        this.traits = traits ?? new Traits();
    }

    public getTraits(): Traits {
        return this.traits;
    }
}

export interface EntityOptions {
    layer: Layer;
    color: Color;
    type: string;
}