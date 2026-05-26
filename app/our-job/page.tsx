import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OurJobPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION (Image Banner) */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/headers/our-job.webp"
          alt="Our Job"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight drop-shadow-lg">
            Our Job
          </h1>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          
          {/* OUR RESPONSIBILITIES */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Our Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-4 text-slate-600 text-sm md:text-base font-light leading-relaxed">
              <li>All trash will be removed from the property before we start working on the project and after the job is completed.</li>
              <li>Sprinkler heads not required anymore will be capped at no cost. Sprinkler heads or valve movement will be charged.</li>
              <li>Drain (pipes or boxes) movement will be charged.</li>
              <li className="list-none ml-[-20px] font-semibold text-slate-800">Not included</li>
              <li className="list-none">
                <ul className="list-[circle] pl-10 space-y-2">
                  <li>Jobs & material not described in the quote.</li>
                  <li>Landscape adjustments not described in the quote.</li>
                </ul>
              </li>
              <li>Your grass will suffer during the process. We will do our best to take care of it, but we won&apos;t replace or install new grass. Price for replacement or installation of grass will be quoted separately.</li>
              <li><strong className="text-slate-800">Note:</strong> Repairs, adjustments or improvements for an existing product or item will not make the products look like new, they only improve their appearance but do not completely repair them, please keep this in mind and expect quality not perfection.</li>
            </ul>
          </div>

          {/* DURING THE CONSTRUCTION */}
          <div className="space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 uppercase tracking-tight">
              During the Construction
            </h2>

            {/* Building your Dream */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-700">Building your Dream</h3>
              <ol className="list-decimal pl-5 space-y-4 text-slate-600 text-sm md:text-base font-light leading-relaxed">
                <li>Do not allow traffic on the work area, take special care with children, the elderly, and pets.</li>
                <li>Please clear your driveway and street so that the cement truck can park and the team can freely enter your property with wheelbarrows or the buggy.</li>
                <li>If required, a section/gate of your fence will be temporarily removed to facilitate the entry / exit of materials and equipment. At the end, the fence will be put back together.</li>
                <li>We will be careful with the grass, however, wheelbarrows will leave a footprint that will disappear in a couple of days.</li>
                <li>Do not allow sprinklers to water the work area (It could damage the cement when it is soft).</li>
                <li>While working on sprinklers, our team will take utmost care to avoid any damage to underground cables and wiring ( for cable TV or internet). However , in case of any damage to these cables due to an accident , the customer is responsible for fixing any issues thereof since our team does not have any electrical or communications experience.</li>
              </ol>
            </div>

            {/* Almost Done */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-slate-700 italic">Almost Done – Help us Please!</h3>
              <ol className="list-decimal pl-5 space-y-4 text-slate-600 text-sm md:text-base font-light leading-relaxed">
                <li>Do not step on the area for the next 8 hours, take special care with children, the elderly, and pets.</li>
                <li>To avoid cracks in new concrete and wood, be sure to start watering the concrete the next morning and continue to water twice a day for two weeks at noon and in the evening for five minutes.</li>
                <li>We will do professional work and use excellent materials to prevent cracks, however, the owner must be aware that risks exist as part of the project. Although the crack may be visible, the concrete/wood retains all of its properties.</li>
                <li>When we remove the frames and tools, there will be a gap of approximately 1 foot between the work area and the grass. Considered normal in this type of work, the homeowner just needs to add black soil for the grass to grow and fill this space.</li>
                <li>We will try our best to protect your walls and we will clean any cement stains at the end of the project. However, please bear in mind that it is possible for some stains to remain on the wall.</li>
                <li>Test your sprinkler system before we leave your property.</li>
                <li>We appreciate your feedback therefore please do let us know how we can improve.</li>
              </ol>
            </div>

            {/* Upon completion */}
            <div className="space-y-4 pt-4">
              <h3 className="font-bold text-slate-700">Upon completion:</h3>
              <ol className="list-decimal pl-5 space-y-4 text-slate-600 text-sm md:text-base font-light leading-relaxed">
                <li>Reviews help us and our business. We would appreciate your review on : <Link href="#" className="text-red-600 font-semibold hover:underline">Google Reviews</Link> and <Link href="#" className="text-red-600 font-semibold hover:underline">Facebook Reviews</Link> (please attach a picture of the project).</li>
                <li>Kindly give us a recommendation on your community app (please attach a picture of the project).</li>
              </ol>
            </div>
          </div>

          {/* RECOMMENDATIONS FOR CONCRETES */}
          <div className="space-y-6 pt-8">
            <h2 className="text-lg font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Recommendations for Concretes
            </h2>
            <ol className="list-decimal pl-5 text-slate-600 text-sm md:text-base font-light leading-relaxed">
              <li>Do not allow traffic or step on the concrete for the next 8 hours, take special care with children, the elderly, and pets.</li>
            </ol>
          </div>

        </div>
      </section>
    </div>
  );
}