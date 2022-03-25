import { Size } from "./multilayerGrid";

export class Matrix<T> {
    protected values: T[][] = [];

    public size: Size;

    constructor(size: Size, initializer?: (x: number, y: number) => T) {
        this.size = size;

        if(initializer !== undefined) {
            this.initializeMatrix(initializer);
        }
    }

    public initializeMatrix(initializer: (x: number, y: number) => T) : void {
        for(var i = 0; i<this.size.x; i++){
            var row = [];
            for(var j=0; j<this.size.y; j++) {
                row[j] = initializer(i, j);
            }
            this.values[i] = row;
        }
    }

    public map<TR>(func: (value: T) => TR): TR[][] {
        return this.values.map((row) =>
            row.map((value) =>
                func(value)));
    }

    public filter(func: (value: T) => boolean): T[][] {
        return this.values.map((row) =>
            row.filter((value) =>
                func(value)));
    }

    public forEach(func: (value: T) => void): void {
        this.values.map((row) =>
            row.map((value) =>
                func(value)));
    }

    public setValue(x: number, y: number, value: T) {
        if(this.values[x] === undefined) {
            this.values[x] = [];
        }

        this.values[x][y] = value;
    }

    public getValue(x: number, y: number) : T {
        if(x < 0 || y < 0 || x >= this.size.x || y >= this.size.y) {
            throw new Error(`Matrix value of ${x},${y} is outside of bounds ${this.size.x},${this.size.y}`)
        }

        return this.values[x][y];
    }
}