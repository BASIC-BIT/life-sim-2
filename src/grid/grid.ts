import { Entity } from "../entity/entity";
import { Cell } from "./cell";
import { Matrix } from "./matrix";

export class Grid extends Matrix<Cell> {
    constructor(x: number, y:number) {
        super(x, y);
        this.initializeMatrix((x, y) =>
            new Cell(this, x, y));

        this.forEach((cell) => cell.calculateNeighbors());
    }

    public GetCell(x: number, y: number) : Cell | null {
        if(x < 0 || y < 0 || x >= this.sizeX || y >= this.sizeY) {
            return null;
        }

        return this.getValue(x, y);
    }

    public FindAllEntity(type: string): Entity[] {
        return this.values.flatMap((row) =>
            row.map((cell) => cell.contents)
                .filter((entity) => entity?.options.type === type)) as Entity[];
    }
}