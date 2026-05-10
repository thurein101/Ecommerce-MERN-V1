import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: January 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              1. Introduction
            </h2>
            <p className="mt-2">
              This Privacy Policy explains how we collect, use, and protect
              your personal information when you use our application or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              2. Information We Collect
            </h2>
            <p className="mt-2">
              We may collect personal information such as your name, email
              address, and usage data when you interact with our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To improve user experience</li>
              <li>To communicate important updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              4. Data Security
            </h2>
            <p className="mt-2">
              We implement reasonable security measures to protect your
              information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              5. Third-Party Services
            </h2>
            <p className="mt-2">
              Our application may contain links to third-party services.
              We are not responsible for the privacy practices of those services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              6. Your Rights
            </h2>
            <p className="mt-2">
              You have the right to access, update, or delete your personal
              information, subject to applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              7. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy from time to time.
              Any changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800">
              8. Contact Us
            </h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <span className="font-medium">privacy@example.com</span>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
