"use client";

import { Frame } from "@/atoms";
import React from "react";

// 메뉴 항목의 타입 정의 수정
interface MenuItem {
  // name: string;
  // path: string;
  // icon?: string;
  // subItems?: MenuItem[];r
}

interface Props {
  children: React.ReactNode;
}

export default function Sidebar() {
  return <Frame row></Frame>;
}
