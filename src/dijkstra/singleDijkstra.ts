import { Cell } from "../grid/cell";
import { Grid } from "../grid/grid";
import { Matrix } from "../grid/matrix";
import { random } from "../util/array";

export class SingleDijkstra extends Matrix<number> {
    protected grid: Grid;

    public static IMPASSABLE: number = -1;

    private candidateEdgeCells: Cell[] = [];
    private lastCalculatedCount: number = -1;

    constructor(grid: Grid) {
        super(grid.size, (x, y) => NaN);
        this.grid = grid;
    }

    public StartMap(originCells: Cell[]): void {
        originCells.forEach((cell) => {
            this.setValue(cell.x, cell.y, 0);
            this.candidateEdgeCells.push(cell);
        })
        this.candidateEdgeCells = this.getEdgeCells(this.candidateEdgeCells);

        this.lastCalculatedCount = originCells.length;
    }

    public MapTick(): boolean {
        if(this.lastCalculatedCount === 0) {
            return false;
        }

        this.lastCalculatedCount = 0;

        this.candidateEdgeCells.forEach((cell) => {
            var uncalculatedNeighbors = this.getUncalculatedNeighbors(cell);
            var curValue = this.getValue(cell.x, cell.y);
            var neighborValue = curValue + 1; //Increment map value by one for every square away;

            uncalculatedNeighbors.forEach((neighbor) => {
                this.setValue(neighbor.x, neighbor.y, neighborValue);
                this.candidateEdgeCells.push(neighbor);
                this.lastCalculatedCount++;
            });
        });

        this.candidateEdgeCells = this.getEdgeCells(this.candidateEdgeCells);

        return true;
    }

    public getCandidateEdgeCells(): Cell[] {
        return this.candidateEdgeCells;
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

    // randomness being added here temporarily to spice up pathfinding.  For value R, each candidate neighbor's value is modified by a random value between -R and R before comparing it to the best cell.

    public whereToGo(startCell: Cell, randomness: number = 0): Cell {
        var neighbors = startCell.GetNeighbors();

        var startCelLValue = this.getValue(startCell.x, startCell.y);
        var bestValue = startCelLValue + this.GetRandom(startCelLValue * randomness);

        var options = neighbors.reduce<{ cells: Cell[], bestValue: number }>(({ cells, bestValue }, neighbor: Cell) => {
            var neighborValue = this.getValue(neighbor.x, neighbor.y) + this.GetRandom(randomness);

            if(neighborValue < bestValue) {
                return { cells: [neighbor], bestValue: neighborValue };
            } else if(neighborValue === bestValue) {
                return { cells: [...cells, neighbor], bestValue };
            } else {
                return { cells: cells, bestValue };
            }
        }, { cells: [startCell], bestValue });

        return random(options.cells);
    }

    private GetRandom(randomness: number) {
        return (Math.random() * 2 * randomness) - randomness;
    }
}