import React from 'react';
import {cleanup, fireEvent, render} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
afterEach(cleanup);
import MainDisplay from './MainDisplay';
import Display from './Display';
import Dashboard from './Dashboard';
import 'jest-dom/extend-expect';

describe('Display for Baseball Game', () => {
    test('Displaying correct amount of balls and strikes', () => {
        const {getByText} = render(<Display ball="0" strike="0" />);
        getByText(/Balls: 0/i);
        getByText(/Strikes: 0/i);
    })

    test('Increasing ball count with button press', () => {
        const button = render(<MainDisplay />).getByTestId("ballbtn");
        const display = render(<MainDisplay />);
        fireEvent.click(button);
        const balls = display.getByTestId('ball');
        expect(balls).toHaveTextContent("Balls: 1");
    })
    test('If strikes increase', () => {
        const button = render(<MainDisplay />).getByTestId("strikebtn");
        const display = render(<MainDisplay />);
        fireEvent.click(button);
        const strikes = display.getByTestId('strike');
        expect(strikes).toHaveTextContent("Strikes: 1");
    })
    test('Foul logic check 1', () => {
        const button = render(<MainDisplay />).getByTestId("foulbtn");
        const display = render(<MainDisplay />);
        fireEvent.click(button);
        const strikes = display.getByTestId('strike');
        expect(strikes).toHaveTextContent("Strikes: 1");
    })
    test('Foul logic with two strikes', () => {
        const button = render(<MainDisplay />).getByTestId("foulbtn");
        const display = render(<MainDisplay />);
        //Simulate 3 fouls
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        const strikes = display.getByTestId('strike');
        expect(strikes).toHaveTextContent("Strikes: 2");
    })
    test('Reset after strikeout', () => {
        const button = render(<MainDisplay />).getByTestId("strikebtn");
        const display = render(<MainDisplay />);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        const strikes = display.getByTestId('strike');
        expect(strikes).toHaveTextContent("Strikes: 0");
    })
    test('Walk Reset', () => {
        const button = render(<MainDisplay />).getByTestId("ballbtn");
        const display = render(<MainDisplay />);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        const balls = display.getByTestId('ball');
        expect(balls).toHaveTextContent("Balls: 0");
    })
    test('Reset after hit', () => {
        const button = render(<MainDisplay />).getByTestId("hitbtn");
        const display = render(<MainDisplay strike={1} />);
        fireEvent.click(button);
        const strikes = display.getByTestId('strike');
        expect(strikes).toHaveTextContent("Strikes: 0");
    })
    // test('Extra innings', () => {
    //     const display = render(<MainDisplay inning={10} />);
    //     const strikes = display.getByTestId('strike');
    //     expect(strikes).toHaveTextContent("Strikes: 0");
    // })
})

