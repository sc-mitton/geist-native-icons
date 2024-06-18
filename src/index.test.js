import * as Icons from '../lib';
import React from 'react';
import renderer from 'react-test-renderer';

test('There are icons', () => {
    const length = Object.keys(Icons).length;
    expect(length).toBeGreaterThan(2);
})

test('Render icons witheout crashing', () => {
    const elements = Object.keys(Icons).map((Icon, key) => <Icon key={key} />);
    const tree = renderer.create(elements).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Render icon with size', () => {
    const elements = Object.keys(Icons).map((Icon, key) => <Icon key={key} width={24} height={24} />);
    const tree = renderer.create(elements).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Render icon with color', () => {
    const elements = Object.keys(Icons).map((Icon, key) => <Icon key={key} color="#7a16ff" />);
    const tree = renderer.create(elements).toJSON();
    expect(tree).toMatchSnapshot();
})

test('Render icon with props', () => {
    const elements = Object.keys(Icons).map((Icon, key) => <Icon key={key} className="test" strokeWidth={4} />);
    const tree = renderer.create(elements).toJSON();
    expect(tree).toMatchSnapshot();
});
