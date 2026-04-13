#!/usr/bin/env python3
"""
SENTINELLE PULSE - Satellite Tracker
Suivi des satellites en temps réel via TLE (Two-Line Element)
"""

import requests
import json
import math
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import List, Dict, Optional

@dataclass
class Satellite:
    name: str
    tle_line1: str
    tle_line2: str
    lat: float = 0.0
    lon: float = 0.0
    alt: float = 0.0
    velocity: float = 0.0
    visibility: str = "DAYLIGHT"
    next_pass: str = ""

SATELLITE_TLE_URLS = {
    "iss": "https://api.space-track.org/compacttlE/0/auth/basic/{user}/{pass}",
    "celestrak": "https://www.celestrak.org/NORAD/elements/gp.php",
}

ISS_TLE = {
    "name": "ISS (ZARYA)",
    "line1": "1 25544U 98067A   24001.50000000  .00016717  00000-0  10270-3 0  9027",
    "line2": "2 25544  51.6400 260.2643 0006713 304.1564 178.7319 15.50305847384395"
}

CONFLICT_SATELLITES = {
    "starlink": ["STARLINK-1", "STARLINK-2", "STARLINK-3"],
    "spy": ["USA ", "KH-11", "LACROSSE", "NROL"],
    "imaging": ["WORLDVIEW", "PLEIADES", "GEOEYE", "SKYSAT"],
    "radar": ["TerraSAR", "COSMO-SKYMED", "SAR-LUPE"],
}

ZONE_BBOX = {
    "sudan": (10, 20, 22, 38),
    "gaza": (31.0, 32.0, 32.5, 35.0),
    "ukraine": (44, 50, 35, 40),
    "sahel": (10, 20, -5, 25),
    "drc": (-5, 5, 25, 35),
}

class SatelliteTracker:
    def __init__(self):
        self.satellites = {}
        self.tle_cache = {}
        self.cache_time = 0
        self.cache_duration = 3600
    
    def get_iss_position(self) -> Satellite:
        try:
            response = requests.get(
                "http://api.open-notify.org/iss-now.json",
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                return Satellite(
                    name="ISS",
                    tle_line1="",
                    tle_line2="",
                    lat=float(data['iss_position']['latitude']),
                    lon=float(data['iss_position']['longitude']),
                    alt=420,
                    velocity=7.66,
                    visibility=self._check_visibility(0)
                )
        except:
            pass
        
        return Satellite(name="ISS", tle_line1="", tle_line2="")
    
    def _check_visibility(self, solar_zenith: float) -> str:
        if solar_zenith < 90:
            return "DAYLIGHT"
        elif solar_zenith < 100:
            return "TWILIGHT"
        return "NIGHT"
    
    def calculate_satellite_position(self, tle1: str, tle2: str, timestamp: datetime = None) -> Dict:
        if timestamp is None:
            timestamp = datetime.now()
        
        try:
            n0 = float(tle2[52:63]) * 2 * math.pi / 1440
            e = int(tle2[26:33], 10) * 1e-7
            i = float(tle2[7:16])
            Omega = float(tle2[16:25])
            omega = float(tle2[24:33])
            
            M = float(tle1[20:32]) * 2 * math.pi
            epoch_year = int(tle1[18:20]) + 2000
            epoch_day = float(tle1[20:32])
            
            jd = self._date_to_jd(timestamp)
            
            t = (jd - 2451545.0) / 36525
            n = n0 + 0.5 * t
            
            M_rad = math.radians(M)
            E = M_rad + e * math.sin(M_rad) * (1 + e * math.cos(M_rad))
            
            cos_E = math.cos(E)
            sin_E = math.sin(E)
            
            x = (1 - e**2) ** 0.5 * cos_E
            y = (1 - e**2) ** 0.5 * sin_E
            
            theta = math.atan2(y, x)
            r = (1 - e**2) / (1 + e * cos_E)
            
            nu = theta - omega
            
            p = r * (math.cos(nu) * math.cos(Omega) - math.sin(nu) * math.sin(Omega) * math.cos(i))
            q = r * (math.cos(nu) * math.sin(Omega) + math.sin(nu) * math.cos(Omega) * math.cos(i))
            w = r * (math.sin(nu) * math.sin(i))
            
            lat = math.degrees(math.atan2(w, (p**2 + q**2)**0.5))
            lon = math.degrees(math.atan2(q, p)) - (timestamp.hour + timestamp.minute/60) * 15
            alt = 6378 * (r - 1)
            
            return {"lat": lat, "lon": lon, "alt": alt}
        
        except Exception as e:
            return {"lat": 0, "lon": 0, "alt": 0}
    
    def _date_to_jd(self, dt: datetime) -> float:
        year = dt.year
        month = dt.month
        day = dt.day + (dt.hour + dt.minute/60 + dt.second/3600) / 24
        
        if month <= 2:
            year -= 1
            month += 12
        
        A = int(year / 100)
        B = 2 - A + int(A / 4)
        
        return int(365.25 * (year + 4716)) + int(30.6001 * (month + 1)) + day + B - 1524.5
    
    def get_satellites_over_zone(self, zone: str) -> List[Satellite]:
        zone_bbox = ZONE_BBOX.get(zone.lower())
        if not zone_bbox:
            return []
        
        lat_min, lat_max, lon_min, lon_max = zone_bbox
        
        position = self.get_iss_position()
        
        if (lat_min <= position.lat <= lat_max and 
            lon_min <= position.lon <= lon_max):
            return [position]
        
        return []
    
    def get_all_visible_satellites(self) -> List[Dict]:
        position = self.get_iss_position()
        
        return [{
            "name": position.name,
            "lat": position.lat,
            "lon": position.lon,
            "alt": position.alt,
            "velocity": position.velocity,
            "zone": self._detect_nearest_zone(position.lat, position.lon)
        }]
    
    def _detect_nearest_zone(self, lat: float, lon: float) -> str:
        min_distance = float('inf')
        nearest_zone = "unknown"
        
        for zone, bbox in ZONE_BBOX.items():
            lat_min, lat_max, lon_min, lon_max = bbox
            zone_lat = (lat_min + lat_max) / 2
            zone_lon = (lon_min + lon_max) / 2
            
            distance = ((lat - zone_lat)**2 + (lon - zone_lon)**2)**0.5
            
            if distance < min_distance:
                min_distance = distance
                nearest_zone = zone
        
        return nearest_zone

def main():
    tracker = SatelliteTracker()
    
    print("Satellite Tracker initialized")
    print(f"ISS Position: {tracker.get_iss_position()}")

if __name__ == "__main__":
    main()
