import { FoodTypes } from "../../enum/foodTypes";

export enum TraitType {
    EDIBLE,
    DRINKABLE,
}

export interface Traits {
    traits: {[trait in TraitType]: trait | null};
}

export interface Trait {
    trait: TraitType
}

export interface Edible extends Trait {
    //When getting eaten by another entity, maxNutrients is the max it can eat, and this returns the amount of nutrients eaten.
    getEaten(maxNutrients: number): number;
    getFoodType(): FoodTypes.ANIMAL | FoodTypes.PLANT;
}

export interface Drinkable extends Trait {
    getWaterType(): FoodTypes.FRESHWATER | FoodTypes.WATER;
}

export interface Drinkable extends Trait {

}
