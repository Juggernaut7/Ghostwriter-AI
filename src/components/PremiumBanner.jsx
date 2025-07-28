import React from 'react';
import Button from './ui/Button';

const PremiumBanner = () => {
  return (
    <section className="py-12 px-4 sm:px-8 bg-[#5D3FD3]/10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#C7F9CC] mb-4">
          Unlock Premium Features
        </h2>
        <p className="text-sm sm:text-base text-gray-300 mb-6">
          Get unlimited prompts, advanced AI models, and priority support with GhostWriter AI Premium.
        </p>
        <Button className="bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC] font-semibold py-2 px-6 rounded-lg transition-colors text-sm sm:text-base">
          Go Premium (Coming Soon)
        </Button>
      </div>
    </section>
  );
};

export default PremiumBanner;