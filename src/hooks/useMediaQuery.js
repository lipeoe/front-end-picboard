import { useEffect, useState } from "react";

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false
    )

    useEffect(() => {
        const mql = window.matchMedia(query)
        const handler = (e) => setMatches(e.matches)
        mql.addEventListener?.("change", handler)
        mql.addListener?.(handler)
        return () => {
            mql.removeEventListener?.("change", handler)
            mql.removeListener?.(handler)
        };
    }, [query])

    return matches
}