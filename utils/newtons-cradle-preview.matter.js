import { Body, Composites, World } from "matter-js";
import { createWorld } from "./common.matter";

export const initializeNewtonsCradlePreview = () => {
  // Initializing world
  console.log(document);
  const canvas = document.getElementById("newtons-cradle-hero");
  console.log(canvas);
  const sizes = { height: 350, width: 650 };
  const { world } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: true },
  });

  const cradle = Composites.newtonsCradle(200, 50, 5, 30, 200);

  Body.translate(cradle.bodies[0], { x: -140, y: -100 });
  setInterval(() => {
    if (!canvas.hidden) {
      Body.translate(cradle.bodies[0], { x: -140, y: -100 });
    }
  }, 10000);

  // const mouse = Mouse.create(render.canvas);
  // const mouseConstraint = MouseConstraint.create(engine, {
  //   mouse,
  //   constraint: {
  //     stiffness: 1,
  //     render: {
  //       visible: false,
  //     }
  //   } as any
  // })

  World.add(world, [cradle]);
};
