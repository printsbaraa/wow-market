"use client";

import React from "react";
import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FreshProduceBanner } from "@/components/home/FreshProduceBanner";
import { BestSellersCarousel } from "@/components/home/BestSellersCarousel";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { DeliveryZoneSection } from "@/components/home/DeliveryZoneSection";
import { CustomerReviewsSection } from "@/components/home/CustomerReviewsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <FreshProduceBanner />
      <BestSellersCarousel />
      <WhyChooseUs />
      <DeliveryZoneSection />
      <CustomerReviewsSection />
      <NewsletterSection />
    </div>
  );
}
