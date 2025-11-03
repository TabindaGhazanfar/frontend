import React from "react";

export default function Disclaimer() {
  return (
    <main className="bg-white min-h-screen text-[#222] font-sans">
      {/* Same wide container & spacing as Terms/Privacy */}
      <div className="max-w-screen-2xl mx-auto px-3 md:px-6 lg:px-10 py-12">

        {/* Centered page title (no breadcrumb) */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-10 text-center text-gray-900">
          Fraud Awareness <span className="text-teal-600">Disclaimer</span>
        </h1>

        {/* Paragraphs only (no section headings), Zolo-style */}
        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          We have observed attempts by unauthorized individuals and groups to misuse the EasyRent
          name, logo, and brand identity in order to deceive the public. Such actors may contact users
          through unofficial messaging platforms, social media pages, personal phone numbers, or
          fake websites, while falsely claiming to represent EasyRent.
        </p>

        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          These individuals may try to obtain your personal information, request advance payments,
          or ask for sensitive data by posing as EasyRent employees, agents, support staff, or rental
          verification officers. EasyRent does not authorize any person to seek payments or personal
          information outside our official website or app. Always verify that you are communicating
          through EasyRent’s official channels before sharing details or making any payment.
        </p>

        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          The objective of such fraudulent activity is to induce you to transfer money or disclose
          sensitive information. We strongly advise you to refrain from making payments or sharing
          any personal details until you have independently verified the authenticity of the request
          through our official Platform.
        </p>

        {/* Numbered steps allowed (like Zolo) */}
        <p className="text-[17px] leading-8 mb-3 text-gray-800">
          If you believe you are the victim of fraud or have encountered suspicious communication,
          please take the following steps immediately:
        </p>
        <ol className="list-decimal pl-6 text-[17px] leading-8 mb-7 text-gray-800 space-y-1">
          <li>
            Report the incident without delay to the relevant legal authorities. You may contact the
            FIA Cyber Crime Wing or file an FIR at your nearest police station.
          </li>
          <li>
            Inform EasyRent by emailing <span className="font-medium">fraud@easyrent.pk</span> or{" "}
            <span className="font-medium">support@easyrent.pk</span>. Our team will review and assist promptly.
          </li>
          <li>
            Preserve all supporting information such as screenshots, payment receipts, chat logs,
            call recordings, bank transaction proofs, and any other relevant evidence.
          </li>
        </ol>

        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          Use only the official EasyRent website and app to communicate with us. Do not rely on
          WhatsApp numbers, unofficial pages, or third-party contacts claiming to represent EasyRent.
          Fraudsters may use fake social profiles, ads, and direct messages to mislead you—always
          verify first and proceed only through our verified Platform channels.
        </p>

        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          Any impersonation or unauthorized communication that misuses the EasyRent brand may result
          in criminal and/or civil liability under applicable laws, including the Pakistan Electronic
          Crimes Act (PECA) 2016. EasyRent cooperates with law enforcement authorities to prevent
          brand misuse and to protect users.
        </p>

        <p className="text-[17px] leading-8 mb-7 text-gray-800">
          Please note that EasyRent shall not be liable for any claims, losses, damages, expenses,
          or inconvenience arising from interactions with unauthorized individuals operating outside
          our official channels. We do not request advance payments through personal accounts, and we
          do not charge “visit” or “verification” fees via informal methods.
        </p>

        <p className="text-[17px] leading-8 text-gray-800">
          We are working with relevant authorities to stop fraudulent use of our brand. Be cautious if
          anyone asks you to send money upfront—scammers often begin with small amounts and may lead to
          significant financial loss. Stay vigilant and exercise caution when sharing personal information
          or making digital payments.
        </p>

      </div>
    </main>
  );
}
