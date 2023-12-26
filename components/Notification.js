import URL from "@/URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io(URL);

export default function Notifications() {
  const [notificationPermission, setNotificationPermission] = useState();
  const Restaurant = useSelector((state) => state.Restaurant?.restaurantData);

  useEffect(() => {
    socket.emit("join", Restaurant._id);
    // return () => {
    //   socket.disconnect();
    // };
  }, [Restaurant]);

  useEffect(() => {
    if (notificationPermission !== "granted") {
      requestNotificationPermission();
    }
    socket.on("notification", (notification) => {
      showBrowserNotification(notification);
    });
    return () => {
      socket.off("notification");
    };
  }, []);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
  };

  const showBrowserNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("New Notification", { body: message });
    }
  };

  return <div></div>;
}
