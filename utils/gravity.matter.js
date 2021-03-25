/* eslint-disable import/order */
import {
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  World,
  use,
  Vector,
  Common,
} from "matter-js";
import { createWorld, enableScroll } from "./common.matter";
// eslint-disable-next-line no-unused-vars
import * as MatterAttractors from "matter-attractors";

/**
 *
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializeGravity = (options = {}) => {
  const {
    gravityMultiplier = 1,
    restitution = 1,
    planetsCount = 10,
    includeBoundaries = true,
  } = options;

  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 650, width: 850 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: false },
  });

  // Code
  // World Configs
  world.gravity.scale = 0;

  // Gravity
  const G = 6.67e-5 * gravityMultiplier;

  const gravityFunction = function (bodyA, bodyB) {
    // use Newton's law of gravitation
    const bToA = Vector.sub(bodyB.position, bodyA.position);
    const distanceSq = Vector.magnitudeSquared(bToA) || 0.0001;
    const normal = Vector.normalise(bToA);
    const magnitude = -G * ((bodyA.mass * bodyB.mass) / distanceSq);
    const force = Vector.mult(normal, magnitude);

    // to apply forces to both bodies
    Body.applyForce(bodyA, bodyA.position, Vector.neg(force));
    Body.applyForce(bodyB, bodyB.position, force);
  };

  const createNewPlanet = (position, mass) => {
    const randomMass = randomNumber(1, 6);

    const body = Bodies.circle(
      position ? position.x : randomNumber(0, sizes.width),
      position ? position.y : randomNumber(0, sizes.height),

      mass || randomMass, // arbitary
      {
        mass: mass || randomMass,
        frictionAir: 0,
        friction: 0,
        restitution,
        plugin: {
          attractors: [gravityFunction],
        },
      }
    );

    Body.setVelocity(body, {
      x: Common.random(-1, 1),
      y: Common.random(-1, 1),
    });

    World.add(world, body);

    return body;
  };

  // Adding bodies

  const sun = Bodies.circle(sizes.width / 2, sizes.height / 2, 30, {
    isStatic: true,
    mass: 100,
    render: {
      fillStyle: "yellow",
    },
    plugin: {
      attractors: [gravityFunction],
    },
  });

  World.add(world, [sun]);

  // Adding walls
  if (includeBoundaries) {
    const wallLeft = Bodies.rectangle(0, sizes.height / 2, 10, sizes.height, {
      isStatic: true,
    });
    const wallRight = Bodies.rectangle(
      sizes.width,
      sizes.height / 2,
      10,
      sizes.height,
      {
        isStatic: true,
      }
    );
    const wallTop = Bodies.rectangle(sizes.width / 2, 0, sizes.width, 10, {
      isStatic: true,
    });
    const wallBottom = Bodies.rectangle(
      sizes.width / 2,
      sizes.height,
      sizes.width,
      10,
      {
        isStatic: true,
      }
    );
    World.add(world, [wallLeft, wallRight, wallBottom, wallTop]);
  }

  for (let i = 0; i < parseInt(planetsCount); i++) {
    createNewPlanet();
  }

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
  enableScroll(mouseConstraint);
  use("matter-attractors");
};

const randomNumber = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
