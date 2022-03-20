import { Layer } from "../enum/grid";
import { Color } from "../models/color";
import { Entity, EntityOptions } from "./entity";

export abstract class Animal extends Entity {
    private hunger: number = 0;
    private thirst: number = 0;

    protected abstract hungerRate: number;
    protected abstract thirstRate: number;

    constructor(options: EntityOptions) {
        super(options);
    }

    private processNeeds() {
        this.hunger += this.hungerRate;
        this.thirst += this.thirstRate;
    }

    public drink(water: number) {
        this.thirst = Math.max(this.thirst - water, 0);
    }

    public eat(food: number) {
        this.hunger = Math.max(this.hunger - food, 0);
    }
}