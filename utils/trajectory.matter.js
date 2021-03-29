import {
  Bodies,
  Constraint,
  Events,
  Mouse,
  MouseConstraint,
  Render,
  Vector,
  World,
} from "matter-js";
import { createWorld, enableScroll } from "./common.matter";

/**
 *
 * @param {{ gravityMultiplier: number, restitution: number }} options - id of element in which to render the simulation
 */
export const initializeTrajectory = (
  insertToGraph,
  resetGraph,
  options = {}
) => {
  const { gravityMultiplier = 1, frictionAir = 0 } = options;

  // Initializing world
  const canvas = document.getElementById("simulation");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 550, width: 850 };
  const { world, render, engine } = createWorld(canvas, {
    sizes,
    renderOptions: { wireframes: false },
  });

  world.gravity.scale *= gravityMultiplier;

  // Bodies
  const ballOptions = {
    frictionAir: frictionAir ** 1 / 10,
  };
  const ballPosition = Vector.create(150, sizes.height / 1.25);
  let ball = Bodies.circle(ballPosition.x, ballPosition.y, 10, ballOptions);
  const sling = Constraint.create({
    pointA: Vector.clone(ball.position),
    stiffness: 0.01,
    bodyB: ball,
    render: {
      type: "line",
    },
  });

  World.add(world, [ball, sling]);

  // Mouse Constraint
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.02,
      render: { visible: false },
    },
  });

  let firing = false;
  let firingBall;

  let startTime;
  Events.on(mouseConstraint, "enddrag", (e) => {
    if (e.body === ball) {
      startTime = new Date();
      resetGraph();
      firing = true;
    }
  });

  Events.on(engine, "afterUpdate", (e) => {
    if (
      firing &&
      Math.abs(ball.position.x - ballPosition.x) < 20 &&
      Math.abs(ball.position.y - ballPosition.y) < 20
    ) {
      firingBall = ball;
      firing = false;

      ball = Bodies.circle(ballPosition.x, ballPosition.y, 10, ballOptions);
      sling.bodyB = ball;
      setTimeout(() => {
        World.add(world, ball);
      }, 1000);
    }

    if (firingBall) {
      if (firingBall.position.y > window.innerHeight) {
        firingBall = null;
      }
    }
  });

  const trail = [];

  Events.on(render, "afterRender", (e) => {
    if (firingBall) {
      if (firingBall.position.y > sizes.height) {
        World.remove(world, firingBall);
        firingBall = null;
        startTime = null;
      } else {
        trail.unshift({
          position: Vector.clone(firingBall.position),
          speed: firingBall.speed,
        });
      }
    }
    Render.startViewTransform(render);

    render.context.globalAlpha = 0.7;

    for (let i = 0; i < trail.length; i++) {
      const { position: point, speed } = trail[i];

      render.context.fillStyle = `rgba(255, 255, 255, ${speed / 20})`;
      render.context.fillRect(point.x, point.y, 2, 2);
    }

    render.context.globalAlpha = 1;
    Render.endViewTransform(render);

    if (trail.length > 200) {
      trail.pop();
    }
  });

  enableScroll(mouseConstraint);

  World.add(world, mouseConstraint);

  return setInterval(() => {
    if (firingBall) {
      const timeElapsed = (new Date() - startTime) / 1000;
      insertToGraph(
        timeElapsed.toFixed(1),
        Vector.magnitude(firingBall.velocity)
      );
    }
  }, 1000 / 30);
};
