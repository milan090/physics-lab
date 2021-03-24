import {
  Bodies,
  Body,
  Constraint,
  Mouse,
  MouseConstraint,
  World,
} from "matter-js";
import { createWorld } from "./common.matter";

/**
 *
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializeNewtonsCradle = (
  options = { gravityMultiplier: 1, restitution: 1 }
) => {
  const { gravityMultiplier = 1, restitution = 1 } = options;
  console.log(options);
  console.log("Restitution", restitution);
  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 350, width: 650 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: true },
  });

  world.gravity.scale *= gravityMultiplier;

  const count = 5;
  const pendulumnHandles = [];
  for (let i = 0; i < count; i++) {
    const pendulumn = Bodies.circle(200 + 50 * i, 250, 25, {
      friction: 0,
      frictionAir: 0.00001,
      inertia: Infinity,
      slop: 1,
      restitution,
    });
    pendulumnHandles.push(pendulumn);
    const constraint = Constraint.create({
      pointA: { x: 200 + 50 * i, y: 50 },
      bodyB: pendulumn,
    });
    World.add(world, [pendulumn, constraint]);
  }

  Body.translate(pendulumnHandles[0], { x: -200, y: -150 });
  // setInterval(() => {
  //   console.log("Again");
  //   if (!canvas.hidden) {
  //     Body.translate(cradle.bodies[0], { x: -140, y: -100 });
  //   }
  // }, 10000);

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
};
