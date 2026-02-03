// import { useState, useEffect } from "react";

const DeviceDetector = () => {
    let deviceType = '';
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator as any) {
      hasTouchScreen = (navigator as any).maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator as any) {
      hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;
    } else {
      const mQ = (window as any).matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
        deviceType = "Mobile";
    } else {
        deviceType = "Desktop";
    }

  return deviceType;
};

export default DeviceDetector;