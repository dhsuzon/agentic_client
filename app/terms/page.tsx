"use client";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold text-foreground dark:text-white">Terms of Service</h1>
      <p className="mb-2 text-sm text-foreground/60">Last updated: July 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">1. Acceptance of Terms</h2>
          <p>By accessing TutorialsPoint, you agree to these terms. If you do not agree, do not use the platform.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">2. User Accounts</h2>
          <p>You are responsible for maintaining your account credentials. You must be at least 13 years old to use this service.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">3. Course Content</h2>
          <p>Instructors retain ownership of their course content. By publishing, you grant TutorialsPoint a license to host and distribute your content.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">4. Acceptable Use</h2>
          <p>You agree not to misuse the platform, including uploading harmful content, violating intellectual property rights, or engaging in fraudulent activity.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">5. Termination</h2>
          <p>We reserve the right to suspend or terminate accounts that violate these terms without prior notice.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground dark:text-white">6. Changes</h2>
          <p>We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>
        </section>
      </div>
    </div>
  );
}
