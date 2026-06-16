"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TermsAndConditions() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: "intro",
      title: "INTRODUCTION & DEFINITIONS",
      content: `HealviaCare (referred to as "we", "us", "Company", "HealviaCare") is the author and publisher of the internet resource www.healviacare.com and its sub domains (www.healviacare.in, www.healviacare.org, www.healviacare.co.in, www.healviacare.co, www.healviacarehealth.com, www.healviacareapp.in, www.hexa-health.com, www.healviacareapp.com) on the world wide web as well as other connected software and applications provided by HealviaCare, and together with Websites referred to as "Services". HealviaCare provides the Services in partnership with its agents, affiliates, associates, representatives or other third parties (together referred to as "Partners").

For the purpose of these Terms and Conditions:
- "Website" means the website www.healviacare.com and all its sub-domains, mobile applications, and digital platforms operated by HealviaCare
- "Services" means all services, information, and products offered through the Website
- "User" or "You" means any individual or legal entity accessing or using the Website
- "Personal Information" means any information that can identify an individual
- "Healthcare Provider" means doctors, hospitals, medical centers, and other medical professionals listed on the Website`
    },
    {
      id: "acceptance",
      title: "1. ACCEPTANCE & BINDING NATURE OF TERMS",
      content: `By accessing, browsing, or using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These Terms constitute a legally binding agreement between you and HealviaCare.

If you do not agree with any part of these Terms, you must immediately cease using the Website and Services. Your continued use of the Website after any modifications to these Terms constitutes your acceptance of the updated Terms.

HealviaCare reserves the right to modify, amend, or update these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for changes. Your continued use of the Website following the posting of revised Terms means that you accept and agree to the changes.`
    },
    {
      id: "applicability",
      title: "2. NATURE & APPLICABILITY OF TERMS",
      content: `These Terms and Conditions apply to all users of the Website and Services, including but not limited to:
- Patients, individuals seeking medical consultation or treatment
- Guardians, legal representatives, attendants, relatives, or friends acting on behalf of a patient
- Healthcare providers and medical professionals
- Any person accessing or using any part of the Website

The agreement applies to your access to and use of:
- The Website and all its pages and features
- All Services offered through the Website
- All information, content, and features provided by HealviaCare
- All transactions and interactions conducted through the Website
- Third-party integrations and services linked through the Website

These Terms apply regardless of the method of access (desktop, mobile, app, etc.) or the device used to access the Website.`
    },
    {
      id: "use-license",
      title: "3. LIMITED LICENSE & USE RESTRICTIONS",
      content: `Grant of License:
HealviaCare grants you a non-exclusive, non-transferable, revocable license to access and use the Website solely for lawful purposes in accordance with these Terms. This license does not include:
- Downloading or modifying any portion of the Website (except as provided by HealviaCare)
- Removing any copyright, trademark, or other proprietary notices
- Transferring access or use to any third party
- Using the Website for commercial purposes without authorization
- Accessing the Website through automated means (bots, scrapers, etc.)

Permitted Uses:
You may use the Website to:
- Browse information about healthcare services and providers
- Book consultations with healthcare providers
- Access information about treatments and medical conditions
- Store your medical information securely
- Communicate with healthcare providers for scheduling and consultation
- Access educational content about health and wellness

Restricted Uses:
You agree not to use the Website for:
- Any illegal purpose or in violation of any law or regulation
- Harassing, threatening, or abusing any individual or organization
- Collecting personal information of others without consent
- Sending spam, malware, or viruses
- Attempting to gain unauthorized access to the Website or its systems
- Reverse engineering, decompiling, or modifying Website code
- Creating automated tools or bots to access the Website
- Selling, licensing, or transferring access to the Website
- Using the Website for medical advice without proper consultation
- Impersonating healthcare professionals or making false claims
- Posting defamatory, obscene, or offensive content
- Interfering with the normal operation of the Website
- Bypassing security measures or authentication systems`
    },
    {
      id: "user-accounts",
      title: "4. USER ACCOUNTS & REGISTRATION",
      content: `Account Creation:
To access certain features of the Website, you may need to create an account. When creating an account:
- You must provide accurate, complete, and current information
- You are responsible for maintaining the confidentiality of your password
- You are responsible for all activities under your account
- You must notify HealviaCare immediately of any unauthorized access or use
- You must not create multiple accounts or accounts using false information

Account Responsibilities:
- You are solely responsible for protecting your login credentials
- HealviaCare is not liable for unauthorized access to your account due to negligence
- You agree to provide accurate medical information for diagnosis and treatment purposes
- Providing false medical information may result in service termination
- You are responsible for reviewing account statements and reporting discrepancies

Account Termination:
HealviaCare may suspend or terminate your account:
- For violation of these Terms and Conditions
- For providing false or misleading information
- For non-payment of fees (if applicable)
- For inactivity over an extended period
- For breach of healthcare provider agreements
- Without liability or obligation to refund any fees`
    },
    {
      id: "user-information",
      title: "5. USER INFORMATION & DATA COLLECTION",
      content: `Information We Collect:
We collect and store the following information:
- Name, age, gender, and date of birth
- Contact information (phone number, email address, home address)
- Medical history and health information
- Treatment preferences and medical conditions
- Payment information (if applicable)
- Device information and usage patterns
- IP address and browsing history
- Any information voluntarily provided through forms or communication

Use of Information:
Your information is used for:
- Scheduling and managing appointments with healthcare providers
- Providing healthcare services and consultations
- Improving our Services and user experience
- Sending appointment reminders and medical updates
- Processing payments and billing
- Conducting research and analytics
- Complying with legal obligations
- Fraud prevention and security purposes
- Marketing and promotional communications (with your consent)

Data Storage & Security:
- All personal and medical information is stored securely using encryption
- We implement industry-standard security measures to protect your data
- Your data is stored on secure servers with access controls
- We retain information as long as necessary for service provision or legal requirements
- Deleted information may remain in backups for a limited period
- We do not guarantee absolute security despite reasonable measures

Sharing of Information:
Your information may be shared with:
- Healthcare providers for treatment purposes
- Medical professionals for consultation and care
- Insurance companies for claims processing (if applicable)
- Government authorities as required by law
- Business partners and affiliates with your consent
- Service providers assisting with platform operations

Information will NOT be shared or sold:
- For marketing purposes without your consent
- To third parties for commercial gain
- With unauthorized individuals or organizations
- Beyond the scope of providing healthcare services`
    },
    {
      id: "medical-disclaimer",
      title: "6. MEDICAL ADVICE DISCLAIMER",
      content: `Important Medical Notice:
THE SERVICES PROVIDED ON THIS WEBSITE ARE FOR INFORMATIONAL PURPOSES ONLY AND NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.

Limitations of Services:
- Information on this Website is not a replacement for professional medical consultation
- The Website does not provide medical advice or treatment
- Healthcare providers listed on the Website may have varying qualifications and experience
- Information is not intended to diagnose, treat, cure, or prevent any disease
- Results and outcomes may vary based on individual health conditions
- Medical decisions should only be made after consulting with qualified healthcare professionals

No Professional Relationship:
- Accessing the Website does not create a doctor-patient relationship
- Booking a consultation may initiate a professional relationship with the healthcare provider
- HealviaCare is not liable for diagnoses or treatment provided by healthcare providers
- Healthcare providers are independent professionals responsible for their services
- HealviaCare does not endorse or guarantee the quality of healthcare services

User Acknowledgment:
By using the Website, you acknowledge:
- You will not rely solely on Website information for medical decisions
- You will seek professional medical advice before making health decisions
- You understand the limitations and risks of telemedicine
- You accept responsibility for consequences of medical decisions
- You will not hold HealviaCare liable for healthcare provider actions
- You understand that medical emergencies require immediate professional care

Emergency Situations:
If you experience a medical emergency:
- Do not use this Website
- Call emergency services immediately (ambulance: 102, Police: 100)
- Visit the nearest hospital emergency department
- Do not delay seeking immediate medical care`
    },
    {
      id: "healthcare-provider",
      title: "7. HEALTHCARE PROVIDERS & SERVICES",
      content: `Healthcare Provider Information:
- HealviaCare is a platform connecting patients with independent healthcare providers
- Healthcare providers are independent professionals, not employees of HealviaCare
- Each healthcare provider is responsible for:
  - Providing accurate professional credentials
  - Maintaining professional standards and ethics
  - Providing competent and appropriate care
  - Following applicable medical laws and regulations
  - Maintaining patient confidentiality

Verification & Credentials:
- HealviaCare strives to verify healthcare provider credentials
- Verification does not guarantee quality of care or competence
- Patients should independently verify provider qualifications if desired
- HealviaCare is not responsible for false or misleading credentials
- Regulatory bodies may be contacted for credential verification

Service Quality & Liability:
- HealviaCare does not guarantee the quality of healthcare services
- HealviaCare is not liable for:
  - Medical negligence or malpractice by healthcare providers
  - Incorrect diagnoses or inappropriate treatment
  - Failed treatments or negative health outcomes
  - Healthcare provider misconduct or unprofessional behavior
  - Communication delays or missed appointments
  - Technical issues causing service disruptions

Patient Recourse:
- Disputes with healthcare providers should be addressed directly with the provider
- Regulatory complaints can be filed with:
  - Medical Council of the respective state
  - Central Government Health Authority
  - Consumer Protection Commission
  - Other applicable regulatory bodies
- HealviaCare may assist in dispute resolution but is not liable for provider actions`
    },
    {
      id: "appointments-scheduling",
      title: "8. APPOINTMENT SCHEDULING & CONSULTATIONS",
      content: `Booking Appointments:
- Appointments are subject to healthcare provider availability
- Confirmation of appointment is sent via email or SMS
- You must provide accurate personal and medical information
- Cancellation or rescheduling should be done through the Website
- Late cancellation may result in charges (as per healthcare provider policy)

Appointment Policies:
- Arrive on time for in-person appointments
- Bring relevant medical documents and insurance information
- Notify the healthcare provider of any changes in health status
- No-shows may result in charges or rescheduling fees
- Repeated no-shows may result in account suspension

Telemedicine Consultations:
- Telemedicine requires stable internet connection and appropriate device
- You must ensure privacy for video consultations
- Recording consultations without consent is prohibited
- Telemedicine has limitations compared to in-person examinations
- Prescription from telemedicine may require in-person verification in some cases
- Technical issues beyond our control may affect consultation quality

Cancellation & Refund Policy:
- Cancellations must be made according to healthcare provider policy
- Refunds depend on cancellation timing and provider policy
- HealviaCare deducts processing fees from refunds
- Refunds may take 5-10 business days to process
- Non-refundable fees are clearly stated before booking
- No refunds for no-shows or late cancellations

Rescheduling:
- Rescheduling requests must be made in advance
- Availability depends on healthcare provider schedule
- Rescheduling should be done through the Website
- Frequent rescheduling may affect future booking availability`
    },
    {
      id: "payment-billing",
      title: "9. PAYMENT, BILLING & FEES",
      content: `Payment Terms:
- Payment must be made before or at the time of service (as per provider policy)
- HealviaCare accepts various payment methods including cards, wallets, and UPI
- Payment information is processed securely through third-party payment gateways
- You are responsible for providing accurate payment information
- Incorrect payment information may result in failed transactions

Fees & Charges:
- Consultation fees are set by individual healthcare providers
- Additional fees may apply for:
  - Premium consultations or extended sessions
  - Home visits or special services
  - Medical reports and certificates
  - Follow-up consultations
  - Tests and diagnostic procedures
- All applicable taxes are included in quoted prices unless stated otherwise

Billing & Invoices:
- Invoices are sent via email after consultation completion
- Invoices detail services provided and charges incurred
- You have the right to request itemized bills
- Tax receipts/invoices are provided for all transactions
- Billing disputes must be raised within 30 days of invoice date

Payment Method Policies:
- Card payments: Subject to bank authorization and verification
- Digital wallets: Subject to wallet provider terms and policies
- Cash payments: May be subject to additional charges
- Insurance claims: You must provide insurance information and documentation
- Installment payments: Not available; full payment due at time of service

Failed Transactions:
- HealviaCare is not liable for failed or declined transactions
- Retry payment or contact your bank/payment provider
- Multiple failed attempts may result in appointment cancellation
- Transaction failures may incur charges from your payment provider

Refund Policy:
- Refunds are processed only for cancelled consultations (subject to policy)
- Refunds take 5-10 business days to reflect in your account
- HealviaCare deducts service fees and platform charges from refunds
- No refunds for completed consultations
- No refunds for no-shows or late cancellations
- Refunds are processed to the original payment method only

Taxes & Compliance:
- GST is applicable as per government regulations
- Pricing displayed includes applicable taxes
- Tax compliance and reporting is HealviaCare's responsibility
- Invoice details are as per government requirements`
    },
    {
      id: "intellectual-property",
      title: "10. INTELLECTUAL PROPERTY RIGHTS",
      content: `Ownership of Content:
- All content on the Website is the property of HealviaCare or its content suppliers
- Content includes: text, graphics, logos, images, audio, video, software, code, design, layout
- All intellectual property rights are protected by international laws
- Patents, trademarks, and copyrights are registered to HealviaCare
- Third-party content is licensed to HealviaCare for Website use

Protected Materials:
- Website design and layout
- Original articles and health information
- Videos, images, and multimedia content
- Software code and applications
- Database compilations
- Brand names and logos
- Service marks and trademarks

User Content License:
- By posting content on the Website, you grant HealviaCare a non-exclusive license to use it
- HealviaCare may use your content for:
  - Displaying on the Website
  - Marketing and promotional purposes
  - Analytics and research
  - Improving services
- You retain ownership of content you create
- You represent that your content does not infringe third-party rights

Prohibited Actions:
- Do not copy, modify, or distribute Website content
- Do not create derivative works from Website content
- Do not remove copyright or trademark notices
- Do not reverse engineer Website software or code
- Do not scrape or mass download Website content
- Do not use Website content for commercial purposes without permission
- Do not impersonate or misrepresent content ownership

Reporting Infringement:
- Report copyright infringement to: support@healviacare.com
- Provide detailed description of infringing content
- Include documentation of your ownership rights
- HealviaCare will investigate and take appropriate action
- False infringement reports may result in legal action

Fair Use:
- Limited use of Website content for educational purposes may be permitted
- Fair use is limited to non-commercial, educational contexts
- Proper attribution must be provided
- Substantial reproduction of content is not permitted
- HealviaCare may terminate fair use if content is misused`
    },
    {
      id: "limitation-liability",
      title: "11. LIMITATION OF LIABILITY & DISCLAIMERS",
      content: `Disclaimer of Warranties:
THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND.

HEALVIACARE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
- Warranty of merchantability
- Warranty of fitness for a particular purpose
- Warranty of non-infringement
- Warranty of accuracy or completeness of information
- Warranty that the Website will be error-free or uninterrupted
- Warranty regarding the quality of services or healthcare providers

NO WARRANTY ON SERVICES:
- We do not warrant that any healthcare provider will be available
- We do not warrant successful consultation or treatment
- We do not warrant positive health outcomes
- We do not warrant the accuracy of medical information
- We do not warrant that third-party services will function properly

LIMITATION OF LIABILITY:
TO THE FULLEST EXTENT PERMITTED BY LAW, HEALVIACARE SHALL NOT BE LIABLE FOR:
- Indirect, incidental, special, consequential, or punitive damages
- Loss of profits, revenue, data, or business opportunities
- Loss of goodwill or reputation
- Any damages related to:
  - Data loss or corruption
  - Unauthorized access to accounts
  - Third-party conduct or services
  - Healthcare provider actions or omissions
  - Technical failures or service interruptions
  - Reliance on Website information

LIABILITY CAP:
In no event shall HealviaCare's total liability exceed the amount paid by you to HealviaCare in the 12 months preceding the claim.

Some jurisdictions do not allow limitation of liability, so some provisions may not apply to you.

Third-Party Services & Links:
- The Website may contain links to third-party websites and services
- HealviaCare does not endorse or control third-party content
- HealviaCare is not responsible for third-party services or content
- Use of third-party services is at your own risk
- Review third-party terms before using their services
- HealviaCare is not liable for third-party actions or failures`
    },
    {
      id: "privacy-security",
      title: "12. PRIVACY & DATA SECURITY",
      content: `Privacy Commitment:
- Your privacy is important to HealviaCare
- We collect and process personal information as per applicable laws
- Data is used only for stated purposes
- We comply with data protection regulations including IT Act 2000

Data Protection:
- All data is encrypted using industry-standard encryption
- Access to data is restricted to authorized personnel only
- Regular security audits and updates are performed
- Security measures are regularly updated to address new threats
- Data breaches will be reported to affected users without delay

Data Retention:
- Personal information is retained for the duration of service provision
- Medical records are retained as per medical record regulations
- Data may be retained longer if required by law
- Users can request data deletion subject to legal requirements
- Deleted data may be retained in backups for limited periods

Rights of Data Subjects:
You have the right to:
- Access your personal information
- Correct inaccurate information
- Delete your information (subject to legal requirements)
- Restrict processing of your information
- Data portability in machine-readable format
- Object to processing of your information
- Lodge complaints with regulatory authorities

Children's Privacy:
- The Website is not intended for users under 18 years
- Parents/guardians are responsible for minor's use
- Medical information of minors requires parental consent
- We do not knowingly collect data from children under 13
- Contact us immediately if unauthorized child data is collected

International Data Transfer:
- Data may be stored and processed in India and internationally
- By using the Website, you consent to international data transfer
- Data transfer is subject to appropriate security measures

Third-Party Sharing:
- Data is shared with healthcare providers for treatment purposes
- Data may be shared with service providers under confidentiality agreements
- Data is not sold or rented to third parties
- Government requests for data will be complied with as per law`
    },
    {
      id: "prohibited-conduct",
      title: "13. PROHIBITED CONDUCT & VIOLATIONS",
      content: `You agree not to engage in any of the following activities:

Illegal Activities:
- Using the Website for any illegal purpose or activity
- Violating any applicable law, regulation, or court order
- Engaging in fraud, deception, or identity theft
- Hacking, cracking, or any unauthorized access
- Creating or distributing malware or viruses
- Money laundering or financing illegal activities

Harassment & Abuse:
- Threatening, harassing, or abusing any individual or organization
- Sending unsolicited messages or spam
- Stalking or repeatedly contacting someone
- Publishing private information without consent
- Making defamatory or false statements
- Cyberbullying or online harassment

Interference:
- Interfering with the proper functioning of the Website
- Disrupting the normal flow of communication on the Website
- Intentionally causing service outages or slowdowns
- Overloading servers with requests
- Bypass security measures or authentication systems
- Accessing restricted areas without authorization

Misuse of Data:
- Collecting personal information of other users
- Using data for purposes other than stated
- Selling or sharing data without authorization
- Creating profiles of other users
- Using data for discrimination or harm
- Violating others' privacy or confidentiality

Violation Consequences:
HealviaCare may:
- Immediately suspend or terminate your account
- Restrict your access to the Website
- Pursue legal action against violators
- Report violations to law enforcement
- Cooperate with investigations
- Claim damages for breaches
- Recover costs of enforcement

User Reporting:
- Users can report violations through: support@healviacare.com
- Reports should include details and evidence of violation
- Investigations will be conducted promptly
- Appropriate action will be taken against violators
- Confidentiality of reporters will be maintained`
    },
    {
      id: "indemnification",
      title: "14. INDEMNIFICATION",
      content: `You agree to indemnify, defend, and hold harmless HealviaCare and its:
- Officers, directors, and employees
- Agents, representatives, and affiliates
- Partners and service providers
- Successors and assigns

From and against any and all:
- Claims, demands, and causes of action
- Damages, losses, and liabilities
- Costs and expenses (including legal fees)
- Arising from or related to:
  - Your violation of these Terms and Conditions
  - Your violation of applicable laws or regulations
  - Your use or misuse of the Website
  - Your content or information provided
  - Your infringement of third-party rights
  - Your actions or omissions
  - Claims by third parties

Indemnification includes:
- Defense of legal claims at HealviaCare's discretion
- Payment of settlement amounts HealviaCare agrees to
- Payment of legal fees and costs
- Payment of damages awarded

You will not be liable for indemnification if:
- HealviaCare is solely responsible for the claim
- Claim arises from HealviaCare's gross negligence or misconduct
- Claim arises from violation of applicable law by HealviaCare

This indemnification survives termination of these Terms.`
    },
    {
      id: "termination",
      title: "15. TERMINATION & SUSPENSION",
      content: `Account Termination by User:
- You can request account termination at any time
- Submit termination request through your account settings or contact support
- Account will be closed within 5-7 business days
- Outstanding fees must be paid before closure
- Data will be deleted according to retention policy

Account Suspension by HealviaCare:
HealviaCare may suspend your account for:
- Violation of these Terms and Conditions
- Non-payment of outstanding fees
- Providing false or fraudulent information
- Inappropriate or abusive conduct
- Inactivity for extended periods
- Security or fraud concerns
- Legal or regulatory requirements

Suspension Process:
- You will be notified of suspension reason (where applicable)
- Opportunity to respond may be provided
- Suspension will be enforced immediately upon notice
- You cannot access your account during suspension

Account Termination by HealviaCare:
HealviaCare may terminate your account:
- For serious or repeated violations
- After suspension period if violations continue
- For repeated fraud or misuse
- If required by law or regulation
- For any reason with notice (30 days)

Termination Effects:
- All access to the Website will be immediately revoked
- Outstanding fees remain due and payable
- Medical records will be retained as per regulations
- Refunds will be processed according to policy
- Account data will be deleted after retention period
- Termination may not affect legal obligations

Survival:
- Provisions that should survive termination will continue to apply
- These include: indemnification, limitation of liability, governing law
- Outstanding payments remain due after termination
- Rights and licenses terminate upon account closure`
    },
    {
      id: "governing-law",
      title: "16. GOVERNING LAW & JURISDICTION",
      content: `Governing Law:
- These Terms and Conditions are governed by the laws of India
- Applicable laws include:
  - Indian Contract Act, 1872
  - Indian Penal Code, 1860
  - Information Technology Act, 2000
  - Consumer Protection Act, 2019
  - Medical Council of India regulations
  - Other applicable central and state laws

Dispute Resolution:
Before initiating legal proceedings:
- Users should attempt resolution through:
  - Direct communication with HealviaCare
  - Mediation or negotiation
  - Escalation to management
  - Email: disputes@healviacare.com
- Good faith attempt at resolution may be required
- Escalation attempts should be made within 30 days of dispute

Arbitration:
- Disputes may be submitted to arbitration as per Arbitration and Conciliation Act
- Single arbitrator will be appointed by mutual consent
- Arbitration will be conducted in English language
- Venue for arbitration will be the location of HealviaCare's registered office
- Arbitration decision will be binding and enforceable
- Costs of arbitration may be divided between parties

Jurisdiction:
- All legal proceedings will be subject to exclusive jurisdiction of courts in India
- Specifically, courts in the location of HealviaCare's registered office
- You consent to exclusive jurisdiction of these courts
- You waive objection to venue in these courts
- Appeals from arbitration will be heard in relevant courts

Consumer Protection:
- Nothing in these Terms waives your rights under Consumer Protection Act, 2019
- Consumer complaints can be filed with Consumer Commissions
- Consumer disputes may not be subject to arbitration clause
- These provisions apply to all jurisdictions where HealviaCare operates

Force Majeure:
HealviaCare is not liable for failure to perform due to:
- Natural disasters, earthquakes, floods
- Wars, terrorism, or civil unrest
- Government actions or regulations
- Pandemics or epidemics
- Power outages or network failures
- Other events beyond reasonable control
- In such cases, services will resume when reasonable possible`
    },
    {
      id: "general-provisions",
      title: "17. GENERAL PROVISIONS",
      content: `Entire Agreement:
- These Terms constitute the entire agreement between you and HealviaCare
- Previous agreements, understandings, or negotiations are superseded
- No other representations are binding unless in writing

Amendments:
- HealviaCare may modify these Terms at any time
- Material changes will be communicated in advance
- Continued use after amendment constitutes acceptance
- You should review Terms regularly for changes

Severability:
- If any provision is found invalid or unenforceable
- That provision will be modified to the minimum extent necessary
- Other provisions will remain in effect
- The intent of the Terms will be preserved

Waiver:
- Failure to enforce any provision is not a waiver of that provision
- Partial enforcement does not waive other provisions
- Any waiver must be in writing and signed by HealviaCare

Assignment:
- These Terms are personal to you and cannot be assigned
- You cannot transfer rights or obligations under these Terms
- HealviaCare may assign these Terms or delegate obligations
- Such assignment is binding on you

Notices:
- Notices from HealviaCare will be sent via:
  - Email to your registered email address
  - SMS to your registered phone number
  - In-app notifications
  - Posted on the Website
- Notices are effective when sent or posted
- You consent to electronic notices

Headings:
- Section headings are for convenience only
- Headings do not affect the meaning or interpretation of Terms

Relationship:
- Nothing in these Terms creates:
  - Partnership or joint venture
  - Agency or employment relationship
  - Franchise or affiliate relationship
- You are an independent user of the Website

Contact Information:
For any questions or concerns:
- Email: support@healviacare.com
- Phone: +91-8929723773
- Address: HealviaCare Head Office, India
- Website: www.healviacare.com

Last Updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
These Terms and Conditions are subject to change without notice.`
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#e6f4f5] via-white to-[#d4eeed] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold transition-colors">
            <ArrowLeft size={20} />
            Back to Home
          </Link>

          {/* Main Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Terms & Conditions</h1>
              <p className="text-lg text-gray-600 mb-2">HealviaCare - Your Healthcare Platform</p>
              <p className="text-sm text-gray-500">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Table of Contents */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Table of Contents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      toggleSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-left text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-red-900 text-lg mb-2">⚠️ Important Notice</h3>
              <p className="text-red-800 text-sm leading-relaxed">
                This website provides healthcare appointment booking and information services only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns. In case of medical emergency, contact emergency services immediately (102 for ambulance, 100 for police).
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div key={section.id} id={section.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 flex justify-between items-center transition-colors"
                  >
                    <h2 className="text-lg font-bold text-slate-900 text-left">
                      {section.title}
                    </h2>
                    <ChevronDown
                      size={24}
                      className={`text-blue-600 transition-transform ${
                        expandedSections[section.id] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {expandedSections[section.id] && (
                    <div className="px-6 py-6 bg-white border-t border-gray-200">
                      <div className="text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm md:text-base">
                        {section.content.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-gray-700">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Questions?</h3>
              <p className="text-slate-700 mb-4">If you have any questions about these Terms and Conditions, please contact us:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                  <a href="mailto:support@healviacare.com" className="text-blue-600 hover:underline">
                    support@healviacare.com
                  </a>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Phone</h4>
                  <a href="tel:+918929723773" className="text-blue-600 hover:underline">
                    +91-8929723773
                  </a>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Website</h4>
                  <a href="https://www.healviacare.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    www.healviacare.com
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                © 2024 HealviaCare. All rights reserved. These Terms and Conditions are effective from the date mentioned above and are subject to change without notice. Your continued use of the Website constitutes acceptance of any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}