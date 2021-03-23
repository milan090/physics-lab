import { Body, Composites, Mouse, MouseConstraint, World } from "matter-js";
import { createWorld } from "./common.matter";

export const initializeNewtonsCradlePreview = () => {
  // Initializing world
  const canvas = document.getElementById("newtons-cradle-hero");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 350, width: 650 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: true },
  });

  const cradle = Composites.newtonsCradle(200, 50, 5, 25, 200);

  Body.translate(cradle.bodies[0], { x: -200, y: -150 });
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

  World.add(world, [cradle, mouseConstraint]);
};
