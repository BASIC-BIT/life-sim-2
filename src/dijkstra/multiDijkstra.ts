import {Edible, TraitType} from "../entity/animal/traits";
import {FoodTypes} from "../enum/foodTypes";
import {Cell} from "../grid/cell";
import {Grid} from "../grid/grid";
import {Dijkstra} from "./dijkstra";

// Going to try to enumerate EVERY type of map that ever has to be generated...
export enum MapType {
    OmnivoreFood,
    CarnivoreFood,
    HerbivoreFood,
    StandingWater,
    FreshWater,
    AllWater,
    CarnivoreDanger,
    TreeGrowth, //An interestingly special one, because a rudimentory tree growth that just finds empty neighbors only needs a max score of 1, and can stop calculating after that
    //Tree growth in general should really eventually be derived from activities like seeds/fruits falling off the tree, seasons, pollination from bees and animals, and wind
    //Making a dijkstra map for this is probably not what we want to start off- we want to keep track of the "edge trees", and give them a random chance per neighbor to spread to that cell
}

// Wrap a Dijkstra map to allow for specifying origin cells and eligable cells (cells that are available to be mapped, ie. forest can't grow in mountainous terrain or in water)
export abstract class PathMap {
    protected dijkstra: Dijkstra;

    constructor(grid: Grid) {
        this.dijkstra = new Dijkstra(grid, this.getOriginCells());
    }

    protected getOriginCells(): Cell[] {
        return [];
    }
}

export class OmnivoreFoodMap extends Dijkstra {
    constructor(grid: Grid) {
        super(grid);

        this.Map(this.getOriginCells());
    }

    private getOriginCells(): Cell[] {
        return this.grid.filter((cell) => {
            var edible = cell.contents?.getTraits().getTrait(TraitType.EDIBLE);
            if (!edible) {
                return false;
            }

            var edibleTyped = edible as Edible;

            return edibleTyped.getFoodType() === FoodTypes.ANIMAL;
        })
            .flatMap((cells) => cells);
    }
}

export class MultiDijkstra {
    private maps: { [type in MapType]?: Dijkstra };

    constructor(grid: Grid) {
        this.maps = {
            [MapType.OmnivoreFood]: new OmnivoreFoodMap(grid),
        }
    }
}