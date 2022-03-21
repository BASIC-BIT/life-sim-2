import { Entity } from "../entity/entity";
import { Cell } from "./cell";
import { Matrix } from "./matrix";
import { Size } from "./multilayerGrid";

export class Grid extends Matrix<Cell> {
    constructor(size: Size) {
        super(size);
        this.initializeMatrix((x, y) =>
            new Cell(this, x, y));

        this.forEach((cell) => cell.calculateNeighbors());
    }

    public GetCell(x: number, y: number) : Cell | null {
        if(x < 0 || y < 0 || x >= this.size.x || y >= this.size.y) {
            return null;
        }

        return this.getValue(x, y);
    }

    public FindAllEntity(type: string): Entity[] {
        return this.values.flatMap((row) =>
            row.map((cell) => cell.contents)
                .filter((entity) => entity?.options.type === type)) as Entity[];
    }

    public MoveContents(oldCell: Cell, newCell: Cell) {
        var ent = oldCell.contents;

        if(ent === null || ent === undefined) {
            throw new Error(`Cell at position ${oldCell.x},${oldCell.y} has no entity, when requested to move contents.`);
        }

        if(newCell.contents === null || newCell.contents === undefined) {
            throw new Error(`Cell at position ${oldCell.x},${oldCell.y} already has an entity, when entity requested to move into cell.`);
        }

        newCell.contents = oldCell.contents;
        oldCell.contents = undefined;
    }
}