'use client';

import { useEffect, useState } from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export function AnimationWrapper({ children, delay = 0 }: AnimationWrapperProps) {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowElement(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`opacity-0 ${showElement ? 'drop-animate' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
} 