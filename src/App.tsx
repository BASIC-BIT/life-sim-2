import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid} from './grid/grid';
import rgbHex from 'rgb-hex';
import {Size} from "./grid/multilayerGrid";
import { SingleDijkstra } from './dijkstra/singleDijkstra';

class App extends React.Component<AppProps> {
    private grid: Grid;
    private map: SingleDijkstra;
    private fullPathfindingCalculateTime: number = 0;
    // @ts-ignore
    private canvas: HTMLCanvasElement;
    // @ts-ignore
    private ctx: CanvasRenderingContext2D;
    private mapSize: Size = { x: 100, y: 100 };
    private pixelSize: number = 10;

    constructor(props: AppProps) {
        super(props);
        this.grid = new Grid(this.mapSize);

        var originCells = [
            this.grid.getValue(20, 25),
            this.grid.getValue(45, 40),
            this.grid.getValue(15, 40),
        ];
        this.map = new SingleDijkstra(this.grid);
        this.map.StartMap(originCells);
    }

    async componentDidMount() {
        this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.playGame();
    }

    public async playGame() {
        this.clearFrame();
        // this.drawOriginAndDestinationPoints();
        this.drawDijkstraMapVisualization();
        this.drawDijkstraMapEdgeCells();
        this.drawEntityPath();

        this.map.MapTick();
        // if(!this.map.MapTick()) {
        //     this.restartMap();
        // }

        window.requestAnimationFrame(this.playGame.bind(this));
    }

    private drawDijkstraMapVisualization() {
        for (var i = 0; i < this.mapSize.x; i++) {
            for (var j = 0; j < this.mapSize.y; j++) {
                var value = this.map.getValue(i, j);
                var mapColor = rgbHex(0, Math.min(value * 2, 255), 0, 1);
                this.ctx.fillStyle =  `#${mapColor}`;
                this.ctx.fillRect(i * this.pixelSize, j * this.pixelSize, this.pixelSize, this.pixelSize);
                // this.ctx.fillText(value.toString(), i * 5, j * 5);
            }
        }
    }

    private drawDijkstraMapEdgeCells() {
        this.map.getCandidateEdgeCells().forEach((cell) => {
            var edgeColor = rgbHex(180, 40, 40, 1);
            this.ctx.fillStyle =  `#${edgeColor}`;
            this.ctx.fillRect(cell.x * this.pixelSize, cell.y * this.pixelSize, this.pixelSize, this.pixelSize);
        })
    }

    private drawEntityPath() {
        var color = rgbHex(255, 0, 0, 1);
        // var color = rgbHex(255, 0, 0, 0.02);
        this.ctx.fillStyle = `#${color}`;

        for (var i = 0; i < 1; i++) {
            var cell = this.grid.getValue(30, 35);
            while (this.map.getValue(cell.x, cell.y) > 0) {
                this.ctx.fillRect(cell.x * this.pixelSize, cell.y * this.pixelSize, this.pixelSize, this.pixelSize);
                cell = this.map.whereToGo(cell, 1);
            }
        }
    }
    
    private clearFrame() {
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, 1000, 1000);
    }

    private drawOriginAndDestinationPoints() {
        var color = rgbHex(0, 0, 255, 0.5);
        this.ctx.fillStyle = `#${color}`;
        this.ctx.fillRect(30 * this.pixelSize, 35 * this.pixelSize, this.pixelSize, this.pixelSize);

        var color = rgbHex(0, 255, 255, 0.5);
        this.ctx.fillStyle = `#${color}`;
        this.ctx.fillRect(20 * this.pixelSize, 25 * this.pixelSize, this.pixelSize, this.pixelSize);
        this.ctx.fillRect(45 * this.pixelSize, 40 * this.pixelSize, this.pixelSize, this.pixelSize);
        this.ctx.fillRect(15 * this.pixelSize, 40 * this.pixelSize, this.pixelSize, this.pixelSize);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <canvas id="myCanvas" width="1000" height="1000"/>
                </div>
            </div>
        );
    }

    private nextMapTick(): boolean {
        return this.map.MapTick();
    }

    private restartMap() {
        this.grid = new Grid(this.mapSize);

        var originCells = [
            this.grid.getValue(20, 25),
            this.grid.getValue(45, 40),
            this.grid.getValue(15, 40),
        ];
        this.map = new SingleDijkstra(this.grid);
        this.map.StartMap(originCells);
    }
}

export interface AppProps {

}

export default App;
