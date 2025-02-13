import admin from "../admin.webp";
import qrbasedOrdering from "../qr_based_menu.jpg";
import dashBoardAnalytics from "../Web-analytics-dashboard.webp";
import contactlessdinning from "../contactlessdinning.avif";
import seamlessoder from "../food-ordering-system-semless.png";
import orderstatus from "../order status.webp";
export const services = [
  {
    title: "QR-based digital menu",
    description:
      "Customers can scan a QR code at their table to instantly access a digital menu, explore food options, and place orders directly from their phones—eliminating the need for physical menus or waitstaff assistance.",
    img: qrbasedOrdering.src,
  },
  {
    title: "Admin panel",
    description:
      "A user-friendly dashboard that allows restaurant owners to add, edit, or remove menu items, manage tables, set special discounts, and oversee all orders in one place.",
    img: admin.src,
  },
  {
    title: "Live order Status",
    description:
      "Monitor incoming orders in real-time, allowing restaurant staff to process them efficiently, ensuring faster service and better customer satisfaction.",
    img: orderstatus.src,
  },
  {
    title: "Sales analytics",
    description:
      "Track daily, weekly, and monthly sales, monitor the most popular dishes, and analyze customer trends to optimize business performance and boost revenue.",
    img: dashBoardAnalytics.src,
  },

  {
    title: "Seamless Order Management",
    description:
      "Once an order is placed, it goes directly to the kitchen staff, reducing manual errors and ensuring accurate order fulfillment. Customers can also add special requests to personalize their meals.",
    img: seamlessoder.src,
  },
  {
    title: " Contactless & Faster Dining Experience",
    description:
      "By removing the need for printed menus and manual order taking, Tap2Table creates a safer, quicker, and more efficient dining experience for both customers and restaurant staff.",
    img: contactlessdinning.src,
  },
];
