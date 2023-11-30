import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTopOnRouteChange(separated_links = []) {
  const location = useLocation();

  useEffect(() => {
    if (separated_links.indexOf(location.pathname) === -1) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location]);
}

export default useScrollToTopOnRouteChange;
