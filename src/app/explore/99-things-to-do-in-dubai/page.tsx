"use client";

import React from "react";
import DubaiThingsExplorer from "@/components/explore/DubaiThingsExplorer";
import { DUBAI_99_THINGS } from "@/data/dubaiThings";

export default function Dubai99ThingsPage() {
  return (
    <DubaiThingsExplorer
      title="99 Things to Do in"
      scriptHighlight="Dubai"
      subtitle="The ultimate comprehensive bucket list covering iconic skyscrapers, golden desert dunes, tranquil heritage quarters, world-record waterparks, Michelin gastronomy, and secret local gems."
      badgeText="The Complete 99 Guide"
      places={DUBAI_99_THINGS}
      heroImage="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=75"
    />
  );
}
