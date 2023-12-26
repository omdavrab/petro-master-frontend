import React, { Component } from "react";
import Router from "next/router";

export default function Error404() {
  React.useEffect(() => {
    Router.push("/error_404");
  });

  return <div />;
}