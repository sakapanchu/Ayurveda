const ReturnsRefunds = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Returns & Refunds Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
  
        <div className="space-y-6">
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-green-700 mb-3">Ayurvedic Product Return Considerations</h2>
            <p className="text-gray-700">
              Due to the nature of Ayurvedic products:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>We cannot accept returns of opened or used products for hygiene reasons</li>
              <li>Certain products like oils and pastes may have special return conditions</li>
              <li>Custom formulations prepared specifically for you cannot be returned</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">1. Eligibility for Returns</h2>
            <p className="text-gray-700">
              You may request a return within 7 days of delivery if:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Product is unopened and in original packaging</li>
              <li>Product is defective or damaged</li>
              <li>Wrong item was shipped</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">2. Return Process</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Contact us</strong> at returns@ayurveda.com or call +91 9876543210 within 7 days of delivery
              </li>
              <li>
                <strong>Provide details:</strong> Order number, product name, reason for return
              </li>
              <li>
                <strong>Wait for approval:</strong> We'll email you a Return Authorization if eligible
              </li>
              <li>
                <strong>Ship back:</strong> Include all original packaging and our RA number
              </li>
            </ol>
            <p className="text-gray-700 mt-3">
              Return shipping costs are the customer's responsibility unless the return is due to our error.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">3. Refund Processing</h2>
            <p className="text-gray-700">
              Once we receive and inspect your return:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Refunds are processed within 5-7 business days</li>
              <li>Original shipping costs are non-refundable</li>
              <li>Refunds are issued to the original payment method</li>
            </ul>
            <p className="text-gray-700 mt-2">
              International refunds may take additional time depending on your bank.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">4. Non-Returnable Items</h2>
            <p className="text-gray-700">
              The following cannot be returned:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Opened or used products</li>
              <li>Custom or personalized formulations</li>
              <li>Products marked "Final Sale"</li>
              <li>Gift cards</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">5. Damaged or Defective Products</h2>
            <p className="text-gray-700">
              If you receive a damaged or defective product:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
              <li>Contact us within 48 hours of delivery</li>
              <li>Provide photos of the damage</li>
              <li>We will arrange for replacement or refund</li>
            </ol>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">6. Ayurvedic Product Guarantee</h2>
            <p className="text-gray-700">
              While we stand by our products:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Results may vary based on individual constitution (Prakriti)</li>
              <li>We recommend consulting with our Ayurvedic experts for proper usage</li>
              <li>Traditional Ayurvedic remedies require consistent use as directed</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">7. Cancellations</h2>
            <p className="text-gray-700">
              You may cancel your order:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Within 1 hour of placing the order - full refund</li>
              <li>After 1 hour but before shipping - 90% refund (10% processing fee)</li>
              <li>After shipment - standard return policy applies</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">8. Contact Us</h2>
            <p className="text-gray-700">
              For return-related questions:
              <br />
              Email: returns@ayurveda.com
              <br />
              Phone: +91 9876543210 (Mon-Sat, 9AM-6PM IST)
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default ReturnsRefunds;