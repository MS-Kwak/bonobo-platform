'use client';

import { useRef, useCallback, useState } from 'react';
import Script from 'next/script';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const OFFICE = { lat: 37.485388, lng: 126.788039 };
const BRAND_BLUE = '#3068b6';

type MapType = 'normal' | 'satellite' | 'hybrid' | 'terrain';

const mapTypes: { id: MapType; label: string }[] = [
  { id: 'normal', label: '일반' },
  { id: 'satellite', label: '위성' },
  { id: 'terrain', label: '지형' },
];

export function NaverMap({ className }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [activeType, setActiveType] = useState<MapType>('normal');

  const initMap = useCallback(() => {
    const naver = (window as any).naver;
    if (!mapRef.current || !naver?.maps) return;

    const position = new naver.maps.LatLng(OFFICE.lat, OFFICE.lng);

    const map = new naver.maps.Map(mapRef.current, {
      center: position,
      zoom: 17,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      logoControl: true,
      mapDataControl: false,
    });

    mapInstanceRef.current = map;

    const markerHtml = [
      '<div style="display:flex;flex-direction:column;align-items:center;">',
      '<div style="',
      'background:#1a1a1a;',
      'color:#fff;',
      'padding:8px 14px;',
      'border-radius:8px;',
      'font-size:13px;',
      'font-weight:600;',
      'white-space:nowrap;',
      'box-shadow:0 2px 12px rgba(0,0,0,0.2);',
      'margin-bottom:-1px;',
      '">(주)보노보플랫폼</div>',
      '<div style="',
      'width:0;height:0;',
      'border-left:7px solid transparent;',
      'border-right:7px solid transparent;',
      'border-top:7px solid #1a1a1a;',
      'margin-bottom:4px;',
      '"></div>',
      `<svg width="28" height="36" viewBox="0 0 28 36" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">`,
      `<path d="M14 0C6.268 0 0 6.268 0 14c0 9.941 14 22 14 22s14-12.059 14-22C28 6.268 21.732 0 14 0z" fill="${BRAND_BLUE}"/>`,
      '<circle cx="14" cy="13" r="5.5" fill="white"/>',
      '</svg>',
      '</div>',
    ].join('');

    new naver.maps.Marker({
      position,
      map,
      icon: {
        content: markerHtml,
        anchor: new naver.maps.Point(70, 80),
      },
    });

    setReady(true);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setZoom(map.getZoom() + delta, true);
  }, []);

  const handleMapType = useCallback((type: MapType) => {
    const naver = (window as any).naver;
    const map = mapInstanceRef.current;
    if (!map || !naver?.maps) return;

    const typeMap: Record<MapType, any> = {
      normal: naver.maps.MapTypeId.NORMAL,
      satellite: naver.maps.MapTypeId.SATELLITE,
      hybrid: naver.maps.MapTypeId.HYBRID,
      terrain: naver.maps.MapTypeId.TERRAIN,
    };

    map.setMapTypeId(typeMap[type]);
    setActiveType(type);
  }, []);

  return (
    <div className="relative">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        strategy="afterInteractive"
        onReady={initMap}
      />
      <div ref={mapRef} className={className ?? 'h-[400px] w-full'} />

      {ready && (
        <div className="absolute top-4 right-4 z-10 flex flex-col items-center gap-2">
          {/* Map type toggle */}
          <button
            type="button"
            onClick={() => {
              const idx = mapTypes.findIndex((t) => t.id === activeType);
              handleMapType(mapTypes[(idx + 1) % mapTypes.length].id);
            }}
            className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-foreground/70 shadow-md ring-1 ring-black/8 transition-colors hover:bg-muted hover:text-foreground"
          >
            {mapTypes.find((t) => t.id === activeType)?.label}
          </button>

          {/* Zoom controls */}
          <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/8">
            <button
              type="button"
              onClick={() => handleZoom(1)}
              className="flex items-center justify-center px-2 py-1.5 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="확대"
            >
              <Plus className="size-4" strokeWidth={2} />
            </button>
            <div className="h-px bg-black/6" />
            <button
              type="button"
              onClick={() => handleZoom(-1)}
              className="flex items-center justify-center px-2 py-1.5 text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
              aria-label="축소"
            >
              <Minus className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
