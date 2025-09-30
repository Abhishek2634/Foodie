import { useEffect, useRef, useState } from "react";
import "./VerticalStepper.css";

const steps = [
  {
    title: "Order Confirmed",
    date: "Fri, 11th Jul '25",
    details: [
      "Your order has been placed.",
      "Seller has processed your order.",
      "Picked up by delivery partner.",
    ],
    time: "1:41pm - 5:45pm",
  },
  {
    title: "Shipped",
    date: "Fri, 11th Jul '25",
    details: [
      "Ekart Logistics - FMPC4989253408",
      "Your item has been shipped.",
      "Received in nearest hub.",
    ],
    time: "5:50pm",
  },
  {
    title: "Out For Delivery",
    date: "Mon, 14th Jul '25",
    details: ["Your item is out for delivery."],
    time: "9:39am",
  },
  {
    title: "Delivered",
    date: "Mon, 14th Jul '25",
    details: ["Your item has been delivered."],
    time: "9:25pm",
  },
];

export default function OrderStepper() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const circleRefs = useRef([]);
  const timeoutsRef = useRef([]);

  const [completedIndex, setCompletedIndex] = useState(0); // 0 means first circle completed

  useEffect(() => {
    // clear previous timeouts on remount
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];

    // Measure after browser has painted
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      // collect circle centers (relative to container top)
      const centers = circleRefs.current.map((el) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 - containerRect.top;
        const centerX = rect.left + rect.width / 2 - containerRect.left;
        return { centerY, centerX };
      });

      if (centers.length < 2) return;

      const firstCenter = centers[0].centerY;
      const lastCenter = centers[centers.length - 1].centerY;

      // position the grey track between first and last circle centers
      const trackTop = firstCenter;
      const trackHeight = lastCenter - firstCenter;
      if (trackRef.current) {
        trackRef.current.style.top = `${trackTop}px`;
        trackRef.current.style.height = `${trackHeight}px`;
        // align left to the center x of first circle
        trackRef.current.style.left = `${centers[0].centerX - (parseFloat(getComputedStyle(trackRef.current).width) / 2)}px`;
      }

      // initialize progress at 0 height and position inside track
      if (progressRef.current) {
        progressRef.current.style.top = `0px`;
        progressRef.current.style.height = `0px`;
        progressRef.current.style.transition = "none";
      }

      // Start sequential animation: first circle is considered completed initially
      setCompletedIndex(0);

      // animate to each subsequent circle center in order
      const animateToIndex = (idx) => {
        if (idx >= centers.length) return;

        const targetHeight = centers[idx].centerY - firstCenter; // within track
        // animate
        if (progressRef.current) {
          // force reflow to restart transition if needed
          // eslint-disable-next-line no-unused-expressions
          progressRef.current.offsetHeight;
          progressRef.current.style.transition = `height ${900}ms linear`;  // 900 means it is 900 ms for each track fill
          progressRef.current.style.height = `${targetHeight}px`;
        }

        // when animation finishes, mark circle completed and continue
        const finishTimeout = setTimeout(() => {
          setCompletedIndex(idx);
          const next = idx + 1;
          const nextTimeout = setTimeout(() => animateToIndex(next), 250);  //250,  ms pause between animations
          timeoutsRef.current.push(nextTimeout);
        }, 900);
        timeoutsRef.current.push(finishTimeout);
      };

      // small initial delay to let user see page before animation
      const startTimeout = setTimeout(() => animateToIndex(1), 450);
      timeoutsRef.current.push(startTimeout);
    });

    // cleanup on unmount
    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
    // re-run when steps change or sizes might change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [900, 250]);

  return (
    <div className="order-stepper" ref={containerRef}>
      {/* THE TRACK: grey background + green progress inside */}
      <div className="track" ref={trackRef}>
        <div className="track-progress" ref={progressRef}></div>
      </div>

      {/* Steps */}
      {steps.map((step, idx) => (
        <div className="step" key={idx}>
          <div
            className={`circle ${idx <= completedIndex ? "completed" : ""} ${
              idx === completedIndex ? "active" : ""
            }`}
            ref={(el) => (circleRefs.current[idx] = el)}
          >
            {/* optional: indicator while active */}
            {idx === completedIndex && !(
              idx === steps.length - 1
            ) && <span className="inner-pulse" />}
          </div>

          <div className={`content ${idx <= completedIndex ? "show" : ""}`}>
            <h3>
              {step.title} <span className="date">{step.date}</span>
            </h3>
            {step.details.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
            <small>{step.time}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
