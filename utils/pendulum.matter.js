import {
  Bodies,
  Body,
  Constraint,
  Events,
  Mouse,
  MouseConstraint,
  World,
} from "matter-js";
import { createWorld, enableScroll } from "./common.matter";

/**
 * @onRender
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializePendulum = (onRender, options = {}) => {
  const startTime = new Date();
  const {
    gravityMultiplier = 1,
    restitution = 1,
    frictionAir = 1,
    damping = 0,
  } = options;
  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 350, width: 650 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: true },
  });

  world.gravity.scale *= gravityMultiplier;

  const pendulumn = Bodies.circle(sizes.width / 2, 250, 25, {
    friction: 0,
    frictionAir: 0.0001 * frictionAir,
    inertia: Infinity,
    slop: 1,
    restitution,
  });
  const constraint = Constraint.create({
    pointA: { x: sizes.width / 2 + 50, y: 50 },
    bodyB: pendulumn,
    damping,
  });
  World.add(world, [pendulumn, constraint]);

  Body.translate(pendulumn, { x: -200, y: -150 });

  // ~~~~~~~~~~ Mouse Control ~~~~~~~~~~
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      },
    },
  });

  World.add(world, [mouseConstraint]);

  const interval = setInterval(() => {
    const timeElapsed = (new Date() - startTime) / 1000;
    onRender(timeElapsed.toFixed(1), pendulumn.velocity.x);
  }, 1000 / 12);

  enableScroll(mouseConstraint);

  return interval;
};
