'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface LiveTechLocation {
  technicianId: string;
  latitude: number;
  longitude: number;
}

export default function DispatchBoard() {
  const [locations, setLocations] = useState<Record<string, LiveTechLocation>>({});
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketClient = io(`${process.env.NEXT_PUBLIC_API_URL}/dispatch`, {
      auth: { token: localStorage.getItem('jwt_auth_token') },
    });
    setSocket(socketClient);

    socketClient.on('connect', () => {
      console.log('Connected to Dispatch Realtime Engine');
    });

    // Dynamic global listener for field-tech route updates
    socketClient.onAny((eventName, data) => {
      if (eventName.startsWith('liveLocation:')) {
        const orderId = eventName.split(':')[1];
        setLocations((prev) => ({ ...prev, [orderId]: data }));
      }
    });

    return () => {
      socketClient.disconnect();
    };
  }, []);

  return (
    <div className="p-6 bg-slate-900 text-white min-h-screen">
      <h2 className="text-3xl font-extrabold tracking-tight mb-4">
        Live Dispatch &amp; Routing Terminal
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-lg p-4 h-[600px] flex items-center justify-center border border-slate-700">
          <p className="text-slate-400 font-medium">
            [Telemetry Layer: Map rendering tracking coordinates:{' '}
            {JSON.stringify(locations)}]
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 overflow-y-auto">
          <h3 className="text-xl font-bold mb-3 border-b border-slate-700 pb-2">
            Active Field Technicians
          </h3>
          {Object.entries(locations).map(([orderId, loc]) => (
            <div
              key={orderId}
              className="mb-3 p-3 bg-slate-700 rounded border-l-4 border-emerald-500"
            >
              <p className="text-sm font-semibold">
                Order Hash: {orderId.substring(0, 8)}
              </p>
              <p className="text-xs text-slate-300">
                Lat: {loc.latitude.toFixed(5)} / Lng: {loc.longitude.toFixed(5)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
