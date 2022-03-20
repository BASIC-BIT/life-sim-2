import React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from '../grid/grid';
import { Dijkstra } from './dijkstra';

test('constructs dijkstra map', () => {
    var grid = new Grid(5, 5);
    var originCells = [grid.getValue(2, 2), grid.getValue(4, 1)];
    var map = new Dijkstra(grid, originCells);

    var values = map.getValues();

    expect(values).toEqual([
        [4, 3, 2, 3, 4],
        [3, 2, 1, 2, 3],
        [2, 1, 0, 1, 2],
        [2, 1, 1, 2, 3],
        [1, 0, 1, 2, 3],
    ]);

});
