const propTypesTemplate = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl },
) => {
  return tpl`${imports}
  ${interfaces}

  function ${componentName}({size = 24, ...props}: SvgProps & { size?: number | string }) {
    return ${jsx};
  }

  ${exports}
    `
}

module.exports = propTypesTemplate
