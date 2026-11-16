
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-5xl font-bold text-[#0A2540] mb-4">Terms &amp; Conditions</h1>
        <p className="text-gray-600 mb-12">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">1. LinkedIn Account Ownership</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any LinkedIn accounts created by Netcozy on behalf of users remain the property of Netcozy. Users are granted access to use these accounts for networking and professional purposes, but Netcozy retains full ownership rights and administrative control.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Netcozy reserves the right to access, modify, or terminate these accounts at any time for maintenance, security, or compliance purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">2. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Netcozy is not responsible for any accidents, incidents, injuries, losses, or damages that may occur during events, travel, or activities booked through our platform. Users participate in all activities at their own risk.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While we strive to partner with reputable service providers, Netcozy does not guarantee the safety, quality, or accuracy of third-party services, accommodations, or events.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">3. Service Suspension</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Netcozy reserves the right to suspend, modify, or terminate services at any time without prior notice. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Suspension of user accounts for violation of terms</li>
              <li>Temporary service interruptions for maintenance</li>
              <li>Permanent discontinuation of specific features or services</li>
              <li>Changes to pricing, membership tiers, or access levels</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Users will not be entitled to refunds for suspended or terminated services unless explicitly stated in our refund policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">4. Ongoing Account Access</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By creating an account with Netcozy, users grant Netcozy ongoing access to their account information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Network maintenance and optimization</li>
              <li>Security monitoring and fraud prevention</li>
              <li>Service improvements and personalization</li>
              <li>Compliance with legal and regulatory requirements</li>
              <li>Customer support and technical assistance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This access is necessary to provide continuous service and maintain the integrity of the Netcozy platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">5. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Providing accurate and truthful information during registration</li>
              <li>Maintaining the confidentiality of their account credentials</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Respecting the rights and privacy of other users</li>
              <li>Using the platform for lawful purposes only</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">6. Verification and Approval</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All new accounts are subject to verification and approval by Netcozy. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Request additional documentation for identity verification</li>
              <li>Deny account creation without providing a reason</li>
              <li>Require partner verification before granting full access</li>
              <li>Assign service levels based on verification results</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">7. Payment and Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Service fees are non-refundable unless otherwise stated. Users are responsible for all charges associated with their selected service tier. Netcozy reserves the right to modify pricing at any time with notice to existing members.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, trademarks, logos, and intellectual property on the Netcozy platform are owned by Netcozy or its licensors. Users may not reproduce, distribute, or create derivative works without explicit written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">9. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              User data is collected and processed in accordance with our Privacy Policy. By using Netcozy services, users consent to the collection, storage, and use of their personal information as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">10. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms &amp; Conditions are subject to continuous updates and modifications. Netcozy will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the updated terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Users are encouraged to review these terms regularly to stay informed of any changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A2540] mb-4">11. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions or concerns regarding these Terms &amp; Conditions, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> exe.desk@netcozyworkawayweekend.com</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> 213-631-0859</p>
              <p className="text-gray-700"><strong>Address:</strong> Netcozy Legal Department, 1900 Camden Avenue, San Jose, CA 95124</p>
            </div>
          </section>

          <div className="bg-[#1990FF]/10 border-l-4 border-[#1990FF] rounded-lg p-6 mt-12">
            <p className="text-gray-700 font-semibold mb-2 flex items-center">
              <i className="ri-information-line text-xl text-[#1990FF] mr-2" aria-hidden="true"></i>
              Important Notice
            </p>
            <p className="text-gray-700">
              By creating an account or using Netcozy services, you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
