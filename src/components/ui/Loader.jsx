"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <DotLottieReact
        src="https://lottie.host/3da617e2-30fb-4174-805c-5a8d73d937b4/D6LzRR0kZF.lottie"
        autoplay
        loop
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}
