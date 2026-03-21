import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { generateMetaData } from "@repo/lib";

export const metadata: Metadata = generateMetaData({
  title: "Home and on day 2",
  description: "Welcome to day2",
});

const layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
