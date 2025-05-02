import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Privacy = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-48 p-8">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl font-black mb-8 text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-3xl mx-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                1. Information We Collect
              </h2>
              <p className="text-center">
                We collect information that you provide directly to us,
                including when you create an account, make a wishlist, or
                participate in style quizzes. This may include:
              </p>
              <div className="flex flex-col items-center mt-4">
                <ul className="list-none space-y-2 text-center">
                  <li>• Name and email address</li>
                  <li>• Style preferences and quiz responses</li>
                  <li>• Liked and saved brands</li>
                  <li>• Usage data and interaction with our platform</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                2. How We Use Your Information
              </h2>
              <p className="text-center">
                We use the information we collect to:
              </p>
              <div className="flex flex-col items-center mt-4">
                <ul className="list-none space-y-2 text-center">
                  <li>• Provide and improve our services</li>
                  <li>• Personalize your experience</li>
                  <li>• Send you updates and marketing communications</li>
                  <li>• Analyze usage patterns and trends</li>
                  <li>• Protect against fraud and unauthorized access</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                3. Information Sharing
              </h2>
              <p className="text-center">
                We do not sell your personal information. We may share your
                information with:
              </p>
              <div className="flex flex-col items-center mt-4">
                <ul className="list-none space-y-2 text-center">
                  <li>• Service providers who assist in our operations</li>
                  <li>• Law enforcement when required by law</li>
                  <li>• Other parties with your consent</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                4. Data Security
              </h2>
              <p className="text-center">
                We implement appropriate technical and organizational measures
                to protect your personal information. However, no method of
                transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                5. Your Rights
              </h2>
              <p className="text-center">You have the right to:</p>
              <div className="flex flex-col items-center mt-4">
                <ul className="list-none space-y-2 text-center">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request deletion of your information</li>
                  <li>• Opt-out of marketing communications</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                6. Changes to Privacy Policy
              </h2>
              <p className="text-center">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                7. Contact Us
              </h2>
              <p className="text-center">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@fashionweek.com.
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

export default Privacy;
