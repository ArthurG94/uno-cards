const waitNextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));


export { waitNextFrame };