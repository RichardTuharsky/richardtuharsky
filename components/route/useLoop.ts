"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives a looping step animation for the small demo screens.
 *
 * - Server render and reduced motion show the last step (the static end state).
 * - Runs only while the element is on screen and not paused.
 * - Restarts from step 0 the first time it comes into view.
 *
 * `durations[i]` is how long step i is held, in ms.
 */
export function useLoop<T extends HTMLElement>(durations: number[]) {
  const last = durations.length - 1;
  const ref = useRef<T>(null);
  const [step, setStep] = useState(last);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const started = useRef(false);
  const durationsRef = useRef(durations);
  durationsRef.current = durations;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const running = !reduced && !paused && visible;

  useEffect(() => {
    if (reduced) {
      started.current = false;
      setStep(last);
    }
  }, [reduced, last]);

  useEffect(() => {
    if (!running) return;
    if (!started.current) {
      started.current = true;
      setStep(0);
      return;
    }
    const id = window.setTimeout(() => {
      if (step === last) {
        setCycle((c) => c + 1);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    },durationsRef.current[step] ?? 1500);
    return () => window.clearTimeout(id);
  }, [running, step, last]);

  return {
    ref,
    step,
    cycle,
    paused,
    reduced,
    togglePaused: () => setPaused((p) => !p),
  };
}
