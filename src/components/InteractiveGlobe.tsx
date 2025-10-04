// src/components/InteractiveGlobe.tsx
import React, { useEffect, useRef, useState, Suspense } from "react";
import * as topojson from "topojson-client";
import type { FeatureCollection, Feature } from "geojson";

// Lazy load to avoid SSR/initial-bundle issues
const Globe = React.lazy(() => import("react-globe.gl"));

type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string;
  id?: string;
};

export default function InteractiveGlobe(): JSX.Element {
  const [isClient, setIsClient] = useState(false);
  const [polygons, setPolygons] = useState<FeatureCollection | null>(null);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const highlightedRef = useRef<Record<string, number>>({});
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // base point of view - the resting camera position
  const basePOV = useRef({ lat: 10, lng: -20, altitude: 1.6 });
  // state to track hover so we only respond to mouse when hovered
  const hoveredRef = useRef(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  // load topojson countries (world-atlas from unpkg)
  useEffect(() => {
    if (!isClient) return;
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch(
          "https://unpkg.com/world-atlas@2/countries-110m.json"
        );
        const topo = await resp.json();
        const geo = topojson.feature(topo as any, (topo as any).objects.countries) as FeatureCollection;

        // ensure each feature has an id
        geo.features = geo.features.map((f: Feature, i) => {
          if (!f.id) (f as any).id = `${i}-${(f.properties && (f.properties as any).name) || "c"}`;
          return f;
        });

        if (mounted) setPolygons(geo);
      } catch (err) {
        console.error("InteractiveGlobe: failed to load topojson", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isClient]);

  // simple centroid approximation for polygon features
  function featureCentroid(feature: Feature): [number, number] {
    const geom = feature.geometry;
    let coords: number[][] = [];
    if (geom.type === "MultiPolygon") {
      coords = (geom.coordinates as any)[0][0];
    } else if (geom.type === "Polygon") {
      coords = (geom.coordinates as any)[0];
    } else {
      return [0, 0];
    }
    const avg = coords.reduce(
      (acc: { lat: number; lng: number }, c: number[]) => {
        acc.lng += c[0];
        acc.lat += c[1];
        return acc;
      },
      { lat: 0, lng: 0 }
    );
    const len = coords.length || 1;
    // topojson coords are [lng, lat] -> return [lat, lng]
    return [avg.lat / len, avg.lng / len];
  }

  // spawn random arcs for demo; keep a small cap for performance
  useEffect(() => {
    if (!polygons) return;
    const tick = () => {
      const features = polygons.features.filter(Boolean);
      if (features.length < 2) return;
      const a = features[Math.floor(Math.random() * features.length)];
      const b = features[Math.floor(Math.random() * features.length)];
      if (!a || !b) return;
      const [sLat, sLng] = featureCentroid(a);
      const [eLat, eLng] = featureCentroid(b);
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newArc: Arc = {
        startLat: sLat,
        startLng: sLng,
        endLat: eLat,
        endLng: eLng,
        color: Math.random() > 0.5 ? "rgba(0,255,200,0.95)" : "rgba(255,200,0,0.95)",
        id,
      };
      setArcs((prev) => [...prev.slice(-39), newArc]); // keep last 40
      highlightFeature((a as any).id, 1400);
      highlightFeature((b as any).id, 1400);
    };
    const interval = setInterval(tick, 700);
    return () => clearInterval(interval);
  }, [polygons]);

  function highlightFeature(id: string | undefined, duration = 1200) {
    if (!id) return;
    highlightedRef.current[id] = Date.now() + duration;
    // trigger re-render
    setPolygons((p) => (p ? { ...p } : p));
    setTimeout(() => {
      delete highlightedRef.current[id];
      setPolygons((p) => (p ? { ...p } : p));
    }, duration + 60);
  }

  // polygon color accessor
  const polygonCapColor = (feat: any) =>
    highlightedRef.current[feat.id] ? "rgba(255,255,190,0.98)" : "rgba(120,120,140,0.12)";

  // Setup auto-rotate and initial POV when globe is ready
  useEffect(() => {
    if (!globeRef.current) return;
    // set initial POV
    try {
      // pointOfView accepts (coords, milli) in globe.gl
      globeRef.current.pointOfView(basePOV.current, 0);
    } catch (e) {
      // ignore if not available immediately
    }
  }, [polygons, isClient]);

  // Mouse move handler to give a subtle parallax on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onEnter() {
      hoveredRef.current = true;
      // stop auto-rotate when hovered
      try {
        if (globeRef.current) globeRef.current.controls().autoRotate = false;
      } catch {}
    }

    function onLeave() {
      hoveredRef.current = false;
      // restore auto-rotate and reset POV smoothly
      try {
        if (globeRef.current) {
          globeRef.current.controls().autoRotate = true;
          globeRef.current.pointOfView(basePOV.current, 800);
        }
      } catch {}
    }

    function onMove(ev: MouseEvent) {
      if (!hoveredRef.current) return;
      if (!globeRef.current || !container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const maxLngOffset = 12; // degrees
      const maxLatOffset = 8; // degrees

      const dx = (ev.clientX - cx) / (rect.width / 2); // -1 .. 1
      const dy = (ev.clientY - cy) / (rect.height / 2); // -1 .. 1

      const target = {
        lat: basePOV.current.lat + dy * maxLatOffset,
        lng: basePOV.current.lng + dx * maxLngOffset,
        altitude: basePOV.current.altitude,
      };

      try {
        // use small transition to make it smooth
        globeRef.current.pointOfView(target, 200);
      } catch {}
    }

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("mousemove", onMove);

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("mousemove", onMove);
    };
  }, [isClient]);

  if (!isClient) {
    return <div className="globe-container" aria-hidden>Loading globe…</div>;
  }

  // NOTE: react-globe.gl expects functions for the arc accessors.
  // TypeScript issues with the library typing are avoided by annotating d as `any`.
  return (
    <div
      ref={containerRef}
      className="globe-container"
      style={{ width: "100%", height: "420px", cursor: "default", userSelect: "none" }}
    >
      <Suspense fallback={<div>Loading globe component…</div>}>
        <Globe
          ref={globeRef}
          width={800}
          height={420}
          backgroundColor="transparent"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          polygonsData={polygons ? polygons.features : []}
          polygonCapColor={polygonCapColor}
          polygonSideColor={() => "rgba(0,0,0,0.0)"}
          polygonStrokeColor={() => "rgba(0,0,0,0.0)"}
          polygonAltitude={0.01}
          polygonsTransitionDuration={300}

          // arcs
          arcsData={arcs}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={(d: any) => d.color || "rgba(0,255,200,0.9)"}
          arcStroke={0.9}
          arcAltitudeAutoScale={0.6}
          arcCurveResolution={64}

          // dash animation for moving effect
          arcDashLength={0.3}
          arcDashGap={0.8}
          arcDashInitialGap={() => Math.random()}
          arcDashAnimateTime={1800}

          // disable pointer interaction so it's purely decorative
          enablePointerInteraction={false}

          // subtle automatic rotation to keep it alive when not hovered
          autoRotate={true}
          autoRotateSpeed={0.25} // small slow rotation
        />
      </Suspense>
    </div>
  );
}
