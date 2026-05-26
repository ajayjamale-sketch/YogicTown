import { useEffect, useRef } from "react";

export const useIntersectionObserver = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );

    const elements = document.querySelectorAll(".section-fade");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};
