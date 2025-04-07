const PrivacyPolicy = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
  
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700">
              We collect information to provide better services to our customers. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Personal information you provide (name, email, phone number, shipping address)</li>
              <li>Payment information processed through secure payment gateways</li>
              <li>Order history and preferences</li>
              <li>Device and usage information collected automatically through cookies</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700">
              Your information helps us to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send you relevant offers (only with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>SSL encryption for all data transmissions</li>
              <li>Secure storage with access controls</li>
              <li>Regular security audits</li>
            </ul>
            <p className="text-gray-700 mt-2">
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">4. Third-Party Services</h2>
            <p className="text-gray-700">
              We use trusted third parties for:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Payment processing (Razorpay, PayPal)</li>
              <li>Shipping (Delhivery, FedEx)</li>
              <li>Analytics (Google Analytics)</li>
            </ul>
            <p className="text-gray-700 mt-2">
              These third parties have their own privacy policies.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">5. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent (where applicable)</li>
            </ul>
            <p className="text-gray-700 mt-2">
              To exercise these rights, contact us at privacy@ayurveda.com.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">6. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this policy periodically. The updated version will be posted on our website.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">7. Contact Us</h2>
            <p className="text-gray-700">
              For any privacy-related concerns:
              <br />
              Email: privacy@ayurveda.com
              <br />
              Phone: +91 9876543210
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;