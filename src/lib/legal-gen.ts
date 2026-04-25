
export function generatePrivacyPolicy(siteName: string, email: string) {
  return `
    Privacy Policy for ${siteName}
    Last Updated: ${new Date().toLocaleDateString()}

    At ${siteName}, we take your privacy seriously. This policy outlines how we collect and use your data...
    1. Information Collection: We collect emails for newsletters via OneSignal and Google Analytics for traffic data.
    2. Data Usage: Your data is never sold to third parties.
    3. Contact: Reach us at ${email} for data removal requests.
  `;
}

export function generateTermsAndConditions(siteName: string) {
  return `
    Terms and Conditions for ${siteName}
    1. Acceptance of Terms: By using this news portal, you agree to our editorial guidelines.
    2. Intellectual Property: All Telugu content and E-paper images are property of ${siteName}.
    3. User Conduct: No abusive comments in the poll section.
  `;
}
