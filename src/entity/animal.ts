import { AnimalState } from "../enum/animalState";
import { Layer } from "../enum/grid";
import { Cell } from "../grid/cell";
import { Color } from "../models/color";
import {Hunger, Need, Needs, Sleep, Thirst } from "./animal/needs";
import { Entity, EntityOptions } from "./entity";

export abstract class Animal extends Entity {
    private hunger: number = 0;
    private thirst: number = 0;
    private age: number = 0;
    private tiredness: number = 0;

    private needs: Needs | undefined;

    protected abstract lifeExpectancy: number;
    protected abstract hungerRate: number;
    protected abstract thirstRate: number;
    protected abstract baseSpeed: number;
    protected abstract speed: number;
    protected abstract tirednessRate: number;
    protected abstract restRecoveryRate: number;
    protected state: AnimalState;

    constructor(options: EntityOptions, cell: Cell) {
        super(options, cell);
        this.state = AnimalState.WANDER;
    }

    private intiializeNeeds(needFuncs: (() => Need)[] = []) {
        this.needs = new Needs(this, [
            new Hunger(this, this.hungerRate),
            new Thirst(this, this.thirstRate),
            new Sleep(this, this.tirednessRate, this.restRecoveryRate),
            ...needFuncs.map((func) => func()),
        ]);
    }

    public getNeeds(): Needs {
        if(this.needs === undefined) {
            throw new Error("Animal needs have not yet been initialized, and are undefined");
        }

        return this.needs;
    }

    private processNeeds() {
        this.getNeeds().processNeeds();
    }
}

// export interface AnimalOptions extends EntityOptions {
//     hungerRate: number;
//     thirstRate: number;
//     tirednessRate: number;
//     restRecoveryRate: number;
// }