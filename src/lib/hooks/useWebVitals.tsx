import { useReportWebVitals } from "next/web-vitals";

export default function useWebVitals() {
  useReportWebVitals((metric) => {
    console.log('useWebVitals', metric);
  });
}
