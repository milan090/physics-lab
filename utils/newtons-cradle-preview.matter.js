import { Body, Composites, Mouse, MouseConstraint, World } from "matter-js";
import { createWorld, enableScroll } from "./common.matter";

export const initializeNewtonsCradlePreview = () => {
  // Initializing world
  const canvas = document.getElementById("newtons-cradle-hero");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 350, width: 650 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: true },
  });

  const cradle = Composites.newtonsCradle(sizes.width / 3, 50, 5, 25, 200);
  world.gravity.scale = 0.0005;
  Body.translate(cradle.bodies[0], { x: -200, y: -150 });

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

  World.add(world, [cradle, mouseConstraint]);
};
