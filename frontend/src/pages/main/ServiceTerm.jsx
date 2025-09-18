// src/pages/legal/ServiceTerms.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceTerms() {
  const navigate = useNavigate();

    const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-90">
      {/* Back button */}
      <button
        onClick={goToSignUp}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: May 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By using Althea’s Cro-Shet website and services, you agree to these Terms
            of Service. If you do not agree, please do not use our Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
          <p>
            You must be at least 18 years old. By registering, you warrant that you
            meet this requirement.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
          <p>
            Provide accurate information and keep your password confidential. You are
            responsible for all activity on your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Ordering &amp; Customization</h2>
          <p>
            You may customize products and preview with AR. All custom orders are
            subject to stock availability.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Pricing &amp; Payment</h2>
          <p>
            Prices are in PHP and include taxes unless stated. We accept COD and GCash via
            a secure third-party gateway.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Shipping &amp; Delivery</h2>
          <p>
            Delivery times vary. Risk passes to you upon delivery—inspect items and report
            issues within 24 hours.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Cancellations &amp; Returns</h2>
          <p>
            Cancel within 1 hour by emailing{' '}
            <a href="mailto:support@altheascroshet.com" className="underline">
              support@altheascroshet.com
            </a>
            . Custom items are non-returnable unless defective.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Intellectual Property</h2>
          <p>
            All content and software are owned by Althea’s Cro-Shet or its licensors. No
            reproduction without consent.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. User Conduct</h2>
          <p>
            You agree not to violate laws, infringe rights, or interfere with our Service’s
            operation.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            10. Disclaimers &amp; Limitation of Liability
          </h2>
          <p>
            The Service is provided “as is.” We are not liable for indirect or consequential
            damages.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">11. Indemnification</h2>
          <p>
            You agree to indemnify Althea’s Cro-Shet from any claims arising from your use of
            the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            12. Governing Law &amp; Dispute Resolution
          </h2>
          <p>
            These Terms are governed by Philippine law. Disputes go to the courts of Laguna,
            Philippines.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">13. Changes to These Terms</h2>
          <p>
            We may update these Terms. Continued use after changes signifies acceptance.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">14. Contact Information</h2>
          <p>
            Questions? Email{' '}
            <a href="mailto:legal@altheascroshet.com" className="underline">
              legal@altheascroshet.com
            </a>
            .
          </p>
        </section>

        {/* Confirmation button */}
        <div className="mt-8 text-center">
          <button
            onClick={goToSignUp}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            I Confirm I’ve Read These Terms
          </button>
        </div>
      </div>
    </div>
  );
}
