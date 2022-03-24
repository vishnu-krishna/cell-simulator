import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './index';

describe('Cell simulator application', function () {
    test('should reset the board when reset button is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('2-6'));
        fireEvent.click(screen.getByTestId('0-1'));
        fireEvent.click(screen.getByTestId('1-4'));
        fireEvent.click(screen.getByTestId('2-3'));
        fireEvent.click(screen.getByTestId('1-3'));

        // Checking after click
        expect(screen.getByTestId('2-6')).toHaveValue("1")
        expect(screen.getByTestId('0-1')).toHaveValue("1")
        expect(screen.getByTestId('1-4')).toHaveValue("1")
        expect(screen.getByTestId('2-3')).toHaveValue("1")
        expect(screen.getByTestId('1-3')).toHaveValue("1")

        fireEvent.click(screen.getByTestId('reset-button'));

        // check after reset button is clicked
        expect(screen.getByTestId('2-6')).toHaveValue("0")
        expect(screen.getByTestId('0-1')).toHaveValue("0")
        expect(screen.getByTestId('1-4')).toHaveValue("0")
        expect(screen.getByTestId('2-3')).toHaveValue("0")
        expect(screen.getByTestId('1-3')).toHaveValue("0")
    })

    test('should make an empty Cell alive with exactly 3 live neighbours come alive when next generation is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('2-0'));
        fireEvent.click(screen.getByTestId('4-0'));
        fireEvent.click(screen.getByTestId('3-1'));

        // Checking after click
        expect(screen.getByTestId('2-0')).toHaveValue("1")
        expect(screen.getByTestId('4-0')).toHaveValue("1")
        expect(screen.getByTestId('3-1')).toHaveValue("1")


        fireEvent.click(screen.getByTestId('next-gen-button'));

        expect(screen.getByTestId('2-0')).toHaveValue("0")
        expect(screen.getByTestId('4-0')).toHaveValue("0")
        expect(screen.getByTestId('3-1')).toHaveValue("0")

        // Dead cell alive
        expect(screen.getByTestId('3-0')).toHaveValue("1")

    })

    test('should make A Cell die with fewer than two live neighbours of under-population when next generation is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('2-4'));
        fireEvent.click(screen.getByTestId('4-0'));
        fireEvent.click(screen.getByTestId('3-2'));

        // Checking after click
        expect(screen.getByTestId('2-4')).toHaveValue("1")
        expect(screen.getByTestId('4-0')).toHaveValue("1")
        expect(screen.getByTestId('3-2')).toHaveValue("1")


        fireEvent.click(screen.getByTestId('next-gen-button'));

        // all the cells die because of under population
        expect(screen.getByTestId('2-4')).toHaveValue("0")
        expect(screen.getByTestId('4-0')).toHaveValue("0")
        expect(screen.getByTestId('3-2')).toHaveValue("0")
    })

    test('should keep the cell alive with 2 or 3 live neighbours when next generation is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('2-0'));
        fireEvent.click(screen.getByTestId('3-0'));
        fireEvent.click(screen.getByTestId('4-0'));
        fireEvent.click(screen.getByTestId('3-1'));

        // Checking after click
        expect(screen.getByTestId('2-0')).toHaveValue("1")
        expect(screen.getByTestId('4-0')).toHaveValue("1")
        expect(screen.getByTestId('3-0')).toHaveValue("1")
        expect(screen.getByTestId('3-1')).toHaveValue("1")


        fireEvent.click(screen.getByTestId('next-gen-button'));

        // Only 3-0 is alive as it has 3 live neighbours
        expect(screen.getByTestId('2-0')).toHaveValue("0")
        expect(screen.getByTestId('4-0')).toHaveValue("0")
        expect(screen.getByTestId('3-0')).toHaveValue("1")
        expect(screen.getByTestId('3-1')).toHaveValue("0")
    })


    test('should make the Cell with more than 3 live neighbours die of overcrowding when next generation is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('3-2'));
        fireEvent.click(screen.getByTestId('3-3'));
        fireEvent.click(screen.getByTestId('3-4'));
        fireEvent.click(screen.getByTestId('4-2'));
        fireEvent.click(screen.getByTestId('4-3'));
        fireEvent.click(screen.getByTestId('4-4'));
        fireEvent.click(screen.getByTestId('5-2'));
        fireEvent.click(screen.getByTestId('5-3'));
        fireEvent.click(screen.getByTestId('5-4'));

        // Checking after click
        expect(screen.getByTestId('3-2')).toHaveValue("1")
        expect(screen.getByTestId('3-3')).toHaveValue("1")
        expect(screen.getByTestId('3-4')).toHaveValue("1")
        expect(screen.getByTestId('4-2')).toHaveValue("1")
        expect(screen.getByTestId('4-3')).toHaveValue("1")
        expect(screen.getByTestId('4-4')).toHaveValue("1")
        expect(screen.getByTestId('5-2')).toHaveValue("1")
        expect(screen.getByTestId('5-3')).toHaveValue("1")
        expect(screen.getByTestId('5-4')).toHaveValue("1")


        fireEvent.click(screen.getByTestId('next-gen-button'));

        expect(screen.getByTestId('3-2')).toHaveValue("1")
        expect(screen.getByTestId('3-3')).toHaveValue("1")
        expect(screen.getByTestId('3-4')).toHaveValue("1")
        expect(screen.getByTestId('4-2')).toHaveValue("1")
        // only this dies because of overcrowding.
        expect(screen.getByTestId('4-3')).toHaveValue("0")
        expect(screen.getByTestId('4-4')).toHaveValue("1")
        expect(screen.getByTestId('5-2')).toHaveValue("1")
        expect(screen.getByTestId('5-3')).toHaveValue("1")
        expect(screen.getByTestId('5-4')).toHaveValue("1")
    })

    test('should start when start button is clicked', async () => {
        render(<App/>)
        fireEvent.click(screen.getByTestId('5-0'));
        fireEvent.click(screen.getByTestId('5-1'));
        fireEvent.click(screen.getByTestId('6-0'));
        fireEvent.click(screen.getByTestId('6-1'));
        fireEvent.click(screen.getByTestId('6-2'));
        fireEvent.click(screen.getByTestId('6-3'));
        fireEvent.click(screen.getByTestId('6-4'));

        // Checking after click
        expect(screen.getByTestId('5-0')).toHaveValue("1")
        expect(screen.getByTestId('5-1')).toHaveValue("1")
        expect(screen.getByTestId('6-0')).toHaveValue("1")
        expect(screen.getByTestId('6-1')).toHaveValue("1")
        expect(screen.getByTestId('6-2')).toHaveValue("1")
        expect(screen.getByTestId('6-3')).toHaveValue("1")
        expect(screen.getByTestId('6-4')).toHaveValue("1")


        fireEvent.click(screen.getByTestId('start-button'));
        // after 1 second
        await new Promise((r) => setTimeout(r, 1000));


        expect(screen.getByTestId('5-0')).toHaveValue("1")
        expect(screen.getByTestId('5-1')).toHaveValue("1")
        expect(screen.getByTestId('6-0')).toHaveValue("1")
        expect(screen.getByTestId('6-1')).toHaveValue("1")
        expect(screen.getByTestId('6-2')).toHaveValue("1")
        expect(screen.getByTestId('6-3')).toHaveValue("1")
        expect(screen.getByTestId('6-4')).toHaveValue("0")

        // after 2 seconds
        await new Promise((r) => setTimeout(r, 1000));
        expect(screen.getByTestId('6-3')).toHaveValue("0")
        // after 3 seconds
        await new Promise((r) => setTimeout(r, 1000));

        expect(screen.getByTestId('6-2')).toHaveValue("0")


    })

});