import React from "react";
import { useCallback } from "react";
import Particles, { ParticlesProps } from "react-tsparticles";
import { loadFull } from "tsparticles";

type InitType = ParticlesProps["init"];
type InitTypeNonNullable = NonNullable<InitType>;
type InitParameters = Parameters<InitTypeNonNullable>;
type Engine = InitParameters[0];

const TsParticles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <div>
      <Particles
        className="h-screen"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 120,
          // interactivity: {
          //   events: {
          //     onHover: {
          //       enable: true,
          //       mode: "repulse",
          //     },
          //     resize: true,
          //   },
          //   modes: {
          //     repulse: {
          //       distance: 100,
          //       duration: 1,
          //     },
          //   },
          // },
          particles: {
            color: {
              value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
            },
            links: {
              color: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 2,
            },
            collisions: {
              enable: true,
            },
            move: {
              enable: true,
              direction: "top-left",
              outModes: {
                default: "bounce",
              },
              random: true,
              straight: false,
              speed: 1,
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 105,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default TsParticles;
