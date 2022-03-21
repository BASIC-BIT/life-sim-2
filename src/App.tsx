import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './grid/grid';
import { Dijkstra } from './dijkstra/dijkstra';
import rgbHex from 'rgb-hex';
import { Size } from "./grid/multilayerGrid";

class App extends React.Component<AppProps> {
  private grid: Grid;
  private map: Dijkstra;

  constructor(props: AppProps) {
    super(props);
    this.grid = new Grid({ x:50, y: 50 });

    var originCells = [
        this.grid.getValue(20, 25),
        this.grid.getValue(45, 40),
        this.grid.getValue(15, 40),
    ];
    this.map = new Dijkstra(this.grid, originCells);
  }

  componentDidMount() {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.font = "7px Arial";
    for(var i = 0; i < 50; i++) {
      for(var j = 0; j < 50; j++) {
        var value = this.map.getValue(i, j);
        var color = rgbHex(value * 2, value * 3, 0, 1);
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(i * 20, j * 20, 20, 20);
        // ctx.fillText(value.toString(), i * 5, j * 5);
      }
    }

    var color = rgbHex(255, 0, 0, 0.02);
    ctx.fillStyle = `#${color}`;

    for(var i = 0; i < 300; i++) {
      var cell = this.grid.getValue(30, 35);
      while(this.map.getValue(cell.x, cell.y) > 0) {
        ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
        cell = this.map.whereToGo(cell, 0);
      }
    }

    var color = rgbHex(0, 0, 255, 0.5);
    ctx.fillStyle = `#${color}`;

    ctx.fillRect(30 * 20, 35 * 20, 20, 20);


    var color = rgbHex(0, 255, 255, 0.5);
    ctx.fillStyle = `#${color}`;

    ctx.fillRect(20 * 20, 25 * 20, 20, 20);
    ctx.fillRect(45 * 20, 40 * 20, 20, 20);
    ctx.fillRect(15 * 20, 40 * 20, 20, 20);
  }



  render() {
    return (
        <div className="App">
          <canvas id="myCanvas" width="1000" height="1000"/>
        </div>
    );
  }
}

export interface AppProps {

}

export default App;
