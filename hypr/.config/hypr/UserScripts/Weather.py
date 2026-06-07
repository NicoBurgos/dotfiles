#!/usr/bin/env python3
# /* ---- 💫 https://github.com/JaKooLit 💫 ---- */  #
# Weather module for waybar — powered by Open-Meteo (no API key, no scraping).
# Docs: https://open-meteo.com/en/docs

import json
import os
import sys
import urllib.error
import urllib.request


weather_icons = {
    "sunnyDay": "󰖙",
    "clearNight": "󰖔",
    "cloudyFoggyDay": "",
    "cloudyFoggyNight": "",
    "rainyDay": "",
    "rainyNight": "",
    "snowyIcyDay": "",
    "snowyIcyNight": "",
    "severe": "",
    "default": "",
}


def fetch_json(url, timeout=10):
    req = urllib.request.Request(url, headers={"User-Agent": "waybar-weather/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def get_location():
    """Best-effort geolocation via public IP. Returns (lat, lon) or None on failure."""
    try:
        data = fetch_json("https://ipinfo.io/json")
        lat, lon = data["loc"].split(",")
        return float(lat), float(lon)
    except (urllib.error.URLError, KeyError, ValueError, json.JSONDecodeError):
        return None


# WMO weather codes (https://open-meteo.com/en/docs#weathervariables)
# Returns (status_code, status_phrase). status_code maps to weather_icons keys.
def wmo_to_status(code, is_day):
    day = is_day == 1
    if code == 0:
        return ("sunnyDay" if day else "clearNight", "Clear")
    if code in (1, 2):
        return ("cloudyFoggyDay" if day else "cloudyFoggyNight", "Partly cloudy")
    if code == 3:
        return ("cloudyFoggyDay", "Overcast")
    if code in (45, 48):
        return ("cloudyFoggyDay", "Fog")
    if code in (51, 53, 55, 56, 57):
        return ("rainyDay", "Drizzle")
    if code in (61, 63, 65, 66, 67):
        return ("rainyDay", "Rain")
    if code in (71, 73, 75, 77):
        return ("snowyIcyDay", "Snow")
    if code in (80, 81, 82):
        return ("rainyDay", "Rain showers")
    if code in (85, 86):
        return ("snowyIcyDay", "Snow showers")
    if code in (95, 96, 99):
        return ("severe", "Thunderstorm")
    return ("default", "Unknown")


def main():
    coords = get_location()
    if coords is None:
        raise SystemExit("Unable to determine location")

    lat, lon = coords
    url = (
        f"https://api.open-meteo.com/v1/forecast"
        f"?latitude={lat}&longitude={lon}"
        f"&current=temperature_2m,apparent_temperature,relative_humidity_2m,"
        f"is_day,precipitation,weather_code,wind_speed_10m"
        f"&daily=temperature_2m_max,temperature_2m_min"
        f"&timezone=auto&wind_speed_unit=kmh&temperature_unit=celsius"
    )

    data = fetch_json(url)
    current = data["current"]
    daily = data["daily"]

    temp = current["temperature_2m"]
    temp_feel = current["apparent_temperature"]
    humidity = current["relative_humidity_2m"]
    wind_speed = current["wind_speed_10m"]
    is_day = current["is_day"]
    status_code, status_phrase = wmo_to_status(current["weather_code"], is_day)

    icon = weather_icons.get(status_code, weather_icons["default"])

    status_display = f"{status_phrase[:16]}.." if len(status_phrase) > 17 else status_phrase

    temp_min = daily["temperature_2m_min"][0]
    temp_max = daily["temperature_2m_max"][0]

    tooltip_text = "\t\t{}\t\t\n{}\n{}\n{}\n\n{}\n{}\n".format(
        f'<span size="xx-large">{temp}°C</span>',
        f"<big> {icon}</big>",
        f"<b>{status_display}</b>",
        f"<small>Feels like {temp_feel}°C</small>",
        f"<b>  {temp_min}°C\t\t  {temp_max}°C</b>",
        f"  {wind_speed} km/h\t  {humidity}%",
    )

    out_data = {
        "text": f"{icon}  {temp}°C",
        "alt": status_phrase,
        "tooltip": tooltip_text,
        "class": status_code,
    }
    print(json.dumps(out_data))

    simple_weather = (
        f"{icon}  {status_phrase}\n"
        f" {temp}°C (Feels like {temp_feel}°C)\n"
        f" {wind_speed} km/h \n"
        f"  {humidity}% \n"
    )
    try:
        with open(os.path.expanduser("~/.cache/.weather_cache"), "w") as f:
            f.write(simple_weather)
    except OSError as e:
        print(f"Error writing to cache: {e}", file=sys.stderr)


if __name__ == "__main__":
    try:
        main()
    except (urllib.error.URLError, KeyError, ValueError, json.JSONDecodeError) as e:
        print(f"Weather fetch failed: {e}", file=sys.stderr)
        sys.exit(1)
