import React from "react";
import type { Metadata } from "next";
import { generateMetaData } from "@repo/lib";

export const metadata: Metadata = generateMetaData({
  title: "Home",
  description: "Welcome",
});

const layout = () => {
  return <div></div>;
};

export default layout;
