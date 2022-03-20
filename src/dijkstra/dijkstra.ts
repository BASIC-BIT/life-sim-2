import { Cell } from "../grid/cell";
import { Grid } from "../grid/grid";
import { Matrix } from "../grid/matrix";
import { random } from "../util/array";

export class Dijkstra extends Matrix<number> {
    private grid: Grid;

    constructor(grid: Grid, originCells: Cell[]) {
        super(grid.sizeX, grid.sizeY, (x, y) => {
            if(originCells.some((cell) => cell.x === x && cell.y === y)) {
                return 0;
            }

            return NaN;
        });
        this.grid = grid;

        this.Map(originCells);
    }

    private Map(originCells: Cell[]): void {
        var calculatedCellCount = 0;

        var candidateEdgeCells: Cell[] = [];

        originCells.forEach((cell) => {
            this.setValue(cell.x, cell.y, 0);
            candidateEdgeCells.push(cell);
        })
        calculatedCellCount += originCells.length;

        var totalCellCount = this.sizeX * this.sizeY;

        while(calculatedCellCount < totalCellCount) {
            var edgeCells = this.getEdgeCells(candidateEdgeCells);
            candidateEdgeCells = [...edgeCells];

            edgeCells.forEach((cell) => {
                var uncalculatedNeighbors = this.getUncalculatedNeighbors(cell);
                var curValue = this.getValue(cell.x, cell.y);
                var neighborValue = curValue + 1; //Increment map value by one for every square away;

                uncalculatedNeighbors.forEach((neighbor) => {
                    this.setValue(neighbor.x, neighbor.y, neighborValue);
                    candidateEdgeCells.push(neighbor);
                });

                calculatedCellCount += uncalculatedNeighbors.length;
            });
        }
    }

    public getValues(): number[][] {
        return this.values;
    }

    private getEdgeCells(candidateEdgeCells: Cell[]): Cell[] {
        return candidateEdgeCells
            .filter(this.hasUncalculatedNeighbors.bind(this));
    }

    private hasUncalculatedNeighbors(cell: Cell): boolean {
        return cell.GetNeighbors().some(this.isNotCalculated.bind(this));
    }

    private getUncalculatedNeighbors(cell: Cell): Cell[] {
        return cell.GetNeighbors().filter(this.isNotCalculated.bind(this));
    }

    private isNotCalculated(cell: Cell) {
        return isNaN(this.getValue(cell.x, cell.y));
    }

    private isFullyCalculated(): boolean {
        return this.values.every((row) => row.every((value) => isNaN(value) === false));
    }

    private GetValueForCell(cell: Cell): number | null {
        return this.getValue(cell.x, cell.y);
    }

    public whereToGo(startCell: Cell): Cell {
        var neighbors = startCell.GetNeighbors();

        var options = neighbors.reduce<Cell[]>((bestCells: Cell[], neighbor: Cell) => {
            var bestValue = this.getValue(bestCells[0].x, bestCells[0].y);
            var neighborValue = this.getValue(neighbor.x, neighbor.y);

            if(neighborValue < bestValue) {
                return [neighbor];
            } else if(neighborValue === bestValue) {
                return [...bestCells, neighbor];
            } else {
                return bestCells;
            }
        }, [startCell]);

        return random(options);
    }
}