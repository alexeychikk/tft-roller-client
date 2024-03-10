if (
  !new (class {
    x: unknown;
    // eslint-disable-next-line no-prototype-builtins
  })().hasOwnProperty('x')
) {
  // throw new Error('Transpiler is not configured correctly');
  // THIS IS INTENTIONAL
  // console.warn('mobx fields cannot be made observable before initialization');
  // console.warn(
  //   'https://mobx.js.org/installation.html#use-spec-compliant-transpilation-for-class-properties',
  // );
}
