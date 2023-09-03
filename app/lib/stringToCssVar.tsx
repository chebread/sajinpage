const stringToCssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;

export default stringToCssVar;
