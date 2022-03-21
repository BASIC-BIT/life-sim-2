import { Entity } from "../entity/entity";
import { Grid } from "./grid";

export class Cell {
    private grid: Grid;
    public x: number;
    public y: number;

    private neighbors: Cell[] = [];

    public contents?: Entity;

    constructor(grid: Grid, x: number, y: number) {
        this.grid = grid;
        this.x = x;
        this.y = y;
    }

    public calculateNeighbors() {
        this.AddNeighborIfExistsFromDistance(-1, 0);
        this.AddNeighborIfExistsFromDistance(1, 0);
        this.AddNeighborIfExistsFromDistance(0, -1);
        this.AddNeighborIfExistsFromDistance(0, 1);
    }

    private AddNeighborIfExistsFromDistance(diffX: number, diffY: number) {
        var neighbor = this.GetNeighborFromDistance(diffX, diffY);

        if(neighbor !== null) {
            this.neighbors.push(neighbor);
        }
    }

    private GetNeighborFromDistance(diffX: number, diffY: number): Cell | null {
        return this.grid.GetCell(this.x + diffX, this.y + diffY);
    }

    public GetNeighbors(): Cell[] {
        return this.neighbors;
    }

    public MoveContents(newCell: Cell) {
        this.grid.MoveContents(this, newCell);
    }
}