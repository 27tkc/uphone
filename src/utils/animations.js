import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register the ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

/**
 * Animates an element using GSAP with optional ScrollTrigger properties.
 *
 * @param {string | Element} target - The element or selector to animate.
 * @param {object} animationProps - The animation properties (e.g., duration, opacity).
 * @param {object} scrollProps - Additional ScrollTrigger properties (optional).
 */
export const animateWithGsap = (target, animationProps, scrollProps) => {
  gsap.to(target, {
    ...animationProps, // Spread animation properties
    scrollTrigger: {
      trigger: target, // Element that triggers the animation
      toggleActions: "restart reverse restart reverse", // Restart on scroll direction change
      start: "top 85%", // Start animation when element is 85% into view
      ...scrollProps, // Spread additional ScrollTrigger properties
    },
  });
};

/**
 * Animates a 3D model rotation and transitions between two views using a GSAP timeline.
 *
 * @param {gsap.core.Timeline} timeline - The GSAP timeline instance.
 * @param {React.RefObject} rotationRef - Ref to the model's rotation group.
 * @param {number} rotationState - The rotation value to animate towards.
 * @param {string} firstTarget - Selector for the first view element.
 * @param {string} secondTarget - Selector for the second view element.
 * @param {object} animationProps - Additional animation properties (e.g., transform, duration).
 */
export const animateWithGsapTimeline = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  // Animate the model's rotation
  timeline.to(rotationRef.current.rotation, {
    y: rotationState, // Rotate the model on the Y-axis
    duration: 1,
    ease: "power2.inOut", // Smooth easing
  });

  // Animate the first target (e.g., hiding the previous view)
  timeline.to(
    firstTarget,
    {
      ...animationProps, // Spread animation properties
      ease: "power2.inOut",
    },
    "<" // Sync animation with the previous one
  );

  // Animate the second target (e.g., revealing the next view)
  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<" // Sync animation with the previous one
  );
};
