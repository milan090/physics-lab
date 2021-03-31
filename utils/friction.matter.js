import { Bodies, Mouse, MouseConstraint, World } from "matter-js";
import { createWorld, enableScroll } from "./common.matter";

const degreeToRadian = (x) => (x * Math.PI) / 180;
const radianToDegree = (x) => (x * 180) / Math.PI;

/**
 *
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializeFriction = (options = {}) => {
  const sizes = { height: 600, width: 600 };
  const {
    gravityMultiplier = 1,
    friction = 0.5,
    frictionStatic = 0.1,
    size = 50,
    angleOfInclination = radianToDegree(sizes.height / sizes.width),
  } = options;

  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: false },
  });

  world.gravity.scale *= gravityMultiplier;

  const angleOfInclinationInRadians = -degreeToRadian(angleOfInclination);

  const slideLength = (2 * sizes.width) / Math.sin(angleOfInclinationInRadians);
  const slide = Bodies.rectangle(0, sizes.height, slideLength, 5, {
    isStatic: true,
    friction,
    frictionStatic,
    slop: 0.5,
    angle: angleOfInclinationInRadians,
    render: {
      fillStyle: "#fff",
    },
  });

  const boxPosY =
    sizes.height - (sizes.width / 2) * Math.tan(-angleOfInclinationInRadians);

  const box = Bodies.rectangle(
    sizes.width / 2,
    boxPosY - size - 50,
    size,
    size,

    {
      angle: angleOfInclinationInRadians,
      friction,
      frictionStatic,
      // restitution: 0.2,
      density: 0.5,
      slop: 0.5,
    }
  );

  const ground = Bodies.rectangle(
    sizes.width / 2,
    sizes.height,
    sizes.width,
    10,
    {
      isStatic: true,
      render: {
        fillStyle: "#fff",
      },
    }
  );
  World.add(world, [box, ground, slide]);

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
