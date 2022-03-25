import { FoodTypes } from "../../enum/foodTypes";

export enum TraitType {
    EDIBLE,
    DRINKABLE,
}

export class Traits {
    private traits: { [trait in TraitType]?: Trait };

    constructor() {
        this.traits = {};
    }

    public AddTrait(traitType: TraitType, trait: Trait) {
        this.traits = {
            ...this.traits,
            [traitType]: trait,
        }
    }

    public getTrait(type: TraitType): Trait | undefined {
        return this.traits[type];
    }

    public getEdible(): Edible | undefined {
        return this.traits[TraitType.EDIBLE] as Edible;
    }

    public getDrinkable(): Drinkable | undefined {
        return this.traits[TraitType.DRINKABLE] as Drinkable;
    }
}

export class Trait {
}

export class Edible extends Trait {
    public nutrients: number;
    private foodType: FoodTypes;

    constructor(foodType: FoodTypes) {
        super();
        this.foodType = foodType;
        this.nutrients = 0;
    }

    addNutrients(value: number): void {
        this.nutrients = this.nutrients + value;
    }

    subtractNutrients(value: number): number {
        const removed = Math.min(this.nutrients, value);

        this.nutrients = this.nutrients - removed;

        return removed;
    }

    public hasFood(foodTypes: FoodTypes[]): boolean {
        return this.nutrients > 0 &&
            foodTypes.some((type) => type === this.foodType);
    }

    //When getting eaten by another entity, maxNutrients is the max it can eat, and this returns the amount of nutrients eaten.
    getEaten(maxNutrients: number): number {
        const amount = Math.min(this.nutrients, maxNutrients);
        this.nutrients = this.nutrients - amount;
        return amount;
    }

    getFoodType(): FoodTypes {
        return this.foodType;
    }
}

//We're gonna asume infinite water sources for now, at least until we have environmental effects like rain, clouds, and evaporation
export class Drinkable extends Trait {
    private foodType: FoodTypes;

    constructor(foodType: FoodTypes) {
        super();
        this.foodType = foodType;
    }

    getFoodType(): FoodTypes {
        return this.foodType;
    }
}