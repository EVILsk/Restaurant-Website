var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_config3 = require("dotenv/config");
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/services/automationServer.ts
var import_app2 = require("firebase/app");
var import_firestore3 = require("firebase/firestore");
var import_auth2 = require("firebase/auth");

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "sample-restaurant-93f4e",
  appId: "1:985774955747:web:ea6b2239541e2d6c3e79d6",
  apiKey: "AIzaSyBmhvaXPDM7R6tsFCf_FwEHkGOwa9CqgpQ",
  authDomain: "sample-restaurant-93f4e.firebaseapp.com",
  firestoreDatabaseId: "(default)",
  storageBucket: "sample-restaurant-93f4e.firebasestorage.app",
  messagingSenderId: "985774955747",
  measurementId: ""
};

// src/services/emailTemplates.ts
function buildHtmlEmail(subject, message, eventType, vars) {
  const restaurantName = vars.restaurantName || "Spice Garden";
  const contactNumber = vars.contactNumber || "+91 9876543210";
  const address = vars.address || "123 Curry Lane, Royal Food Court, Bangalore";
  const appUrl = vars.appUrl || "https://spicegarden.com";
  const googleReviewUrl = vars.googleReviewUrl || "https://g.page/r/spice-garden-review/review";
  let addressPanel = "";
  if (vars.deliveryAddress) {
    addressPanel = `
      <div style="margin-top: 20px; background-color: #faf9f6; border-left: 4px solid #ea580c; padding: 12px 16px; border-radius: 0 12px 12px 0; text-align: left;">
        <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #ea580c; display: block; margin-bottom: 4px;">Delivery Location</span>
        <span style="font-size: 13px; color: #1f2937; line-height: 1.4;">${vars.deliveryAddress}</span>
      </div>
    `;
  }
  let deliveryPartnerPanel = "";
  if (vars.deliveryPartner) {
    deliveryPartnerPanel = `
      <div style="margin-top: 20px; background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 16px; border-radius: 12px; text-align: left; display: flex; align-items: center;">
        <div style="font-size: 24px; margin-right: 12px;">\u{1F6B2}</div>
        <div>
          <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; color: #166534; display: block;">Delivery Fleet Partner Assigned</span>
          <strong style="font-size: 14px; color: #14532d; display: block; margin-top: 2px;">${vars.deliveryPartner}</strong>
        </div>
      </div>
    `;
  }
  let reservationPanel = "";
  if (vars.reservationDate && vars.reservationTime) {
    reservationPanel = `
      <div style="margin-top: 20px; background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 16px; padding: 16px; text-align: left;">
        <h4 style="margin: 0 0 12px 0; color: #111827; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px;">Reservation Log</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <tr>
            <td style="padding: 4px 0; color: #4b5563;"><strong>Booking Date:</strong></td>
            <td style="padding: 4px 0; text-align: right; color: #111827;">${vars.reservationDate}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #4b5563;"><strong>Timing Slot:</strong></td>
            <td style="padding: 4px 0; text-align: right; color: #111827;">${vars.reservationTime}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #4b5563;"><strong>Guest Count:</strong></td>
            <td style="padding: 4px 0; text-align: right; color: #111827;">${vars.guestCount || 1} Guests</td>
          </tr>
          ${vars.reservationId ? `
          <tr>
            <td style="padding: 4px 0; color: #4b5563;"><strong>Reservation ID:</strong></td>
            <td style="padding: 4px 0; text-align: right; color: #ea580c; font-family: monospace; font-weight: bold;">#${vars.reservationId.slice(-6).toUpperCase()}</td>
          </tr>
          ` : ""}
        </table>
      </div>
    `;
  }
  let buttonsHtml = "";
  if (eventType === "DELIVERED") {
    buttonsHtml = `
      <div style="margin-top: 24px; text-align: center;">
        <a href="${googleReviewUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 6px; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.15);">\u2605 Leave a Google Review</a>
        <a href="${appUrl}/orders" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 6px;">Rate Your Order</a>
      </div>
    `;
  } else if (eventType === "VISIT_COMPLETED") {
    buttonsHtml = `
      <div style="margin-top: 24px; text-align: center;">
        <a href="${googleReviewUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 6px; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.15);">\u2605 Leave a Google Review</a>
        <a href="${appUrl}/orders" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 6px;">Rate Your Booking</a>
      </div>
    `;
  } else if (eventType === "NO_SHOW") {
    buttonsHtml = `
      <div style="margin-top: 24px; text-align: center;">
        <a href="${appUrl}/reservations" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 12px 24px; font-size: 13px; font-weight: bold; text-decoration: none; border-radius: 12px; margin: 6px; box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.15);">Book Again</a>
      </div>
    `;
  }
  let orderItemsTable = "";
  if (vars.orderItems) {
    orderItemsTable = `
      <div style="margin-top: 20px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
        <h4 style="margin: 0 0 12px 0; color: #111827; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Order Details</h4>
        ${vars.orderItems}
      </div>
    `;
  }
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
  <style>
    @media (prefers-color-scheme: dark) {
      body { background-color: #0b0f19 !important; color: #f3f4f6 !important; }
      .email-card { background-color: #111827 !important; border-color: #1f2937 !important; }
      .header-title { color: #f97316 !important; }
      .text-title { color: #ffffff !important; }
      .text-body { color: #d1d5db !important; }
      .footer-text { color: #9ca3af !important; }
      .divider { border-color: #1f2937 !important; }
    }
  </style>
</head>
<body style="font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #fafbfc; margin: 0; padding: 40px 10px; -webkit-font-smoothing: antialiased; text-align: center;">

  <div class="email-card" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eaeef2; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.02), 0 4px 6px -4px rgba(0, 0, 0, 0.02); overflow: hidden; padding: 32px; text-align: left;">
    
    <!-- Branding Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;" class="divider">
      <div style="display: flex; align-items: center;">
        <span style="font-size: 24px; margin-right: 8px;">\u{1F336}\uFE0F</span>
        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #111827; letter-spacing: -0.02em;" class="header-title">${restaurantName}</h2>
      </div>
      ${vars.orderId ? `
        <span style="font-size: 11px; font-weight: bold; background-color: #fff7ed; color: #ea580c; padding: 4px 10px; border-radius: 6px; font-family: monospace;">#${vars.orderId.slice(-6).toUpperCase()}</span>
      ` : ""}
    </div>

    <!-- Title / Headline -->
    <h1 style="font-size: 22px; font-weight: 800; color: #111827; margin: 0 0 12px 0; tracking-tight: -0.01em;" class="text-title">
      ${subject}
    </h1>

    <p style="font-size: 15px; line-height: 1.6; color: #4b5563; margin: 0 0 16px 0;" class="text-body">
      Hi ${vars.customerName || "Valued Customer"},
    </p>

    <!-- Specific Structured Message Body -->
    <div style="font-size: 15px; line-height: 1.6; color: #4b5563;" class="text-body">
      ${message}
    </div>

    <!-- Context Modules -->
    ${addressPanel}
    ${deliveryPartnerPanel}
    ${reservationPanel}
    ${orderItemsTable}
    ${buttonsHtml}

    <div style="margin-top: 32px; border-top: 1px solid #f3f4f6; padding-top: 24px;" class="divider">
      <p style="font-size: 12px; color: #6b7280; text-align: center; margin: 0 0 12px 0;" class="footer-text">
        Spice Garden Delivery Fleet Engine. If you have any inquiries, contact our guest relationships desk at <strong style="color: #111827;" class="text-title">${contactNumber}</strong>.
      </p>
      
      <!-- Social Link Badges -->
      <div style="text-align: center; margin-bottom: 16px;">
        <a href="#" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ea580c; font-size: 13px; font-weight: bold;">Facebook</a> \u2022
        <a href="#" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ea580c; font-size: 13px; font-weight: bold;">Instagram</a> \u2022
        <a href="#" style="display: inline-block; margin: 0 6px; text-decoration: none; color: #ea580c; font-size: 13px; font-weight: bold;">Twitter</a>
      </div>

      <p style="font-size: 11px; color: #9ca3af; text-align: center; margin: 0;" class="footer-text">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} ${restaurantName}. All rights reserved. <br>
        ${address}
      </p>
    </div>

  </div>

</body>
</html>
`;
}
function buildOrderItemsTable(items) {
  if (!items || items.length === 0) return "";
  let html = `
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
      <thead>
        <tr style="border-bottom: 2px solid #f3f4f6; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;" class="divider">
          <th style="padding: 8px 0; font-weight: bold;">Item</th>
          <th style="padding: 8px 0; text-align: center; font-weight: bold; width: 60px;">Quantity</th>
          <th style="padding: 8px 0; text-align: right; font-weight: bold; width: 100px;">Price</th>
        </tr>
      </thead>
      <tbody>
  `;
  items.forEach((item) => {
    html += `
      <tr style="border-bottom: 1px solid #f3f4f6;" class="divider">
        <td style="padding: 12px 0; color: #111827;" class="text-title">
          <strong style="display: block;">${item.name}</strong>
        </td>
        <td style="padding: 12px 0; text-align: center; color: #4b5563;" class="text-body">${item.quantity}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #111827;" class="text-title">\u20B9${item.price * item.quantity}</td>
      </tr>
    `;
  });
  html += `
      </tbody>
    </table>
  `;
  return html;
}

// src/firebase/config.ts
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
var import_firestore = require("firebase/firestore");
var import_storage = require("firebase/storage");
var import_meta = {};
var firebaseConfig = {
  apiKey: import_meta.env?.VITE_FIREBASE_API_KEY || firebase_applet_config_default.apiKey,
  authDomain: import_meta.env?.VITE_FIREBASE_AUTH_DOMAIN || firebase_applet_config_default.authDomain,
  projectId: import_meta.env?.VITE_FIREBASE_PROJECT_ID || firebase_applet_config_default.projectId,
  storageBucket: import_meta.env?.VITE_FIREBASE_STORAGE_BUCKET || firebase_applet_config_default.storageBucket,
  messagingSenderId: import_meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || firebase_applet_config_default.messagingSenderId,
  appId: import_meta.env?.VITE_FIREBASE_APP_ID || firebase_applet_config_default.appId,
  firestoreDatabaseId: import_meta.env?.VITE_FIREBASE_DATABASE_ID || firebase_applet_config_default.firestoreDatabaseId
};
var app = (0, import_app.getApps)().length === 0 ? (0, import_app.initializeApp)(firebaseConfig) : (0, import_app.getApp)();
var auth = (0, import_auth.getAuth)(app);
var storage = (0, import_storage.getStorage)(app, firebaseConfig.storageBucket);
var firestoreSettings = {};
var db = (0, import_firestore.initializeFirestore)(app, firestoreSettings, firebaseConfig.firestoreDatabaseId);

// src/services/settingsService.ts
var import_firestore2 = require("firebase/firestore");
var defaultSettings = {
  timeSlots: [
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM",
    "09:00 PM"
  ],
  daySlots: {
    "Monday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Tuesday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Wednesday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Thursday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Friday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Saturday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ],
    "Sunday": [
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
      "05:30 PM",
      "06:00 PM",
      "06:30 PM",
      "07:00 PM",
      "07:30 PM",
      "08:00 PM",
      "08:30 PM",
      "09:00 PM"
    ]
  },
  restaurantName: "The Royal Spice",
  contactNumber: "+91 9876543210",
  address: "123 Spice Garden Landmark, Indiranagar, Bengaluru, Karnataka 560038",
  maxPartySize: 10,
  useManualTime: false,
  manualTime: "12:00",
  manualDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
  manualTimeSetAt: Date.now(),
  restaurantLatitude: 12.9716,
  // Defaults to Bangalore central
  restaurantLongitude: 77.5946,
  deliveryRangeKm: 5,
  menuEnabled: true,
  reservationsEnabled: true,
  orderTimingEnabled: false,
  orderStartTime: "09:00",
  orderEndTime: "22:00"
};
var getCurrentSystemTime = (settings) => {
  const realNow = /* @__PURE__ */ new Date();
  if (!settings || !settings.useManualTime || !settings.manualTimeSetAt) {
    return realNow;
  }
  try {
    const [year, month, day] = (settings.manualDate || realNow.toISOString().split("T")[0]).split("-").map(Number);
    const baseDate = new Date(year, month - 1, day);
    const parseTimeLocal = (timeStr, base) => {
      const d = new Date(base);
      if (timeStr.includes(" ")) {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        d.setHours(hours, minutes, 0, 0);
      } else {
        const [hours, minutes] = timeStr.split(":").map(Number);
        d.setHours(hours, minutes, 0, 0);
      }
      return d;
    };
    const baseVirtualTime = parseTimeLocal(settings.manualTime, baseDate).getTime();
    const timeElapsed = Date.now() - settings.manualTimeSetAt;
    return new Date(baseVirtualTime + timeElapsed);
  } catch (e) {
    console.error("Error calculating virtual time:", e);
    return realNow;
  }
};

// src/services/automationServer.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var firebaseConfig2 = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY || firebase_applet_config_default.apiKey,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN || firebase_applet_config_default.authDomain,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || firebase_applet_config_default.projectId,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET || firebase_applet_config_default.storageBucket,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID || firebase_applet_config_default.messagingSenderId,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID || firebase_applet_config_default.appId,
  firestoreDatabaseId: process.env.VITE_FIREBASE_DATABASE_ID || process.env.FIREBASE_DATABASE_ID || firebase_applet_config_default.firestoreDatabaseId
};
var logFilePath = import_path.default.join(process.cwd(), "automation_logs.txt");
try {
  import_fs.default.writeFileSync(logFilePath, `=== Automation Engine Logs: Started ${(/* @__PURE__ */ new Date()).toISOString()} ===
`, "utf8");
} catch (e) {
}
function logToFile(level, ...args) {
  const dateStr = (/* @__PURE__ */ new Date()).toISOString();
  const msg = args.map((arg) => typeof arg === "object" ? arg instanceof Error ? arg.stack || arg.message : JSON.stringify(arg) : String(arg)).join(" ");
  const logLine = `[${dateStr}] [${level}] ${msg}
`;
  try {
    import_fs.default.appendFileSync(logFilePath, logLine, "utf8");
  } catch (err) {
  }
}
var originalLog = console.log;
var originalError = console.error;
var originalWarn = console.warn;
console.log = (...args) => {
  originalLog(...args);
  logToFile("INFO", ...args);
};
console.error = (...args) => {
  originalError(...args);
  logToFile("ERROR", ...args);
};
console.warn = (...args) => {
  originalWarn(...args);
  logToFile("WARN", ...args);
};
var app2 = (0, import_app2.getApps)().length === 0 ? (0, import_app2.initializeApp)(firebaseConfig2) : (0, import_app2.getApp)();
var db2 = (0, import_firestore3.getFirestore)(app2, firebaseConfig2.firestoreDatabaseId);
var auth2 = (0, import_auth2.getAuth)(app2);
var serverStartTime = Date.now();
console.log(`[BACKEND INITIALIZATION]:
  DatabaseID: ${firebaseConfig2.firestoreDatabaseId}
  Running via client-side Web SDK authenticated as Admin. Express Server Start Time: ${new Date(serverStartTime).toISOString()}
`);
var activeUnsubscribers = [];
var activeIntervals = [];
var isFirebaseClientAuthenticated = false;
async function ensureAuthenticated() {
  if (isFirebaseClientAuthenticated && auth2.currentUser) return;
  try {
    const userCredential = await (0, import_auth2.signInWithEmailAndPassword)(auth2, "admin@gmail.com", "admin6");
    isFirebaseClientAuthenticated = true;
    console.log("\u{1F512} [BACKEND AUTHENTICATION]: Server client-side Web SDK signed in successfully as admin (admin@gmail.com)!");
    try {
      const user = userCredential.user;
      await (0, import_firestore3.setDoc)((0, import_firestore3.doc)(db2, "users", user.uid), {
        uid: user.uid,
        email: "admin@gmail.com",
        displayName: "System Admin",
        role: "admin",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }, { merge: true });
      console.log("\u2705 [BACKEND AUTH]: Fail-safe admin user document verified in /users collection via server client!");
    } catch (saveErr) {
      console.warn("\u26A0\uFE0F [BACKEND AUTH]: Fail-safe admin user document write bypassed on server client:", saveErr.message);
    }
  } catch (err) {
    console.log("\u26A0\uFE0F [BACKEND AUTHENTICATION]: Sign in as admin failed, attempting to bootstrap/register admin account...", err.message);
    try {
      const userCredential = await (0, import_auth2.createUserWithEmailAndPassword)(auth2, "admin@gmail.com", "admin6");
      isFirebaseClientAuthenticated = true;
      console.log("\u{1F512} [BACKEND AUTHENTICATION]: Server client-side Web SDK registered & signed in successfully as admin (admin@gmail.com)!");
      const user = userCredential.user;
      await (0, import_firestore3.setDoc)((0, import_firestore3.doc)(db2, "users", user.uid), {
        uid: user.uid,
        email: "admin@gmail.com",
        displayName: "System Admin",
        role: "admin",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }, { merge: true });
      console.log("\u2705 [BACKEND AUTH]: Admin user bootstrapped in /users collection via server client!");
    } catch (signupErr) {
      console.error("\u274C [BACKEND AUTHENTICATION ERROR]: Failed to sign in or register server-side client Web SDK as admin. Error:", signupErr.message);
    }
  }
}
var processingEmails = /* @__PURE__ */ new Set();
async function triggerEmail(toEmail, toName, subject, message, emailType, refId, refType, extraVars = {}) {
  const lockKey = `${refId}_${emailType}`;
  if (processingEmails.has(lockKey)) {
    console.log(`Automation Engine [MEM LOCK]: Already processing/sent ${emailType} for ${refId}. Skipping duplicate request.`);
    return true;
  }
  processingEmails.add(lockKey);
  if (!toEmail) {
    console.error(`Automation Engine: Cannot dispatch email because recipient address is undefined.`);
    processingEmails.delete(lockKey);
    return false;
  }
  try {
    await ensureAuthenticated();
    const qDup = (0, import_firestore3.query)(
      (0, import_firestore3.collection)(db2, "email_logs"),
      (0, import_firestore3.where)(refType, "==", refId),
      (0, import_firestore3.where)("emailType", "==", emailType),
      (0, import_firestore3.where)("status", "==", "success")
    );
    const existingLogSnap = await (0, import_firestore3.getDocs)(qDup);
    if (!existingLogSnap.empty) {
      console.log(`Automation Engine: Email skip triggered. Duplicate prevented for ${emailType} on ${refType} ${refId}`);
      return true;
    }
    let settings = {};
    try {
      const settingsSnap = await (0, import_firestore3.getDoc)((0, import_firestore3.doc)(db2, "settings", "general"));
      if (settingsSnap.exists()) {
        settings = settingsSnap.data() || {};
      }
    } catch (err) {
      console.warn("Automation Engine: Could not fetch real-time settings, falling back to static defaults.", err);
    }
    const vars = {
      customerName: toName,
      restaurantName: settings.restaurantName || "The Royal Spice",
      contactNumber: settings.contactNumber || "+91 9876543210",
      address: settings.address || "123 Spice Garden Landmark, Indiranagar, Bengaluru, Karnataka 560038",
      ...extraVars
    };
    const finalHtml = buildHtmlEmail(subject, message, emailType, vars);
    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@spicegarden.com";
    const senderName = process.env.BREVO_SENDER_NAME || "Spice Garden";
    let isMock = !brevoApiKey;
    let errorMsg = null;
    let brevoResponsePayload = "";
    if (!isMock) {
      try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: toEmail, name: toName || "Valued Customer" }],
            subject,
            htmlContent: finalHtml
          })
        });
        brevoResponsePayload = await response.text();
        if (!response.ok) {
          let parsedError = {};
          try {
            parsedError = JSON.parse(brevoResponsePayload);
          } catch {
            parsedError = { error: brevoResponsePayload };
          }
          errorMsg = parsedError.message || brevoResponsePayload;
          const isUnactivated = errorMsg.toLowerCase().includes("not yet activated") || errorMsg.toLowerCase().includes("permission_denied");
          const isIpBlocked = errorMsg.toLowerCase().includes("unrecognised ip") || errorMsg.toLowerCase().includes("authorised_ips");
          if (isUnactivated || isIpBlocked) {
            console.warn(`Automation Engine Fallback: Switching to mock delivery. Reason: ${errorMsg}`);
            isMock = true;
            errorMsg = null;
          } else {
            throw new Error(`Brevo SMTP failure: ${errorMsg}`);
          }
        }
      } catch (fe) {
        errorMsg = fe.message || "SMTP request connection failure";
      }
    }
    if (isMock) {
      console.log(`\u{1F916} [MOCK RUNNER DISPATCH - ${emailType}]:
        To: ${toName} <${toEmail}>
        Subject: ${subject}
        Ref ID: ${refId} (${refType})
        Message Sample: "${message.slice(0, 75)}..."
      `);
    }
    await (0, import_firestore3.addDoc)((0, import_firestore3.collection)(db2, "email_logs"), {
      recipientEmail: toEmail,
      recipientName: toName,
      subject,
      emailType,
      status: errorMsg ? "failed" : "success",
      errorMessage: errorMsg,
      sentAt: (/* @__PURE__ */ new Date()).toISOString(),
      [refType]: refId,
      isMockMode: isMock,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (errorMsg) {
      processingEmails.delete(lockKey);
    }
    return !errorMsg;
  } catch (err) {
    processingEmails.delete(lockKey);
    console.error(`Automation Engine Exception: Critical error during dispatching of ${emailType}`, err);
    try {
      await (0, import_firestore3.addDoc)((0, import_firestore3.collection)(db2, "email_logs"), {
        recipientEmail: toEmail,
        recipientName: toName,
        subject,
        emailType,
        status: "failed",
        errorMessage: err.message || "Unhandled Engine Error",
        sentAt: (/* @__PURE__ */ new Date()).toISOString(),
        [refType]: refId,
        isMockMode: true,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch {
    }
    return false;
  }
}
async function runEmailRetryLoop() {
  try {
    await ensureAuthenticated();
    const qFailed = (0, import_firestore3.query)((0, import_firestore3.collection)(db2, "email_logs"), (0, import_firestore3.where)("status", "==", "failed"));
    const snap = await (0, import_firestore3.getDocs)(qFailed);
    if (snap.empty) return;
    console.log(`Automation Engine Scheduler: Retrying ${snap.size} failed email dispatcher logs...`);
    for (const d of snap.docs) {
      const data = d.data();
      const refId = data.orderId || data.reservationId;
      const refType = data.orderId ? "orderId" : "reservationId";
      let detailsValid = false;
      let orderData = null;
      let reservationData = null;
      if (refType === "orderId") {
        const oSnap = await (0, import_firestore3.getDoc)((0, import_firestore3.doc)(db2, "orders", refId));
        detailsValid = oSnap.exists();
        if (detailsValid) {
          orderData = oSnap.data();
        }
      } else {
        const rSnap = await (0, import_firestore3.getDoc)((0, import_firestore3.doc)(db2, "reservations", refId));
        detailsValid = rSnap.exists();
        if (detailsValid) {
          reservationData = rSnap.data();
        }
      }
      if (!detailsValid) {
        console.warn(`Automation Engine Retry: Cleaned abandoned failed log pointing to deleted ${refType} ${refId}`);
        await (0, import_firestore3.updateDoc)((0, import_firestore3.doc)(db2, "email_logs", d.id), {
          status: "abandoned",
          errorMessage: "Original document deleted",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
        continue;
      }
      const extraVars = {};
      if (refType === "orderId") {
        if (orderData) {
          extraVars.orderId = refId;
          extraVars.orderItems = buildOrderItemsTable(orderData.items || []);
          extraVars.deliveryAddress = orderData.address;
        }
      } else {
        if (reservationData) {
          extraVars.reservationId = refId;
          extraVars.reservationDate = reservationData.date;
          extraVars.reservationTime = reservationData.time;
          extraVars.guestCount = reservationData.guests;
        }
      }
      const success = await triggerEmail(
        data.recipientEmail,
        data.recipientName,
        data.subject,
        `Retried after initial delivery block. Original log notes: ${data.errorMessage || "Unknown failure"}. 

${data.subject}`,
        data.emailType,
        refId,
        refType,
        extraVars
      );
      if (success) {
        console.log(`Automation Engine Retry Success: Successfully processed retry for log ${d.id}`);
        await (0, import_firestore3.updateDoc)((0, import_firestore3.doc)(db2, "email_logs", d.id), {
          status: "success",
          errorMessage: null,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    }
  } catch (err) {
    console.error("Automation Engine Scheduler: Error in email retry scheduler loop: ", err);
  }
}
async function runReservationReminderLoop() {
  try {
    await ensureAuthenticated();
    let settings = null;
    try {
      const settingsSnap = await (0, import_firestore3.getDoc)((0, import_firestore3.doc)(db2, "settings", "general"));
      settings = settingsSnap.exists() ? settingsSnap.data() : null;
      console.log(`[DEBUG REMINDER]: settings/general fetched successfully. exists: ${settingsSnap.exists()}`);
    } catch (settingsErr) {
      console.error("[DEBUG REMINDER ERROR] Failed to fetch settings/general: ", settingsErr);
      throw settingsErr;
    }
    const virtualNow = getCurrentSystemTime(settings);
    const nowISOString = virtualNow.toISOString();
    const currentDateString = nowISOString.split("T")[0];
    let snap;
    try {
      const qReservations = (0, import_firestore3.query)(
        (0, import_firestore3.collection)(db2, "reservations"),
        (0, import_firestore3.where)("status", "==", "confirmed"),
        (0, import_firestore3.where)("date", "==", currentDateString)
      );
      snap = await (0, import_firestore3.getDocs)(qReservations);
      console.log(`[DEBUG REMINDER]: reservations query fetched successfully. found count: ${snap.size}`);
    } catch (resErr) {
      console.error("[DEBUG REMINDER ERROR] Failed to query reservations collection: ", resErr);
      throw resErr;
    }
    if (snap.empty) return;
    for (const docObj of snap.docs) {
      const res = docObj.data();
      const resId = docObj.id;
      const timeStr = res.time;
      if (!timeStr) continue;
      const parseLocal = (timeVal, base) => {
        const d = new Date(base);
        if (timeVal.toUpperCase().includes("AM") || timeVal.toUpperCase().includes("PM")) {
          const [timePart, modifier] = timeVal.split(" ");
          let [hours, minutes] = timePart.split(":").map(Number);
          if (modifier === "PM" && hours < 12) hours += 12;
          if (modifier === "AM" && hours === 12) hours = 0;
          d.setHours(hours, minutes, 0, 0);
        } else {
          const [hours, minutes] = timeVal.split(":").map(Number);
          d.setHours(hours, minutes, 0, 0);
        }
        return d;
      };
      const reservationTimeObj = parseLocal(timeStr, virtualNow);
      const diffMs = reservationTimeObj.getTime() - virtualNow.getTime();
      const diffMinutes = Math.floor(diffMs / 6e4);
      if (diffMinutes >= 26 && diffMinutes <= 34) {
        let dupSnap;
        try {
          const qDup = (0, import_firestore3.query)(
            (0, import_firestore3.collection)(db2, "email_logs"),
            (0, import_firestore3.where)("reservationId", "==", resId),
            (0, import_firestore3.where)("emailType", "==", "RESERVATION_REMINDER"),
            (0, import_firestore3.where)("status", "==", "success")
          );
          dupSnap = await (0, import_firestore3.getDocs)(qDup);
          console.log(`[DEBUG REMINDER]: email_logs dup query fetched successfully. is empty: ${dupSnap.empty}`);
        } catch (dupErr) {
          console.error(`[DEBUG REMINDER ERROR] Failed to query email_logs collection for resId ${resId}: `, dupErr);
          throw dupErr;
        }
        if (dupSnap.empty) {
          console.log(`Automation Scheduled Trigger: Table reminder found for ${res.name} (id: ${resId}) in ${diffMinutes} minutes.`);
          await triggerEmail(
            res.email,
            res.name,
            `Upcoming Reservation Reminder`,
            `This is a friendly reminder that your table reservation #${resId.slice(-6).toUpperCase()} at Spice Garden is scheduled in 30 minutes at ${timeStr}. We look forward to welcome you.`,
            "RESERVATION_REMINDER",
            resId,
            "reservationId",
            {
              reservationId: resId,
              reservationDate: res.date,
              reservationTime: res.time,
              guestCount: res.guests
            }
          );
        }
      }
    }
  } catch (err) {
    console.error("Automation Scheduled Exception: Error in reservation reminder schedule loops:", err);
  }
}
function startAutomationEngine() {
  console.log("Automation Engine: Setting up real-time Firebase Web Client listeners...");
  ensureAuthenticated().then(() => {
    const unsubscribeOrders = (0, import_firestore3.onSnapshot)((0, import_firestore3.collection)(db2, "orders"), async (snapshot) => {
      for (const change of snapshot.docChanges()) {
        const orderData = change.doc.data();
        const orderId = change.doc.id;
        const createdAtVal = orderData.createdAt;
        let docTime = Date.now();
        if (createdAtVal) {
          if (typeof createdAtVal.toMillis === "function") {
            docTime = createdAtVal.toMillis();
          } else if (createdAtVal instanceof Date) {
            docTime = createdAtVal.getTime();
          } else if (typeof createdAtVal === "string" || typeof createdAtVal === "number") {
            docTime = new Date(createdAtVal).getTime();
          }
        }
        if (docTime < serverStartTime - 5e3) {
          continue;
        }
        const email = orderData.customerEmail;
        const name = orderData.customerName;
        if (change.type === "added") {
          console.log(`Automation Trigger: New Order placed successfully: ${orderId}`);
          await triggerEmail(
            email,
            name,
            "Order Received Successfully",
            `Thank you for your order. We have successfully received your order and our kitchen has started processing it.

Estimated Preparation Time: 30-40 minutes.`,
            "ORDER_CREATED",
            orderId,
            "orderId",
            {
              orderId,
              orderItems: buildOrderItemsTable(orderData.items || []),
              deliveryAddress: orderData.address
            }
          );
        } else if (change.type === "modified") {
          if (orderData.status === "Assigned To Delivery Partner" || orderData.status === "On The Way" || orderData.status === "Picked Up") {
            console.log(`Automation Trigger: Order delivery partner assigned / heading out: ${orderId}`);
            let partnerName = "Your assigned courier rider";
            if (orderData.deliveryPartnerId) {
              try {
                const partnerSnap = await (0, import_firestore3.getDoc)((0, import_firestore3.doc)(db2, "delivery_partners", orderData.deliveryPartnerId));
                if (partnerSnap.exists()) {
                  const partnerData = partnerSnap.data();
                  if (partnerData) {
                    partnerName = `${partnerData.fullName} (${partnerData.vehicleType} - ${partnerData.vehicleNumber})`;
                  }
                }
              } catch {
              }
            }
            await triggerEmail(
              email,
              name,
              "Your Order Is On The Way",
              `Great news! Your order has been picked up by our delivery team and is now on the way to your location.

Estimated Arrival Time: 15-20 minutes.`,
              "DELIVERY_ASSIGNED",
              orderId,
              "orderId",
              {
                orderId,
                deliveryPartner: partnerName,
                deliveryAddress: orderData.address
              }
            );
          } else if (orderData.status === "delivered") {
            console.log(`Automation Trigger: Order delivered: ${orderId}`);
            await triggerEmail(
              email,
              name,
              "Order Delivered Successfully",
              `We hope you enjoyed your meal! Thank you for ordering from us. We'd love to hear your feedback on your items.`,
              "DELIVERED",
              orderId,
              "orderId",
              {
                orderId,
                orderItems: buildOrderItemsTable(orderData.items || [])
              }
            );
          }
        }
      }
    }, (err) => {
      console.error("Automation Listener Error (Orders):", err);
    });
    const unsubscribeReservations = (0, import_firestore3.onSnapshot)((0, import_firestore3.collection)(db2, "reservations"), async (snapshot) => {
      for (const change of snapshot.docChanges()) {
        const resData = change.doc.data();
        const resId = change.doc.id;
        const createdAtVal = resData.createdAt;
        let docTime = Date.now();
        if (createdAtVal) {
          if (typeof createdAtVal.toMillis === "function") {
            docTime = createdAtVal.toMillis();
          } else if (createdAtVal instanceof Date) {
            docTime = createdAtVal.getTime();
          } else if (typeof createdAtVal === "string" || typeof createdAtVal === "number") {
            docTime = new Date(createdAtVal).getTime();
          }
        }
        if (docTime < serverStartTime - 5e3) {
          continue;
        }
        const email = resData.email;
        const name = resData.name;
        if (change.type === "added") {
          console.log(`Automation Trigger: New table booking request received: ${resId}`);
          await triggerEmail(
            email,
            name,
            "Reservation Request Received \u{1F33F}",
            `Thank you for choosing us! We have successfully received your table reservation request. Please note that your booking is currently in pending status. Our host team is reviewing your details, and you will receive a confirmation email containing your locked tables once we accept the booking.`,
            "RESERVATION_RECEIVED",
            resId,
            "reservationId",
            {
              reservationId: resId,
              reservationDate: resData.date,
              reservationTime: resData.time,
              guestCount: resData.guests
            }
          );
        } else if (change.type === "modified") {
          if (resData.status === "confirmed") {
            console.log(`Automation Trigger: Reservation Confirmed by Admin: ${resId}`);
            await triggerEmail(
              email,
              name,
              "Reservation Confirmed \u{1F389}",
              `Great news! Your table reservation has been reviewed and officially confirmed by our administration! Your requested spots have been successfully accepted, assigned, and locked. We look forward to welcoming you for an exceptional and flavorful dining experience.`,
              "RESERVATION_CONFIRMED",
              resId,
              "reservationId",
              {
                reservationId: resId,
                reservationDate: resData.date,
                reservationTime: resData.time,
                guestCount: resData.guests
              }
            );
          } else if (resData.status === "completed") {
            console.log(`Automation Trigger: Reservation Completed: ${resId}`);
            await triggerEmail(
              email,
              name,
              "Thank You For Visiting",
              `Thank you for dining with us at Spice Garden! We hope you had a wonderful, flavorful experience. Your feedback keeps us growing.`,
              "VISIT_COMPLETED",
              resId,
              "reservationId",
              {
                reservationId: resId,
                reservationDate: resData.date,
                reservationTime: resData.time,
                guestCount: resData.guests
              }
            );
          } else if (resData.status === "no-show") {
            console.log(`Automation Trigger: Reservation Marked as No-Show: ${resId}`);
            await triggerEmail(
              email,
              name,
              "We Missed You",
              `We noticed that you were unable to attend your reservation at Spice Garden. We would love to serve you another time. Click the button below to reserve a table for your next craving.`,
              "NO_SHOW",
              resId,
              "reservationId",
              {
                reservationId: resId,
                reservationDate: resData.date,
                reservationTime: resData.time,
                guestCount: resData.guests
              }
            );
          }
        }
      }
    }, (err) => {
      console.error("Automation Listener Error (Reservations):", err);
    });
    const scheduledReminderTimer = setInterval(() => {
      runReservationReminderLoop();
    }, 6e4);
    const retryFailedTimer = setInterval(() => {
      runEmailRetryLoop();
    }, 18e4);
    runReservationReminderLoop();
    runEmailRetryLoop();
    activeUnsubscribers.push(unsubscribeOrders, unsubscribeReservations);
    activeIntervals.push(scheduledReminderTimer, retryFailedTimer);
  });
  return () => {
    activeUnsubscribers.forEach((unsub) => {
      try {
        unsub();
      } catch {
      }
    });
    activeIntervals.forEach((timer) => clearInterval(timer));
    activeUnsubscribers.length = 0;
    activeIntervals.length = 0;
  };
}

// server.ts
var import_app3 = require("firebase/app");
var import_firestore4 = require("firebase/firestore");
var import_auth3 = require("firebase/auth");
var firebaseApp = (0, import_app3.getApps)().length === 0 ? (0, import_app3.initializeApp)(firebase_applet_config_default) : (0, import_app3.getApp)();
var db3 = (0, import_firestore4.getFirestore)(firebaseApp, firebase_applet_config_default.firestoreDatabaseId);
var auth3 = (0, import_auth3.getAuth)(firebaseApp);
var isBackendUserAuthenticated = false;
var backendAuthPromise = null;
async function ensureBackendAuthenticated() {
  if (isBackendUserAuthenticated && auth3.currentUser) return;
  if (backendAuthPromise) {
    return backendAuthPromise;
  }
  backendAuthPromise = (async () => {
    try {
      const userCredential = await (0, import_auth3.signInWithEmailAndPassword)(auth3, "admin@gmail.com", "admin6");
      isBackendUserAuthenticated = true;
      console.log("\u{1F512} [BACKEND AUTH]: Server-side authenticated securely as admin@gmail.com!");
      try {
        const user = userCredential.user;
        await (0, import_firestore4.setDoc)((0, import_firestore4.doc)(db3, "users", user.uid), {
          uid: user.uid,
          email: "admin@gmail.com",
          displayName: "System Admin",
          role: "admin",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }, { merge: true });
        console.log("\u2705 [BACKEND AUTH]: Fail-safe admin user document verified in /users collection!");
      } catch (saveErr) {
        console.warn("\u26A0\uFE0F [BACKEND AUTH]: Fail-safe admin user document write bypassed:", saveErr.message);
      }
    } catch (err) {
      console.log("\u26A0\uFE0F [BACKEND AUTH]: Sign in as admin failed, attempting to bootstrap/register admin account...", err.message);
      try {
        const userCredential = await (0, import_auth3.createUserWithEmailAndPassword)(auth3, "admin@gmail.com", "admin6");
        isBackendUserAuthenticated = true;
        console.log("\u{1F512} [BACKEND AUTH]: Server-side registered and authenticated securely as admin@gmail.com!");
        const user = userCredential.user;
        await (0, import_firestore4.setDoc)((0, import_firestore4.doc)(db3, "users", user.uid), {
          uid: user.uid,
          email: "admin@gmail.com",
          displayName: "System Admin",
          role: "admin",
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }, { merge: true });
        console.log("\u2705 [BACKEND AUTH]: Admin user document bootstrapped in /users collection!");
      } catch (signupErr) {
        console.error("\u274C [BACKEND AUTH FAIL]: Could not sign in or register admin", signupErr.message);
        backendAuthPromise = null;
      }
    }
  })();
  return backendAuthPromise;
}
async function startServer() {
  const app3 = (0, import_express.default)();
  const PORT = 3e3;
  try {
    startAutomationEngine();
    console.log("\u{1F680} [BACKEND AUTOMATION]: Real-time email schedules, retry loops & hooks started successfully!");
  } catch (err) {
    console.error("\u274C [BACKEND AUTOMATION]: Failed to boot core email scheduler engines:", err);
  }
  app3.use(import_express.default.json());
  app3.use(import_express.default.urlencoded({ extended: true }));
  app3.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://accounts.google.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.basemaps.cartocdn.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.googleapis.com https://*.gstatic.com https://*.firebaseapp.com https://*.cartocdn.com https://*.openstreetmap.org https://images.unsplash.com",
      "connect-src 'self' ws: wss: https://*.workers.dev https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.firestore.googleapis.com https://firebasestorage.googleapis.com https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://*.openstreetmap.org https://nominatim.openstreetmap.org",
      "frame-src 'self' https://accounts.google.com https://*.firebaseapp.com",
      "frame-ancestors 'self' https://*.google.com https://ai.studio https://*.run.app https://*.aistudio.google",
      "object-src 'none'"
    ];
    res.setHeader("Content-Security-Policy", cspDirectives.join("; "));
    const referer = req.headers.referer || "";
    const isGoogleFramed = referer.includes("google.com") || referer.includes("ai.studio") || referer.includes("run.app") || referer.includes("aistudio.google");
    if (!isGoogleFramed) {
      res.setHeader("X-Frame-Options", "SAMEORIGIN");
    }
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "geolocation=(self), camera=(), microphone=(), payment=()");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    next();
  });
  const rateLimiters = {};
  function createRateLimiter(key, config) {
    rateLimiters[key] = {};
    return (req, res, next) => {
      const ip = req.headers["x-forwarded-for"] || req.ip || req.socket.remoteAddress || "unknown";
      const now = Date.now();
      if (!rateLimiters[key][ip]) {
        rateLimiters[key][ip] = {
          count: 1,
          resetTime: now + config.windowMs
        };
        return next();
      }
      const clientLimit = rateLimiters[key][ip];
      if (now > clientLimit.resetTime) {
        clientLimit.count = 1;
        clientLimit.resetTime = now + config.windowMs;
        return next();
      }
      clientLimit.count++;
      if (clientLimit.count > config.max) {
        const retryAfter = Math.ceil((clientLimit.resetTime - now) / 1e3);
        res.setHeader("Retry-After", retryAfter);
        return res.status(429).json({
          error: "Too Many Requests",
          message: config.message,
          retryAfter
        });
      }
      next();
    };
  }
  const sendEmailLimiter = createRateLimiter("send-email", {
    windowMs: 15 * 60 * 1e3,
    // 15 mins
    max: 10,
    // 10 emails per window
    message: "Too many email sending requests from this IP. Please try again after 15 minutes."
  });
  const otpStartLimiter = createRateLimiter("otp-start", {
    windowMs: 5 * 60 * 1e3,
    // 5 mins
    max: 5,
    // 5 OTP generations per window
    message: "Too many verification requests. Please try again after 5 minutes."
  });
  const otpVerifyLimiter = createRateLimiter("otp-verify", {
    windowMs: 5 * 60 * 1e3,
    // 5 mins
    max: 20,
    // allow up to 20 attempts per window to match attempts limits
    message: "Too many verification attempts. Please wait 5 minutes."
  });
  app3.post("/api/send-email", sendEmailLimiter, async (req, res) => {
    try {
      const { toEmail, toName, subject, htmlContent, textContent } = req.body;
      if (!toEmail || !subject || !htmlContent) {
        return res.status(400).json({ error: "Missing required fields (toEmail, subject, htmlContent)" });
      }
      const brevoApiKey = process.env.BREVO_API_KEY;
      const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@spicegarden.com";
      const senderName = process.env.BREVO_SENDER_NAME || "Spice Garden";
      const resolvedToEmail = toEmail === "abc@gmail.com" ? senderEmail : toEmail;
      if (!brevoApiKey) {
        console.group("\u{1F4E7} [Spice Garden SERVER - Mock Preview]");
        console.log(`To: ${toName || "Valued Customer"} <${resolvedToEmail}>`);
        console.log(`Subject: ${subject}`);
        console.log(`Text fallback:
${textContent || "None"}`);
        console.log(`HTML length: ${htmlContent.length} chars`);
        console.groupEnd();
        return res.json({ success: true, preview: true, details: { resolvedToEmail, senderEmail } });
      }
      console.log(`Sending email via Brevo SMTP API to ${resolvedToEmail}...`);
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": brevoApiKey
        },
        body: JSON.stringify({
          sender: {
            name: senderName,
            email: senderEmail
          },
          to: [
            {
              email: resolvedToEmail,
              name: toName || "Valued Customer"
            }
          ],
          subject,
          htmlContent,
          ...textContent ? { textContent } : {}
        })
      });
      const responseText = await response.text();
      if (!response.ok) {
        console.error(`Brevo SMTP server response failed with status ${response.status}`, responseText);
        let parsedError;
        try {
          parsedError = JSON.parse(responseText);
        } catch {
          parsedError = { error: responseText };
        }
        const errorMessage = parsedError.message || String(responseText);
        const code = parsedError.code || "";
        const isUnactivated = errorMessage.toLowerCase().includes("not yet activated") || errorMessage.toLowerCase().includes("permission_denied") || code === "permission_denied";
        const isIpBlocked = errorMessage.toLowerCase().includes("unrecognised ip") || errorMessage.toLowerCase().includes("authorised_ips") || code === "unauthorized";
        if (isUnactivated || isIpBlocked) {
          console.warn(`\u26A1 [BACKEND FALLBACK DETECTED]: Brevo returned an account restrictions error: "${errorMessage}".`);
          console.warn(`\u{1F449} Automatically switching to mock/preview mode so you can continue testing without app crashes!`);
          console.group("\u{1F4E7} [Spice Garden SERVER - Mock Preview Fallback]");
          console.log(`To: ${toName || "Valued Customer"} <${toEmail}>`);
          console.log(`Subject: ${subject}`);
          console.log(`Text content:
${textContent || "None"}`);
          console.log(`HTML string length: ${htmlContent.length} chars`);
          console.groupEnd();
          return res.json({
            success: true,
            preview: true,
            reason: isUnactivated ? "unactivated_smtp" : "ip_block",
            details: errorMessage
          });
        }
        return res.status(response.status).json({
          error: "Brevo SMTP request rejected",
          details: parsedError
        });
      }
      let responseJSON = {};
      try {
        responseJSON = JSON.parse(responseText);
      } catch {
        responseJSON = { raw: responseText };
      }
      console.log(`Email successfully dispatched via Brevo for: ${toEmail}`);
      return res.json({ success: true, response: responseJSON });
    } catch (err) {
      console.error("Core failure during email dispatch proxy:", err);
      return res.status(500).json({ error: "Internal mail server failure", message: err.message });
    }
  });
  app3.post("/api/otp/start", otpStartLimiter, async (req, res) => {
    try {
      const { email, name } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
      }
      const cleanedEmail = email.trim().toLowerCase();
      const now = Date.now();
      const cooldownPeriod = 30 * 1e3;
      const validityPeriod = 5 * 60 * 1e3;
      await ensureBackendAuthenticated();
      const docRef = (0, import_firestore4.doc)(db3, "otp_verifications", cleanedEmail);
      try {
        const snap = await (0, import_firestore4.getDoc)(docRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data && data.cooldownUntil && data.cooldownUntil > now) {
            const remaining = Math.ceil((data.cooldownUntil - now) / 1e3);
            return res.status(429).json({
              success: false,
              cooldownUntil: data.cooldownUntil,
              message: `Please wait ${remaining} seconds before requesting a new OTP.`
            });
          }
        }
      } catch (err) {
        console.warn("Could not check existing OTP session cooldown:", err);
      }
      const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
      const expiresAt = now + validityPeriod;
      const cooldownUntil = now + cooldownPeriod;
      await (0, import_firestore4.setDoc)(docRef, {
        email: cleanedEmail,
        otp,
        expiresAt,
        cooldownUntil,
        attempts: 0
      });
      const recipientName = name || "Valued Customer";
      const subject = "Spice Garden - Email Verification Code \u{1F33F}";
      const textContent = `Hello ${recipientName},

Your security verification OTP code is: ${otp}

This verification code expires in 5 minutes. If you did not initiate this request, please ignore this email.

Best regards,
Spice Garden Team`;
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #fafafa;
      color: #1a1a1a;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fafafa;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
      border: 1px solid #f0f0f0;
    }
    .header {
      background-color: #ea580c;
      padding: 40px 30px;
      text-align: center;
    }
    .logo-text {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -1px;
      margin: 0;
      font-family: 'Georgia', serif;
    }
    .logo-sub {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 5px;
      font-weight: 700;
    }
    .content {
      padding: 40px 35px;
      text-align: center;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 12px;
      color: #111827;
      letter-spacing: -0.5px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #4b5563;
      margin-top: 0;
      margin-bottom: 24px;
    }
    .otp-box {
      background-color: #fff7ed;
      border: 2px dashed #ffedd5;
      padding: 24px;
      border-radius: 18px;
      margin: 30px 0;
    }
    .otp-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #ea580c;
      font-weight: 800;
      margin-bottom: 10px;
    }
    .otp-code {
      font-size: 38px;
      font-weight: 800;
      color: #ea580c;
      letter-spacing: 8px;
      margin: 0;
      padding-left: 8px;
      white-space: nowrap;
      word-break: keep-all;
      display: inline-block;
    }
    .expires {
      font-size: 13px;
      font-weight: 600;
      color: #ef4444;
      background-color: #fef2f2;
      padding: 10px 16px;
      border-radius: 50px;
      display: inline-block;
      margin-bottom: 10px;
    }
    .footer {
      padding: 25px 35px;
      background-color: #f9fafb;
      border-top: 1px solid #f3f4f6;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      line-height: 1.5;
    }
    @media only screen and (max-width: 480px) {
      .wrapper {
        padding: 20px 10px !important;
      }
      .content {
        padding: 30px 15px !important;
      }
      .otp-code {
        font-size: 28px !important;
        letter-spacing: 4px !important;
        padding-left: 4px !important;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-text">Spice Garden</div>
        <div class="logo-sub">Authentic Heritage Cuisine</div>
      </div>
      <div class="content">
        <h1>Email Verification</h1>
        <p>Hello ${recipientName},</p>
        <p>To verify this email address and complete your request, please use the 6-digit secure code below.</p>
        <div class="otp-box">
          <div class="otp-label">Your verification code is</div>
          <div class="otp-code">${otp}</div>
        </div>
        <div class="expires">
          \u23F1\uFE0F This OTP will expire in 5 minutes
        </div>
      </div>
      <div class="footer">
        <p style="margin: 0 0 10px 0;">If you did not request this code, please ignore this email.</p>
        <p style="margin: 0;">&copy; 2026 Spice Garden. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
      console.log(`[SMTP OTP HANDLER] Attempting email send to ${cleanedEmail}...`);
      const brevoApiKey = process.env.BREVO_API_KEY;
      const senderEmail = process.env.BREVO_SENDER_EMAIL || "noreply@spicegarden.com";
      const senderName = process.env.BREVO_SENDER_NAME || "Spice Garden";
      let mailSuccess = false;
      if (!brevoApiKey) {
        console.warn(`[OTP PREVIEW FALLBACK]: No BREVO_API_KEY configured. Logging target OTP directly to server terminal: ${otp}`);
        mailSuccess = true;
      } else {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": brevoApiKey
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: cleanedEmail, name: recipientName }],
            subject,
            htmlContent,
            textContent
          })
        });
        if (response.ok) {
          mailSuccess = true;
          console.log(`[SMTP OTP HANDLER] Successfully sent OTP to ${cleanedEmail} via Brevo!`);
        } else {
          const text = await response.text();
          console.error("[SMTP OTP HANDLER] Brevo returned rejection payload:", text);
        }
      }
      if (mailSuccess) {
        return res.json({ success: true, cooldownUntil, message: "Verification code has been sent to your email!" });
      } else {
        return res.status(500).json({ success: false, message: "Failed to dispatch email verification. Check server keys." });
      }
    } catch (err) {
      console.error("General server-side OTP start error:", err);
      return res.status(500).json({ success: false, message: "OTP initiation failed: " + err.message });
    }
  });
  app3.post("/api/otp/verify", otpVerifyLimiter, async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP code are required parameters." });
      }
      const cleanedEmail = email.trim().toLowerCase();
      const now = Date.now();
      await ensureBackendAuthenticated();
      const docRef = (0, import_firestore4.doc)(db3, "otp_verifications", cleanedEmail);
      const snap = await (0, import_firestore4.getDoc)(docRef);
      if (!snap.exists()) {
        return res.status(404).json({ success: false, message: "No active OTP verification session found. Please request a new OTP." });
      }
      const data = snap.data();
      if (!data) {
        return res.status(500).json({ success: false, message: "Failed to retrieve verification session data." });
      }
      if (data.attempts >= 5) {
        return res.status(400).json({ success: false, message: "Maximum retries exceeded. Please trigger a new OTP verification." });
      }
      if (data.expiresAt && now > data.expiresAt) {
        await (0, import_firestore4.deleteDoc)(docRef);
        return res.status(400).json({ success: false, message: "OTP has expired (validity is 5 minutes). Please try sending a new one." });
      }
      if (data.otp === otp.trim()) {
        await (0, import_firestore4.deleteDoc)(docRef);
        return res.json({ success: true, message: "Verification successful." });
      } else {
        const nextAttempts = (data.attempts || 0) + 1;
        await (0, import_firestore4.updateDoc)(docRef, {
          attempts: (0, import_firestore4.increment)(1)
        });
        const remaining = 5 - nextAttempts;
        if (remaining <= 0) {
          await (0, import_firestore4.deleteDoc)(docRef);
          return res.status(400).json({ success: false, message: "Maximum retries exceeded. This OTP is now locked. Please generate a new code." });
        }
        return res.status(400).json({ success: false, message: `Incorrect OTP. You have ${remaining} attempts remaining.` });
      }
    } catch (err) {
      console.error("General server-side OTP validation error:", err);
      return res.status(500).json({ success: false, message: "OTP validation failed: " + err.message });
    }
  });
  app3.get("/api/health", (req, res) => {
    res.json({ status: "alive", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app3.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static file assets...");
    const distPath = import_path2.default.join(process.cwd(), "dist");
    app3.use(import_express.default.static(distPath));
    app3.get("*", (req, res) => {
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  }
  app3.listen(PORT, "0.0.0.0", () => {
    console.log(`Server bound and listening at http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
