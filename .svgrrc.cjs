module.exports = {
    ext: 'tsx',
    prettierConfig: {
        parser: 'typescript',
    },
    svgProps: {
        width: "{size}",
        height: "{size}",
    },
    template: module.require('./template.cjs'),
    jsx: {
        babelConfig: {
            plugins: [
                // xmlns is not typed correctly
                [
                    '@svgr/babel-plugin-remove-jsx-attribute',
                    {
                        elements: ['Svg'],
                        attributes: ['xmlns', 'className', 'shapeRendering'],
                    },
                ],
            ],
        },
    },
}
