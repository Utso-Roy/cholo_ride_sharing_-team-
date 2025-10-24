import { useEffect, useRef } from "react";
import type { ModSocketEvent } from "./realtime";

type Options = {
  url: string;          // e.g., wss://api.choloride.io/mod/updates
  token: string;        // moderator auth token
  rideId?: string;      // currently open ride (optional; you can filter in onMessage)
  onEvent: (ev: ModSocketEvent) => void;
  autoReconnect?: boolean;
};

export function useRideSocket({ url, token, rideId, onEvent, autoReconnect = true }: Options) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backoffRef = useRef(500);

  useEffect(() => {
    // ✅ hard guard — skip if token missing
    if (!token) {
      console.warn("[WS] Skip connect: empty token");
      return;
    }

    let closedByUser = false;

    const connect = () => {
      const wsUrl = `${url}?token=${encodeURIComponent(token)}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        backoffRef.current = 500;
        if (rideId) {
          ws.send(JSON.stringify({ type: "subscribe", rideId }));
        }
      };

      ws.onmessage = (msg) => {
        try {
          onEvent(JSON.parse(msg.data));
        } catch (e) {
          console.warn("[WS] parse error", e);
        }
      };

      ws.onerror = (err) => {
        console.error("[WS] error", err);
      };

      ws.onclose = (ev) => {
        wsRef.current = null;
        console.warn("[WS] closed", ev.code, ev.reason);
        if (!closedByUser && autoReconnect) {
          const delay = Math.min(backoffRef.current, 8000);
          if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
          reconnectTimer.current = setTimeout(() => {
            backoffRef.current = Math.min(backoffRef.current * 2, 8000);
            connect();
          }, delay);
        }
      };
    };

    connect();

    return () => {
      closedByUser = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [url, token, rideId, onEvent, autoReconnect]);
}
