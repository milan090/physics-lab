import { Bodies, Mouse, MouseConstraint, World } from "matter-js";
import { createWorld, enableScroll } from "./common.matter";

/**
 *
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializeAirResistance = (options = {}) => {
  const {
    gravityMultiplier = 1,
    restitution = 0,
    frictionAir = 1,
    size = 50,
  } = options;
  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 450, width: 650 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: false },
  });

  world.gravity.scale *= gravityMultiplier;

  const box = Bodies.rectangle(sizes.width / 2, 100, size, size, {
    frictionAir,
    restitution,
  });
  const ground = Bodies.rectangle(
    sizes.width / 2,
    sizes.height,
    sizes.width,
    30,
    {
      isStatic: true,
      render: {
        fillStyle: "#fff",
      },
    }
  );
  World.add(world, [box, ground]);

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

  enableScroll(mouseConstraint);

  World.add(world, [mouseConstraint]);
};
