import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Terms = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-48 p-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl font-black mb-8 text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-3xl mx-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                1. Acceptance of Terms
              </h2>
              <p className="text-center">
                By accessing and using Fashion:Week, you agree to be bound by
                these Terms of Service. If you do not agree to these terms,
                please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                2. Description of Service
              </h2>
              <p className="text-center">
                Fashion:Week is a platform that allows users to discover and
                track fashion brands, participate in style quizzes, and create
                wishlists. We provide these services subject to these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                3. User Accounts
              </h2>
              <p className="text-center">
                You may need to create an account to access certain features.
                You are responsible for maintaining the confidentiality of your
                account information and for all activities under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                4. Content
              </h2>
              <p className="text-center">
                All content provided on Fashion:Week is for informational
                purposes only. We do not guarantee the accuracy, completeness,
                or usefulness of this information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                5. Intellectual Property
              </h2>
              <p className="text-center">
                The content, organization, graphics, design, and other matters
                related to Fashion:Week are protected under applicable
                copyrights and other proprietary laws. The copying,
                redistribution, or publication of any part of the service is
                prohibited without express permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                6. Changes to Terms
              </h2>
              <p className="text-center">
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes by posting the new Terms of
                Service on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                7. Contact Information
              </h2>
              <p className="text-center">
                If you have any questions about these Terms, please contact us
                at support@fashionweek.com.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/home"
              className="text-black hover:text-gray-700 font-bold"
              style={{ fontFamily: "Arial Black, sans-serif" }}
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
