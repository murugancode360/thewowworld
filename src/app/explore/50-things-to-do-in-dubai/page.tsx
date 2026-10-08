"use client";

import React from "react";
import DubaiThingsExplorer from "@/components/explore/DubaiThingsExplorer";
import { DUBAI_50_THINGS } from "@/data/dubaiThings";

export default function Dubai50ThingsPage() {
  return (
    <DubaiThingsExplorer
      title="50 Things to Do in"
      scriptHighlight="Dubai"
      subtitle="The curated top 50 quintessential experiences for first-time and returning travelers. Everything you need to see, taste, and experience in Dubai for an unforgettable holiday."
      badgeText="Top 50 Curated Essentials"
      places={DUBAI_50_THINGS}
      heroImage="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=900&q=75"
    />
  );
}
