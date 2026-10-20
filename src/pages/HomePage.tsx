import React from 'react';
import { HeroSection } from '../components/buyer/HeroSection';
import { CategorySection } from '../components/buyer/CategorySection';
import { FeaturedProducts } from '../components/buyer/FeaturedProducts';
import { ValueProps } from '../components/buyer/ValueProps';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <ValueProps />
    </div>
  );
};
