export class Matrix<T> {
    protected values: T[][] = [];

    public sizeX: number;
    public sizeY: number;

    constructor(x: number, y:number, initializer?: (x: number, y: number) => T) {
        this.sizeX = x;
        this.sizeY = y;

        if(initializer !== undefined) {
            this.initializeMatrix(initializer);
        }
    }

    public initializeMatrix(initializer: (x: number, y: number) => T) : void {
        for(var i = 0; i<this.sizeX; i++){
            var row = [];
            for(var j=0; j<this.sizeY; j++) {
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
        if(x < 0 || y < 0 || x >= this.sizeX || y >= this.sizeY) {
            throw new Error(`Matrix value of ${x},${y} is outside of bounds ${this.sizeX},${this.sizeY}`)
        }

        return this.values[x][y];
    }
}