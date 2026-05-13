import React from 'react';
import Link from 'next/link';

export default function WarrantiesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* HEADER SECTION (Consistent Grey Background) */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 uppercase tracking-tight">
            Warranties
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Section 1: General Contractor Warranty */}
          <div className="mb-16 space-y-6">
            <p className="text-slate-700 leading-relaxed">
              Contractor warrants that the Work shall be in accordance with the Contract Documents, applicable law and trade standards and free from material structural defects, improper workmanship or defective materials. Contractor shall replace, correct or repair any Work not in accordance with the Contract Documents, applicable law and trade standards or any defects caused by faulty materials, equipment or workmanship for a period of <strong className="text-slate-900">12 Months for concrete, pergolas and roofs</strong> (only if there was any oversight by our team during the process of project completion, due to any neglect or error on our behalf, or any error not mentioned on this page).
            </p>
            <p className="text-slate-600 font-bold uppercase text-sm tracking-wide">
              Note: NO WARRANTY ON WOOD CRACKS OR CHECKS: Wood tends to crack and check over a period of time. Warranty for the same is not included.
            </p>
          </div>

          {/* Section 2: Wood Timbers and Beams */}
          <div className="bg-slate-50 rounded-2xl p-8 md:p-12 mb-16 border border-slate-100">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
              The risk for &ldquo;Natural wood lovers&rdquo; wood Timbers and Beams – Cracks and Checking:
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Nothing beats the look and feel of real wood products. They bring warmth, beauty, and charm that just can’t be duplicated with synthetic building materials. As natural wood lovers, when larger timber and beams crack and “check” (as they always do), we believe it only adds to the special character and appeal that only natural wood can provide.
              </p>
              <p>
                The key thing to remember is that these checks do not affect the structural integrity of timber. In fact, it usually makes it stronger, because it releases the tension built up internally.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a href="https://cedarcountrylumber.net/2016/10/05/wood-timbers-and-beams-cracks-and-checking/" target="_blank" rel="noopener noreferrer" className="text-[#00a4dd] hover:underline text-sm break-all">https://cedarcountrylumber.net/2016/10/05/wood-timbers-and-beams-cracks-and-checking/</a>
                <a href="https://www.mcilvain.com/how-to-prevent-cracks-in-timber/" target="_blank" rel="noopener noreferrer" className="text-[#00a4dd] hover:underline text-sm break-all">https://www.mcilvain.com/how-to-prevent-cracks-in-timber/</a>
              </div>
            </div>
          </div>

          {/* Section 3: Concrete Pouring Warranty */}
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-slate-800 uppercase tracking-tight">Concrete Pouring Warranty</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Scope:</h3>
                <p className="text-slate-600">This warranty applies to the concrete pouring services provided by Tamarron Services, It covers the specific aspects outlined below.</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-2">Warranty Period:</h3>
                <p className="text-slate-600">The warranty period for the concrete pouring work shall extend for a period of 12 months, commencing from the date of completion of the concrete pouring services.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h3 className="font-bold text-[#00a4dd] uppercase text-sm tracking-widest">Coverage:</h3>
                  <ul className="space-y-4 text-slate-600 text-sm md:text-base">
                    <li><strong className="text-slate-800 block">Quality of Workmanship:</strong> Tamarron Services warrants that all concrete pouring services shall be performed in accordance with industry standards and practices. Any defects arising from faulty workmanship will be rectified at no additional cost during the warranty period.</li>
                    <li><strong className="text-slate-800 block">Materials Warranty:</strong> Tamarron Services ensures that only high-quality materials meeting specified standards will be used for concrete pouring. Any issues related to materials used will be addressed as per the warranty terms provided by the material suppliers.</li>
                    <li><strong className="text-slate-800 block">Structural Integrity:</strong> Tamarron Services warrants that the poured concrete will meet the structural requirements and will be free from defects that compromise its structural integrity. Cracks, settling, or other structural issues arising due to the concrete pouring will be rectified within the warranty period.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-red-600 uppercase text-sm tracking-widest">Exclusions:</h3>
                  <p className="text-slate-600 font-semibold mb-2">This warranty does not cover damages or defects caused by:</p>
                  <ul className="list-disc pl-5 space-y-3 text-slate-600 text-sm">
                    <li>Misuse, negligence, or improper maintenance by the property owner or third parties.</li>
                    <li>Negligence in watering the concrete for five to ten times per day, for the first 2 weeks, starting 2-4 hours after it has been poured.</li>
                    <li>Acts of nature, including but not limited to earthquakes, floods, other natural disasters or subsidence due to natural causes.</li>
                    <li>Alterations or modifications made to the concrete structure by parties other than Tamarron Services.</li>
                  </ul>
                  <p className="text-slate-600 mt-4 italic">
                    Tamarron Services shall not be held responsible for the repair or rectification of cracks that do not exceed the specified width of 5mm or length of 24 inches, as these are considered within the normal range of concrete behavior and do not compromise the structural integrity or quality of the concrete work.
                  </p>
                </div>
              </div>

              {/* Claims, Liability, and Disclaimer */}
              <div className="border-t border-slate-100 pt-10 space-y-8 text-sm text-slate-600">
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Claims Procedure:</h3>
                  <p>In the event of a warranty claim, the property owner must notify Tamarron Services in writing within a reasonable time from the discovery of the issue. Tamarron Services will inspect the reported issue and, if deemed covered under this warranty, will undertake necessary repairs or replacements promptly.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Limitation of Liability:</h3>
                  <p>Tamarron Services’s liability under this warranty is limited to the cost of repair or replacement of defective workmanship or materials. Tamarron Services shall not be liable for any consequential or incidental damages arising from the warranty claim.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-bold text-slate-800 mb-2">Disclaimer:</h3>
                  <p className="italic">This warranty is the sole and exclusive warranty provided by Tamarron Services for the concrete pouring services and supersedes any other warranties, either expressed or implied, including warranties of merchantability or fitness for a particular purpose.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="mt-20 text-center">
            <Link 
              href="/contact" 
              className="inline-block bg-[#00a4dd] text-white font-bold text-sm uppercase tracking-widest px-12 py-4 rounded-full hover:bg-sky-600 transition-all shadow-lg"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}