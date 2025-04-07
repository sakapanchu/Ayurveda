const ShippingPolicy = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Shipping Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
  
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">1. Domestic Shipping (Within India)</h2>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-medium text-green-700 mb-1">Standard Shipping</h3>
                  <p className="text-sm text-gray-600">3-7 business days</p>
                  <p className="text-sm text-gray-600">₹49 (Free on orders over ₹999)</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-medium text-green-700 mb-1">Express Shipping</h3>
                  <p className="text-sm text-gray-600">2-4 business days</p>
                  <p className="text-sm text-gray-600">₹149</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-medium text-green-700 mb-1">Same-Day Delivery*</h3>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                  <p className="text-sm text-gray-600">₹299 (Select metros only)</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic">
                *Available in Delhi, Mumbai, Bangalore, Hyderabad, and Chennai for orders placed before 12 PM
              </p>
            </div>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">2. International Shipping</h2>
            <p className="text-gray-700 mb-2">
              We ship to select countries with the following options:
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-medium text-green-700 mb-1">Standard International</h3>
                  <p className="text-sm text-gray-600">7-15 business days</p>
                  <p className="text-sm text-gray-600">Starting at $14.99</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <h3 className="font-medium text-green-700 mb-1">Express International</h3>
                  <p className="text-sm text-gray-600">3-7 business days</p>
                  <p className="text-sm text-gray-600">Starting at $29.99</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Note: International customers are responsible for any customs duties or taxes.
              </p>
            </div>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">3. Order Processing</h2>
            <p className="text-gray-700">
              Orders are typically processed within:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>1 business day for in-stock items</li>
              <li>3-5 business days for custom formulations</li>
              <li>You will receive tracking information via email once shipped</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">4. Shipping Restrictions</h2>
            <p className="text-gray-700">
              Due to the nature of our products:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Some liquid formulations cannot be shipped internationally</li>
              <li>Temperature-sensitive products may have seasonal shipping limitations</li>
              <li>Certain countries restrict Ayurvedic product imports</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">5. Undeliverable Packages</h2>
            <p className="text-gray-700">
              If a package is returned to us as undeliverable:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>We will contact you to arrange reshipment (additional charges may apply)</li>
              <li>Or issue a refund minus original shipping costs</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">6. Damaged in Transit</h2>
            <p className="text-gray-700">
              If your order arrives damaged:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
              <li>Take photos of the damaged package and products</li>
              <li>Contact us within 48 hours of delivery at support@ayurveda.com</li>
              <li>We will arrange for replacement or refund</li>
            </ol>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">7. Special Ayurvedic Considerations</h2>
            <p className="text-gray-700">
              Our herbal products require special handling:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Shipped in protective packaging to preserve potency</li>
              <li>Some oils may expand/contract with temperature changes - this is normal</li>
              <li>Store in a cool, dry place upon arrival</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">8. Contact Us</h2>
            <p className="text-gray-700">
              For shipping inquiries:
              <br />
              Email: shipping@ayurveda.com
              <br />
              Phone: +91 9876543210 (Mon-Sat, 9AM-6PM IST)
            </p>
          </section>
        </div>
      </div>
    );
  };
  
  export default ShippingPolicy;