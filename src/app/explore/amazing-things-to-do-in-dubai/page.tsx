"use client";

import React from "react";
import DubaiThingsExplorer from "@/components/explore/DubaiThingsExplorer";
import { DUBAI_AMAZING_THINGS } from "@/data/dubaiThings";

export default function AmazingThingsInDubaiPage() {
  return (
    <DubaiThingsExplorer
      title="Amazing Things to Do in"
      scriptHighlight="Dubai"
      subtitle="Discover the most extraordinary, record-breaking, and jaw-dropping experiences on Earth — from skydiving over Palm Jumeirah to dining 50 meters in the air and swimming in 360-degree sky pools."
      badgeText="Extraordinary & World Records"
      places={DUBAI_AMAZING_THINGS}
      heroImage="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=75"
    />
  );
}
