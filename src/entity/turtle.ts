import { Layer } from "../enum/grid";
import { Cell } from "../grid/cell";
import { Color } from "../models/color";
import { Animal } from "./animal";

export class Turtle extends Animal {
    protected restRecoveryRate: number = 5;
    protected lifeExpectancy: number = 100;
    protected speed: number = 1;
    protected tirednessRate: number = 1;
    protected baseSpeed: number = 1;
    protected hungerRate: number = 1;
    protected thirstRate: number = 1;

    constructor(cell: Cell) {
        super({
            layer: Layer.SURFACE,
            color: new Color(60, 150, 60, 255),
            type: "Turtle",
        }, cell);
    }
}