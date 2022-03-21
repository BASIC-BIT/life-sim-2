import { Cell } from "../../grid/cell";
import { Animal } from "../animal";
import { Entity } from "../entity";

export class Needs {
    public needs: Need[];
    private animal: Animal;

    constructor(entity: Animal, needs: Need[]) {
        this.animal = entity;
        this.needs = needs;
    }

    public processNeeds(): void {
        this.needs.forEach((need) => need.processTick(this.animal));
    }

}

export abstract class Need {
    protected passiveRate: number;
    private value: number = 0;
    protected entity: Entity;

    constructor(entity: Entity, passiveRate = 0) {
        this.entity = entity;
        this.passiveRate = passiveRate;
    }

    public getValue(): number {
        return this.value;
    }

    protected subtract(value: number): void {
        this.value = Math.max(this.value - value, 0);
    }

    protected add(value: number): void {
        this.value+= value;
    }

    public processTick(entity: Animal): void {
        this.add(this.passiveRate);

        this.processNeedForTick(entity);
    }

    private getPredictedValue(ticks: number): number {
        return this.value + ticks * this.passiveRate;
    }

    protected abstract processNeedForTick(entity: Animal): void;
}

export class Hunger extends Need {
    constructor(entity: Entity, hungerRate: number) {
        super(entity, hungerRate);
    }

    protected processNeedForTick(entity: Animal): void {

    }

    public eat(calories: number) {
        this.subtract(calories);
    }

    public work(calories: number) {
        this.add(calories);
    }
}

export class Thirst extends Need {
    constructor(entity: Entity, thirstRate: number) {
        super(entity, thirstRate);
    }

    protected processNeedForTick(entity: Animal): void {

    }

    public drink(water: number) {
        this.subtract(water);
    }

    public work(water: number) {
        this.add(water);
    }
}

export class Sleep extends Need {
    private sleepRestorationRate: number;

    constructor(entity: Entity, tirednessRate: number, sleepRestorationRate: number) {
        super(entity, tirednessRate);
        this.sleepRestorationRate = sleepRestorationRate;
    }

    protected processNeedForTick(entity: Animal): void {

    }

    public sleepTick() {
        this.subtract(this.sleepRestorationRate);
    }
}