import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useLocation } from "react-router-dom";

// EmailJS Configuration - Get these from https://dashboard.emailjs.com/
const EMAIL_JS_SERVICE_ID = "service_3siel98"; // Success? It should look like 'service_xxxx'
const EMAIL_JS_TEMPLATE_ID = "template_tb8fvm8"; // Success? It should look like 'template_xxxx'
const EMAIL_JS_PUBLIC_KEY = "_A52X4huuCdkTDvQD";

interface DeviceInfo {
  ip: string;
  userAgent: string;
  os: string;
  manufacturer: string;
  browser: string;
  resolution: string;
  language: string;
  path: string;
  referrer: string;
  timestamp: string;
}

interface UABrandEntity {
  brand: string;
  version: string;
}

interface NavigatorUAData {
  brands: UABrandEntity[];
  mobile: boolean;
  platform: string;
  getHighEntropyValues: (hints: string[]) => Promise<{
    model?: string;
    platformVersion?: string;
    fullVersionList?: UABrandEntity[];
  }>;
}

interface NavigatorWithUAData extends Navigator {
  userAgentData?: NavigatorUAData;
}

export function useDeviceTracking() {
  const location = useLocation();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per session/mount
    if (hasTracked.current) return;

    const trackDevice = async () => {
      try {
        // 1. Get IP Address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();

        // 2. Gather Browser Info
        const ua = navigator.userAgent;
        let os = "Unknown OS";
        if (ua.indexOf("Win") !== -1) os = "Windows";
        if (ua.indexOf("Mac") !== -1) os = "MacOS";
        if (ua.indexOf("X11") !== -1) os = "UNIX";
        if (ua.indexOf("Linux") !== -1) os = "Linux";
        if (ua.indexOf("Android") !== -1) os = "Android";
        if (ua.indexOf("like Mac") !== -1) os = "iOS";
        if (ua.indexOf("iPhone") !== -1) os = "iOS";
        if (ua.indexOf("iPad") !== -1) os = "iOS";

        // Better browser detection
        let browserName = "Unknown";
        if (ua.indexOf("Firefox") !== -1) browserName = "Mozilla Firefox";
        else if (ua.indexOf("SamsungBrowser") !== -1)
          browserName = "Samsung Internet";
        else if (ua.indexOf("Opera") !== -1 || ua.indexOf("OPR") !== -1)
          browserName = "Opera";
        else if (ua.indexOf("Trident") !== -1)
          browserName = "Internet Explorer";
        else if (ua.indexOf("Edge") !== -1) browserName = "Microsoft Edge";
        else if (ua.indexOf("Chrome") !== -1) browserName = "Google Chrome";
        else if (ua.indexOf("Safari") !== -1) browserName = "Safari";

        // Manufacturer detection
        let manufacturer = "Unknown";
        if (/iPhone|iPad|iPod|Macintosh/i.test(ua)) manufacturer = "Apple";
        else if (/Samsung|SM-|SAMSUNG/i.test(ua)) manufacturer = "Samsung";
        else if (/Huawei|HONOR/i.test(ua)) manufacturer = "Huawei";
        else if (/Xiaomi|Redmi|POCO/i.test(ua)) manufacturer = "Xiaomi";
        else if (/Pixel|Nexus/i.test(ua)) manufacturer = "Google";
        else if (/Sony|Xperia/i.test(ua)) manufacturer = "Sony";
        else if (/LG-|LGE-/i.test(ua)) manufacturer = "LG";
        else if (/Motorola|Moto/i.test(ua)) manufacturer = "Motorola";
        else if (/Oppo/i.test(ua)) manufacturer = "Oppo";
        else if (/Vivo/i.test(ua)) manufacturer = "Vivo";
        else if (/HP|Hewlett-Packard|HPN|HPPX/i.test(ua)) manufacturer = "HP";
        else if (/Dell/i.test(ua)) manufacturer = "Dell";
        else if (/Lenovo|Yoga|ThinkPad/i.test(ua)) manufacturer = "Lenovo";
        else if (/ASUS|ZenBook/i.test(ua)) manufacturer = "ASUS";
        else if (/Acer|Aspire|Swift/i.test(ua)) manufacturer = "Acer";
        else if (/MSI/i.test(ua)) manufacturer = "MSI";
        else if (/Microsoft|Surface/i.test(ua)) manufacturer = "Microsoft";

        // Try modern userAgentData API as a fallback (Chromium only)
        let debugUAData = "Not Supported";
        const uaData = (navigator as NavigatorWithUAData).userAgentData;
        if (uaData) {
          try {
            const brands = uaData.brands
              .map((b: UABrandEntity) => b.brand)
              .join(", ");
            const highEntropy = await uaData.getHighEntropyValues([
              "model",
              "platformVersion",
              "fullVersionList",
            ]);
            debugUAData = `Brands: ${brands} | Model: ${highEntropy.model} | PlatformVer: ${highEntropy.platformVersion}`;

            if (manufacturer === "Unknown") {
              if (/HP|Hewlett-Packard/i.test(brands)) manufacturer = "HP";
              else if (
                highEntropy.model &&
                /HP|Hewlett-Packard/i.test(highEntropy.model)
              )
                manufacturer = "HP";
              else if (highEntropy.model && highEntropy.model !== "")
                manufacturer = highEntropy.model;
            }
          } catch (err) {
            const e = err as Error;
            debugUAData = `Error: ${e.message}`;
          }
        }

        const deviceInfo: DeviceInfo = {
          ip: ipData.ip,
          userAgent: ua,
          os: os,
          manufacturer: manufacturer,
          browser: browserName,
          resolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          path: location.pathname,
          referrer: document.referrer || "Direct",
          timestamp: new Date().toLocaleString(), // Use local string for readability
        };

        // 3. Send Email via EmailJS
        // Mapping our data to YOUR template variables: {{name}}, {{time}}, {{message}}
        await emailjs.send(
          EMAIL_JS_SERVICE_ID,
          EMAIL_JS_TEMPLATE_ID,
          {
            name: "English Master Visitor",
            time: deviceInfo.timestamp,
            message: `
- IP: ${deviceInfo.ip}
- Brand: ${deviceInfo.manufacturer}
- Device: ${deviceInfo.os} (${deviceInfo.browser})
- Resolution: ${deviceInfo.resolution}
- Page: ${deviceInfo.path}
- Referrer: ${deviceInfo.referrer}
- Language: ${deviceInfo.language}
- Debug Info: ${debugUAData}
- Debug UA: ${deviceInfo.userAgent}
            `.trim(),
          },
          EMAIL_JS_PUBLIC_KEY,
        );

        hasTracked.current = true;
      } catch (err) {
        const e = err as Error;
        console.error("Error tracking device:", e.message);
      }
    };

    trackDevice();
  }, [location.pathname]);
}
