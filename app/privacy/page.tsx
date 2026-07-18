"use client";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
      <p className="mb-2 text-sm text-foreground/60">Last updated: July 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>We collect information you provide when creating an account, including your name, email address, and profile picture. We also collect course interaction data to improve recommendations.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>Your information is used to provide and improve our services, personalize your learning experience, send updates, and ensure platform security.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share anonymized data with partners to improve AI models and course recommendations.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Data Security</h2>
          <p>We implement industry-standard encryption and security measures to protect your data. Authentication is handled through secure JWT-based sessions.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Your Rights</h2>
          <p>You can access, update, or delete your account data at any time through your profile settings. Contact us for data portability requests.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">6. Contact</h2>
          <p>For privacy-related inquiries, contact us at privacy@tutorialspoint.com.</p>
        </section>
      </div>
    </div>
  );
}
