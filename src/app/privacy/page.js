export default function Privacy() {
  const lastUpdated = "August 12, 2026";

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-10 pb-24">
      <div className="max-w-3xl mx-auto">

        <a
          href="/profile"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:hover:text-white transition"
        >
          ← Back
        </a>

        <div className="mt-8">
          <p className="text-xs text-yellow-600 dark:text-yellow-400 uppercase tracking-[0.2em] font-bold">
            Legal & Privacy
          </p>

          <h1 className="text-4xl font-black mt-3">
            Privacy Policy
          </h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3">
            Last updated: {lastUpdated}
          </p>
        </div>

        <div className="mt-8 space-y-9 text-sm leading-7 text-zinc-700 dark:text-zinc-300">

          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              1. Introduction
            </h2>

            <p className="mt-3">
              AlphaBot respects your privacy and is committed to protecting
              the personal information you provide when using our platform.
              This Privacy Policy explains what information AlphaBot may
              collect, how that information is used, how it is protected,
              and the circumstances in which it may be shared.
            </p>

            <p className="mt-3">
              This policy applies to information collected through your
              AlphaBot account, website, application and related services.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              2. Information We Collect
            </h2>

            <p className="mt-3">
              Depending on how you use AlphaBot, we may collect information
              including:
            </p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>
                Your name and other account information.
              </li>

              <li>
                Your phone number and email address.
              </li>

              <li>
                Information associated with your AlphaBot account.
              </li>

              <li>
                Transaction information such as transaction type, amount,
                destination, status and reference information.
              </li>

              <li>
                Information required to provide airtime, data, bill payment,
                transfer and other services.
              </li>

              <li>
                Security information associated with features such as
                transaction PINs and two-factor authentication.
              </li>

              <li>
                Technical information such as device, browser, IP address
                and information relating to service security.
              </li>

              <li>
                Information you provide when contacting AlphaBot support.
              </li>
            </ul>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              3. How We Use Your Information
            </h2>

            <p className="mt-3">
              AlphaBot may use collected information to:
            </p>

            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>Create and manage your account.</li>
              <li>Authenticate you and protect your account.</li>
              <li>Process transactions requested through AlphaBot.</li>
              <li>Provide airtime, data and bill payment services.</li>
              <li>Maintain transaction records.</li>
              <li>Detect and prevent fraud, abuse and unauthorized activity.</li>
              <li>Provide customer support.</li>
              <li>Send important account and transaction notifications.</li>
              <li>Improve the reliability and functionality of AlphaBot.</li>
              <li>Comply with applicable legal or regulatory obligations.</li>
            </ul>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              4. Transaction Information
            </h2>

            <p className="mt-3">
              When you make a transaction through AlphaBot, we process the
              information necessary to complete and record that transaction.
              This may include the transaction amount, service type,
              destination, transaction status and reference information.
            </p>

            <p className="mt-3">
              Transaction records may be retained for security, customer
              support, dispute resolution, accounting, fraud prevention and
              applicable legal or regulatory requirements.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              5. Passwords and Transaction PINs
            </h2>

            <p className="mt-3">
              Your AlphaBot password and transaction PIN are security
              credentials used to protect your account and authorize certain
              actions.
            </p>

            <p className="mt-3">
              Passwords and transaction PINs are protected using security
              mechanisms designed to prevent them from being stored as
              ordinary readable text.
            </p>

            <p className="mt-3">
              You should never disclose your password, transaction PIN or
              authentication codes to another person. AlphaBot will not ask
              you to disclose these credentials through ordinary customer
              support communications.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              6. Two-Factor Authentication
            </h2>

            <p className="mt-3">
              AlphaBot may provide two-factor authentication using
              authenticator applications. If you enable this feature,
              AlphaBot stores the security information necessary to verify
              authenticator codes associated with your account.
            </p>

            <p className="mt-3">
              Two-factor authentication provides an additional layer of
              protection beyond your password and may be required for certain
              sensitive account actions.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              7. Biometric Payment Authentication
            </h2>

            <p className="mt-3">
              AlphaBot may support biometric authentication through compatible
              devices, such as fingerprint authentication.
            </p>

            <p className="mt-3">
              When you enable biometric authentication, the biometric
              verification is performed by your device using its supported
              authentication technology. AlphaBot is designed to receive a
              cryptographic proof of successful authentication rather than
              your actual fingerprint or facial biometric image.
            </p>

            <p className="mt-3">
              You can disable biometric payment authentication through the
              security settings available on your AlphaBot account.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              8. How We Protect Your Information
            </h2>

            <p className="mt-3">
              AlphaBot uses reasonable technical and organizational measures
              designed to protect personal and transaction information from
              unauthorized access, alteration, disclosure or destruction.
            </p>

            <p className="mt-3">
              Security measures may include authenticated access, password
              hashing, transaction authorization, two-factor authentication,
              biometric authorization, rate limiting, audit logging and
              encrypted network connections.
            </p>

            <p className="mt-3">
              No online service can guarantee absolute security. You are also
              responsible for protecting your device, account credentials,
              transaction PIN and authentication codes.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              9. Sharing of Information
            </h2>

            <p className="mt-3">
              AlphaBot does not sell your personal information simply because
              you use our services.
            </p>

            <p className="mt-3">
              Information may be shared with service providers when necessary
              to provide services you request. Depending on the service, this
              may include payment, telecommunications, bill-payment,
              infrastructure, security, verification or other technology
              providers.
            </p>

            <p className="mt-3">
              Information may also be disclosed when required by applicable
              law, legal process, regulatory authorities, or when reasonably
              necessary to investigate fraud, abuse, security incidents or
              unauthorized activity.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              10. Third-Party Services
            </h2>

            <p className="mt-3">
              Some AlphaBot features may depend on third-party services.
              Those providers may receive information necessary to perform
              the service requested by you.
            </p>

            <p className="mt-3">
              Third-party providers may maintain their own privacy policies
              and terms. Where applicable, users should review those policies
              before using the relevant service.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              11. Cookies and Local Storage
            </h2>

            <p className="mt-3">
              AlphaBot may use browser storage, cookies or similar technologies
              to maintain sessions, remember preferences and support security
              and functionality.
            </p>

            <p className="mt-3">
              Some features may not function correctly if required browser
              storage or security technologies are disabled.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              12. Data Retention
            </h2>

            <p className="mt-3">
              We retain information for as long as reasonably necessary to
              provide our services, maintain security, process and investigate
              transactions, resolve disputes and satisfy applicable legal or
              regulatory requirements.
            </p>

            <p className="mt-3">
              Different categories of information may therefore be retained
              for different periods.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              13. Account Deletion
            </h2>

            <p className="mt-3">
              Where account deletion is available, you may request deletion
              of your AlphaBot account through the available account controls
              or by contacting AlphaBot support.
            </p>

            <p className="mt-3">
              Deleting an account does not necessarily result in the immediate
              deletion of every associated record. Certain transaction,
              security, fraud-prevention or legal records may need to be
              retained for an appropriate period.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              14. Your Privacy Rights
            </h2>

            <p className="mt-3">
              Depending on applicable law, you may have rights relating to
              your personal information, including requesting access to,
              correction of or deletion of certain information.
            </p>

            <p className="mt-3">
              You may also contact AlphaBot if you have questions about how
              your information is collected or used.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              15. Children's Privacy
            </h2>

            <p className="mt-3">
              AlphaBot is not intended to be used in violation of applicable
              age requirements. We do not knowingly collect personal
              information from children where such collection is prohibited
              by applicable law.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-bold text-black dark:text-white">
              16. Changes to This Policy
            </h2>

            <p className="mt-3">
              AlphaBot may update this Privacy Policy when our services,
              security practices or legal obligations change.
            </p>

            <p className="mt-3">
              When this policy is updated, the date shown at the top of this
              page will also be updated.
            </p>
          </section>


          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
            <h2 className="text-xl font-bold text-black dark:text-white">
              17. Contact Us
            </h2>

            <p className="mt-3">
              If you have questions, concerns or requests relating to privacy
              or the handling of your personal information, please contact
              AlphaBot through our official support channels.
            </p>

            <p className="mt-4 font-semibold text-black dark:text-white">
              Privacy contact:
            </p>

            <a
              href="mailto:alphabothq@gmail.com"
              className="text-yellow-600 dark:text-yellow-400 hover:underline break-all"
            >
              alphabothq@gmail.com
            </a>
          </section>

        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} AlphaBot. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
}
