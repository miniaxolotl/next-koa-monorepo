/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useMemo, useState } from 'react';

const BaseMediaValue = 320;
const MaxMediaValue = 1200;

const _useMedia = <T extends number>(width: T) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > width;
};

export const useMedia = <T extends number>(width: T) => {
  if (typeof window === 'undefined') return false;
  return useMemo(() => window.innerWidth > width, [width]);
};

export const useMediaQuery = <T extends number>(values: T[]) => {
  if (typeof window === 'undefined') return 0;
  const breakPoints = values.map((_, i) => BaseMediaValue + ((MaxMediaValue - BaseMediaValue) / values.length) * i);
  const compute = useCallback(
    (values: T[]) => {
      return values.map((_, i) => _useMedia(breakPoints[i]));
    },
    [breakPoints],
  );
  const [computed, setComputed] = useState(compute(values));
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (computed.length === 1) {
      setWidth(values[0]);
    } else {
      setComputed(compute(values));
      setWidth(computed.reduce((a, c, i) => (c ? values[i] : a), 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const resizeListener = () => {
      if (computed.length === 1) {
        setWidth(values[0]);
      } else {
        setComputed(compute(values));
        setWidth(computed.reduce((a, c, i) => (c ? values[i] : a), 0));
      }
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [compute, computed, computed.length, values]);
  return width;
};

// const [breakPoints] = useState(values.map((_, i) => (BaseMediaValue / values.length) * (i + 1)));
// console.log(breakPoints);
// console.log(values);
// const [computed, setComputed] = useState(values[0]);
// useEffect(() => {
//   const points = breakPoints.map((breakPoint) => useMedia(`(min-width: ${breakPoint}px)`));
//   points.forEach((query, index) =>
//     query.addEventListener('change', (q) => {
//       console.log(q);
//       setComputed(q.matches ? values[index] : computed);
//     }),
//   );
//   return () => {
//     points.forEach((query) => (query.onchange = null));
//   };
// }, [breakPoints, computed, values]);
// return computed;
