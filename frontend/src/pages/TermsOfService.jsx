const TermsOfService = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Effective date: {new Date().toLocaleDateString()}</p>
  
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing or using the AyurVeda website and services, you agree to be bound by these Terms. 
              If you disagree, please do not use our services.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">2. Account Registration</h2>
            <p className="text-gray-700">
              To place orders, you may need to create an account. You must:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your credentials</li>
              <li>Be at least 18 years old</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">3. Product Information</h2>
            <p className="text-gray-700">
              We strive for accuracy but cannot guarantee that:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Product descriptions are error-free</li>
              <li>Images exactly match the product</li>
              <li>Inventory is always available</li>
            </ul>
            <p className="text-gray-700 mt-2">
              Ayurvedic products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">4. Orders and Pricing</h2>
            <p className="text-gray-700">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Refuse or cancel any order</li>
              <li>Change prices without notice (except for confirmed orders)</li>
              <li>Limit quantities purchased</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">5. Shipping Policy</h2>
            <p className="text-gray-700">
              Please refer to our separate <a href="/shipping" className="text-green-600 underline">Shipping Policy</a> for details on:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Delivery timelines</li>
              <li>Shipping costs</li>
              <li>International shipping restrictions</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">6. Returns and Refunds</h2>
            <p className="text-gray-700">
              Please review our <a href="/returns" className="text-green-600 underline">Returns & Refunds Policy</a>. Ayurvedic products may have special return conditions due to their nature.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">7. Intellectual Property</h2>
            <p className="text-gray-700">
              All content on our website (logos, text, graphics) is our property and protected by copyright laws.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-700">
              AyurVeda shall not be liable for any indirect, incidental, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Use or inability to use our services</li>
              <li>Unauthorized access to your data</li>
              <li>Any third-party conduct</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">9. Governing Law</h2>
            <p className="text-gray-700">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Uttarakhand.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">10. Changes to Terms</h2>
            <p className="text-gray-700">
              We may modify these Terms at any time. Continued use after changes constitutes acceptance.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">11. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms:
              <br />
              Email: legal@ayurveda.com
              <br />
              Phone: +91 9876543210
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default TermsOfService;