/**
 * This file needs to be imported from every page specific TS file
 * This will create the World for program to run in
 */
import { Render, Runner, Engine, MouseConstraint } from "matter-js";

// Defaults
let defaultOptions = {};

if (process.client) {
  defaultOptions = {
    sizes: { height: window.innerHeight, width: window.innerWidth },
    renderOptions: {},
  };
}

/**
 *
 * @param canvas The DOM Element in which the World will be rendered in
 * @param options Optional options for creating world
 */
export const createWorld = (canvas, options = defaultOptions) => {
  const { sizes, renderOptions } = options;

  // Create MatterJS canvas
  const engine = Engine.create();
  const { world } = engine;
  const render = Render.create({
    engine,
    canvas,
    options: {
      ...sizes,
      wireframes: false,
      ...renderOptions,
    },
  });
  const runner = Runner.create();

  // Start
  Runner.run(runner, engine);
  Engine.run(engine);
  Render.run(render);

  return {
    engine,
    runner,
    render,
    world,
  };
};

/**
 *
 * @param {MouseConstraint} mouseConstraint
 */
export const enableScroll = (mouseConstraint) => {
  mouseConstraint.mouse.element.removeEventListener(
    "mousewheel",
    mouseConstraint.mouse.mousewheel
  );
  mouseConstraint.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseConstraint.mouse.mousewheel
  );
};
