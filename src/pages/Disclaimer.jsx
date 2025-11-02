import React from "react";

function LegalCard({ index, title, children }) {
  return (
    <div className="relative rounded-2xl bg-white shadow-md border border-teal-200 p-6 sm:p-7 mb-5 pl-6 
                    transition-all hover:shadow-lg hover:border-teal-300">
      {/* number bubble */}
      <div className="absolute -left-5 top-6 flex h-9 w-9 items-center justify-center rounded-full 
                      bg-teal-100 text-teal-700 font-semibold shadow">
        {index}
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Disclaimer() {
  const lastUpdated = "October 2025";

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto w-full max-w-6xl px-4 lg:px-6 py-8">
        
        {/* Title */}
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Disclaimer
          </h1>
          <p className="text-gray-600 text-sm mt-1">Last updated: {lastUpdated}</p>
        </header>

        {/* Legal Cards */}
        <LegalCard index={1} title="Information Accuracy">
          We strive for accuracy but do not guarantee that listings, pricing, availability, or other 
          content are error-free or current. Owners are responsible for their listings and items.
        </LegalCard>

        <LegalCard index={2} title="No Professional Advice">
          Content on EasyRent is for general information and does not constitute legal, financial, or 
          professional advice. Please obtain advice tailored to your situation when needed.
        </LegalCard>

        <LegalCard index={3} title="Third-Party Links & Services">
          We are not responsible for third-party websites or services linked from EasyRent, including 
          payment gateways (JazzCash, Easypaisa) and identity/OTP providers.
        </LegalCard>

        <LegalCard index={4} title="Limitation of Liability">
          To the extent permitted by law, EasyRent and its team will not be liable for indirect, incidental, 
          special, or consequential losses (e.g., loss of profits, data, goodwill). Our total liability, if any, 
          is limited to the fees you paid to us in the 3 months prior to the claim.
        </LegalCard>
      </section>
    </main>
  );
}
