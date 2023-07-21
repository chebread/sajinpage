const buildCssVariables = (variables: any) => {
  const keys = Object.keys(variables);
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    ''
  );
};

export default buildCssVariables;
