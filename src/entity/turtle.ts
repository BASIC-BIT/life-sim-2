import { Layer } from "../enum/grid";
import { Color } from "../models/color";
import { Animal } from "./animal";

export class Turtle extends Animal {
    protected hungerRate: number = 1;
    protected thirstRate: number = 1;

    constructor() {
        super({
            layer: Layer.SURFACE,
            color: new Color(60, 150, 60, 255),
            type: "Turtle",
        });
    }

}