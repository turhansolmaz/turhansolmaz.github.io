// These are examples for learning purposes only; they are not a compliance certificate or a mandatory control checklist.
window.AUDIT_PROGRAMS_EN = [
  {
    id: "erisim-yasam-dongusu",
    title: "Access lifecycle and privileged accounts",
    subtitle: "Trace access through joiner, mover and leaver events.",
    objectives: ["APO13", "DSS05", "DSS06"],
    story: "In a fictional bookshop, Deniz, a cashier, moves to the warehouse. Warehouse access is granted, but no one knows whether the old refund approval permission was removed. A privileged account is a powerful account that can change user or system settings.",
    risk: "Accounts that retain more access than the role requires, or whose owner is unclear, can lead to unauthorized transactions and an inability to establish accountability for them.",
    control: "Example practice: The bookshop requires manager approval for role changes, reviews previous access rights and examines usage logs of powerful accounts. This design is not a universal COBIT rule; scope and frequency are determined based on risk.",
    evidence: [
      "Joiner, mover and leaver list with identities masked, including period and source information.",
      "Account and access rights listing for the same period, with service accounts and privileged accounts flagged separately.",
      "Access requests, approvals and timestamps of provisioning, modification or deprovisioning for the selected events.",
      "Access review results and relevant account usage logs that contain no secrets."
    ],
    steps: [
      "Confirm the written scope and read-only access authorization; request masked records without collecting real passwords, access keys or personal employee data.",
      "Define the population, i.e. all access events in the period that can be examined; test completeness by reconciling the dates and totals of the HR movement list and the account listing.",
      "Select leavers, role changes and powerful accounts based on risk; document the sampling rationale and do not assume a fixed sample size.",
      "For the selected events, compare the request, authorized approval and execution record; note exceptions against the timeliness and role criteria defined by the organization. Do not create or disable accounts.",
      "Corroborate management representations with dated records from the source system; assess the sufficiency and reliability of the evidence and report unexplained gaps."
    ],
    redFlags: [
      "The status of a leaver's account contradicts the deprovisioning record.",
      "No owner or business justification is defined for a powerful account.",
      "On a role change, only new access is added and previous access is not evaluated."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's approved access procedure requires previous access rights to be reviewed when a role changes. Condition: The fictional record examined shows approval of the new role, but no evidence was found that the previous access rights were reviewed. Risk: Unnecessary access may be retained; no conclusion is drawn that the access was misused or that any loss occurred.",
    limits: "A single screenshot does not demonstrate the entire account population or operation throughout the period. Do not interpret shared and service accounts in the same way as human accounts. Do not perform live access attempts; obtain explicit authorization for every additional test.",
    exercise: {
      question: "The manager says “all leaver accounts are disabled.” Is this representation sufficient on its own?",
      answer: "No. First verify the completeness of the leaver population; then, for risk-justified selections, compare the leaving date, account status and deprovisioning record. A representation provides explanation, but on its own it is not evidence of operation."
    }
  },
  {
    id: "degisiklik-sdlc",
    title: "Change management and the software development lifecycle",
    subtitle: "Follow the path from a business need to its secure deployment to production.",
    objectives: ["BAI03", "BAI06", "BAI07"],
    story: "A fictional course website updates its discount calculation. The software development lifecycle (SDLC) comprises the stages of requirements definition, design, development, testing and transition to use. Even a change that looks small can affect fee calculations.",
    risk: "Insufficiently tested or unauthorized changes can lead to incorrect calculations, service outages or security vulnerabilities.",
    control: "Example practice: The course website records an impact assessment, test results, production deployment approval and a rollback plan in the change record. For emergency changes, it defines who may grant expedited approval before implementation and under what conditions, how the decision is recorded and the post-implementation review; the post-implementation review does not replace authorization. These are control examples tailored to the organization, not universal COBIT requirements.",
    evidence: [
      "Change list for the period and production deployment records of the same scope, with source and filter information.",
      "Business need, impact assessment and authorized approval records for the selected changes.",
      "Test results and user acceptance records linked to the release, with test data anonymized or synthetic.",
      "Production deployment time, rollback plan and, for emergency changes, the decision under the defined authorization path and post-implementation review records."
    ],
    steps: [
      "Clarify in writing the period, applications and the definitions of normal and emergency changes; use only authorized, read-only records.",
      "Compare the change list with deployment records, i.e. production release records; assess population completeness by investigating deployments without a change record and change records without a deployment.",
      "Make a risk-based selection from high business impact, emergency and failed changes; document the selection logic and what remains out of scope.",
      "For each selection, trace the release, test result, approval and deployment time; examine segregation of duties against the organization's criteria. Do not modify code or production configuration.",
      "Review rollback readiness; for emergency changes, verify from records that the defined authorization path was followed, and confirm the authorized decision and the post-implementation review. Investigate contradictions using a second source and document the limits of evidence sufficiency."
    ],
    redFlags: [
      "The release deployed to production cannot be matched to the release that was tested.",
      "Authorization prior to implementation cannot be demonstrated, or the post-implementation review is used in place of authorization.",
      "The outcome of a failed deployment or the rollback decision is not recorded."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's release procedure requires a user acceptance record for the release to be deployed to production. Condition: A deployment record was found for the fictional release examined, but no acceptance evidence for the same release could be provided. Risk: A change that does not meet the business need may be deployed to production; it is not claimed that fees were actually calculated incorrectly.",
    limits: "The absence of a document does not mean the test was definitely not performed; express it as a lack of evidence. Do not perform deployments, rollbacks or load tests without an approved test plan and environment. A sample result does not show that all changes are error-free.",
    exercise: {
      question: "A test result exists but there is no release number. Can you say the control is operating?",
      answer: "Not yet. The link between the test and the deployment examined must be verified through a reliable release, record or time linkage. If the link cannot be established, state this as an evidence limitation."
    }
  },
  {
    id: "operasyon-olay-problem",
    title: "Operations, incident and problem management",
    subtitle: "Restoring the service is different from resolving the cause of recurrence.",
    objectives: ["DSS01", "DSS02", "DSS03"],
    story: "In a fictional library, the lending screen fails to open several times a week. Incident management resolves the outage and restores the service. Problem management, by contrast, investigates the underlying cause of recurring incidents, while day-to-day operations monitor jobs and alerts.",
    risk: "Incomplete records or incorrect prioritization can cause outages to be addressed late and the same issue to recur.",
    control: "Example practice: The library classifies incidents by business impact, assigns an owner, verifies closure and links recurring incidents to a problem record. Thresholds and target times are specific to the organization; this example is not a universal COBIT rule.",
    evidence: [
      "Incident and service request listing for the period, with classification, timestamps and a description of filters.",
      "Monitoring alerts, failed scheduled job records and the incident numbers linked to them.",
      "Priority, assignment, response, resolution and closure records for the selected incidents.",
      "Problem records for recurring incidents, root cause analysis and action tracking."
    ],
    steps: [
      "Read the definitions of incident, service request and problem in the organization's glossary; clarify scope and data masking rules.",
      "Examine the filters and totals of the incident listing; assess the likelihood of incidents falling outside the population by comparing it with authorized monitoring alerts and failed job records.",
      "Select high-impact, recurring, reopened and long-open records on a risk basis; do not use a fixed sample size.",
      "Reconstruct the timeline of the selected records; test with read-only records whether priority, assignment and closure comply with the organization's criteria.",
      "Trace the link from recurring incidents to problem records and corrective actions; corroborate closure statements with evidence of implementation. Do not cause outages or restart live jobs."
    ],
    redFlags: [
      "A monitoring alert exists but leaves no trace showing that it was addressed.",
      "Recurring incidents are repeatedly closed without any investigation of their cause.",
      "Priority or closure time is changed without explanation in order to meet the target time."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's problem procedure requires a cause analysis for incidents that exceed the defined recurrence threshold. Condition: Linked incidents exceeding this threshold were observed in the fictional selection, but no problem record or justified exception could be provided. Risk: The same outage may recur; no realized loss of revenue is assumed.",
    limits: "A closed record does not, on its own, prove that the service has been permanently fixed. Check the effect of time zones and waiting periods on target calculations. Assess the source and change trail for reliability; a large number of records does not on its own provide sufficiency.",
    exercise: {
      question: "Restarting the application resolved the incident. Is the problem resolved too?",
      answer: "No. The service may have been restored; investigating the cause of recurrence and verifying an appropriate permanent action is a separate evaluation."
    }
  },
  {
    id: "sureklilik-yedekleme",
    title: "Continuity, backup, RTO and RPO",
    subtitle: "Distinguish between having a backup and being able to recover.",
    objectives: ["DSS04", "APO12", "BAI04"],
    story: "If a fictional workshop cannot use its order system, it cannot see its production sequence. The RTO (recovery time objective) is the targeted time to restore the service after an outage. The RPO (recovery point objective) describes the past point in time to which we aim to be able to recover data and the tolerated window of data loss.",
    risk: "Backups that are out of scope, unreadable or unrestorable can cause downtime and data loss to exceed the limits accepted by the business.",
    control: "Example practice: The workshop approves RTO and RPO targets based on a business impact analysis, backs up the relevant systems and retains evidence of planned restore tests in an isolated environment. Backup frequency or a test schedule is not a universal COBIT rule.",
    evidence: [
      "Business impact analysis, list of critical services and approved RTO/RPO targets per service.",
      "Backup scope linked to the system inventory and job results, including failures.",
      "Records containing no secrets on backup retention, access protection and the design of a separate location or medium.",
      "Approved restore test or continuity exercise plan, timeline, data validation and action records."
    ],
    steps: [
      "Confirm with the business owner the meaning of the targets and which services they cover; note that the auditor should not set the targets on their own.",
      "Map the critical service and system inventory to the backup scope; check the completeness of the job list and the failed job report against source totals.",
      "Select services representing different risks and dependencies; examine backup results and the handling of exceptions from records.",
      "Compare the start time, the time the service was ready and the recovered data point in the existing approved restore evidence with the relevant RTO/RPO targets.",
      "Assess whether the results cover data integrity and service dependencies. If a new test is needed, require explicit approval, an isolated environment and a data protection plan; do not initiate a restore or an outage in production."
    ],
    redFlags: [
      "Backup jobs appear successful but there is no restore evidence.",
      "The database of a critical service is covered, but the required configuration or dependencies are left out.",
      "Exercise results are not compared with the target, or open actions are not tracked."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's continuity plan requires the approved RTO target of a critical service to be evaluated in an exercise. Condition: The fictional exercise report states that the backup was opened but does not record when the service was ready for use. Risk: The ability to recover within the target time may not be verifiable; it is not asserted that the target was actually exceeded or that data was lost.",
    limits: "A successful backup record does not show that the RTO or RPO is met. A single-component test may not prove end-to-end service recovery. Explain the differences between test conditions and real outage conditions, as well as the currency of the evidence.",
    exercise: {
      question: "The last recoverable backup is at 09:00, the hypothetical outage occurs at 12:00 and the RPO target is one hour. What can be said?",
      answer: "If there is no other recovery source, a three-hour window of data is at risk and the one-hour target is not met in this scenario. Do not conclude that actual data loss definitely occurred without verifying additional sources such as transaction logs."
    }
  },
  {
    id: "uygulama-veri-arayuz",
    title: "Application controls, data and interfaces",
    subtitle: "Examine whether data moves completely and accurately from input to output.",
    objectives: ["DSS06", "APO14", "BAI03"],
    story: "A fictional shop's online orders are transferred to accounting every night. An interface is a connection that moves data between two systems. Input validation, calculation checks and comparing the totals of the two systems can catch different types of errors.",
    risk: "Missing, duplicate or incorrectly mapped records can cause order, inventory or accounting information to appear incorrect.",
    control: "Example practice: The shop compares transfer IDs and record totals, routes erroneous records to a separate queue and authorizes reprocessing. This is an organization-specific control design; COBIT does not mandate the same method for every interface.",
    evidence: [
      "Data flow diagram, interface inventory and field mapping rules, with examples containing no personal data.",
      "Source and target record counts, amount totals and transfer IDs for the same period and scope.",
      "Error queue, reprocessing and total reconciliation review records.",
      "Approved business rules and the expected and actual results of existing synthetic data tests."
    ],
    steps: [
      "Learn from the business owner the critical data fields, accuracy rules and transfer boundaries; access only anonymized or synthetic data.",
      "Compare the interface inventory with scheduled transfer records; assess population completeness by verifying that source and target reports use the same period, currency and filters.",
      "Make a risk-based selection of transfers and transactions; examine the possibility of omissions and duplicates by tracing source records to the target and target records back to the source.",
      "Recalculate record counts and amount totals from authorized exports; follow up differences, the error queue and reprocessing approval.",
      "Compare existing test evidence with business rules. For any new test, use an explicitly approved test environment and synthetic data; do not send trial transactions to the live system."
    ],
    redFlags: [
      "Source and target totals are compared using different periods or filters.",
      "Records in the error queue remain pending without an owner or outcome.",
      "It cannot be explained how a re-transfer prevents duplicate records."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's interface procedure requires record counts and amount totals to be reconciled after a transfer. Condition: For the fictional transfer, record counts were compared, but no evidence of an amount comparison was found. Risk: Amount errors may go undetected even when counts match; it is not claimed that the financial statements are misstated.",
    limits: "Equal totals do not prove that every line is correct; there may be offsetting errors. Assess the reliability of the queries and filters behind system-generated reports. Reach separate conclusions on the design of the control and its actual operation during the period.",
    exercise: {
      question: "There are 100 records in the source and in the target. Have you proven that the transfer is accurate?",
      answer: "No. Despite the same count, there may be different or erroneous records. Assess accuracy and completeness with additional evidence such as transaction IDs, critical fields, amount totals and error records."
    }
  },
  {
    id: "ucuncu-taraf-bulut",
    title: "Third parties, cloud and SOC reports",
    subtitle: "Keep responsibilities visible even when a service is outsourced.",
    objectives: ["APO09", "APO10", "MEA04"],
    story: "A fictional association obtains its membership application from the cloud. The provider manages the infrastructure, while the association manages user access. Depending on its type, a SOC report provides independent assurance on controls as of a specific date or for a period and for a defined service scope; it is not a guarantee covering every service and all risks.",
    risk: "If the provider's scope, responsibilities and assurance are misunderstood, service outage, data protection or access risks may remain unmanaged.",
    control: "Example practice: The association classifies critical providers and reviews the contract, service targets, an appropriate assurance report and the controls it is responsible for together. Requiring the same report from every provider is not a universal COBIT requirement.",
    evidence: [
      "Provider inventory mapped to critical services, risk assessment and shared responsibility matrix.",
      "Relevant contract and service level agreement sections, with confidential commercial or personal details removed.",
      "Scope, period, opinion and exceptions of a SOC or equivalent assurance report for which authorized sharing permission exists.",
      "Evaluation of controls the customer is expected to implement, service performance reports and tracking of open actions."
    ],
    steps: [
      "Compare the provider list with procurement and service usage records in an authorized manner; assess the completeness of the population and the mapping to critical services.",
      "Select providers on a risk basis; trace data, access, continuity, incident notification and exit responsibilities in the contract and the responsibility matrix.",
      "Read the service, the date or period covered and the scope of the SOC report. Distinguish that Type 1 evaluates the suitability of control design as of a specific date, whereas Type 2 evaluates, in addition to the suitability of design, the operating effectiveness of controls throughout a defined period; interpret SOC 1 in the context of controls relevant to financial reporting and SOC 2 in the context of the relevant Trust Services Criteria.",
      "Review the opinion, any exceptions from tests of operating effectiveness, subservice organizations carved out of scope and the complementary user entity controls the customer is expected to implement; assess the need for additional evidence for the gap between the report date or period end and the period under audit.",
      "Corroborate provider representations with appropriate independent reports and organizational records; document the effect of missing or restricted evidence on the conclusion. Do not change cloud settings or perform unauthorized tests against the provider."
    ],
    redFlags: [
      "The assurance report provided does not cover the service used or the relevant period.",
      "Access control that the customer should perform is assumed to be performed by the provider.",
      "Exceptions in the report and the scope of subservice organizations are not evaluated."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's supplier procedure requires customer responsibilities for critical services to be assigned. Condition: The fictional provider report expects a customer access review, but no owner or evidence of performance for this task could be demonstrated within the organization. Risk: Inappropriate access may go undetected; no conclusion is drawn that the provider has been breached.",
    limits: "A SOC report is not a COBIT compliance certificate. The report type and scope must be appropriate to the need; an unqualified opinion does not mean all controls are flawless. Comply with report distribution restrictions; do not upload a confidential report to a training website or a public tool.",
    exercise: {
      question: "The provider supplied a SOC 2 Type 2 report. Is there no longer any need to review user access?",
      answer: "It cannot be said that there is no need. The report's scope and the controls the customer is expected to implement are reviewed. User access that falls under the organization's responsibility still requires separate sufficient and reliable evidence."
    }
  },
  {
    id: "guvenlik-yonetisimi",
    title: "Security governance, assets, patching and monitoring",
    subtitle: "Link technical records to risk ownership and decisions.",
    objectives: ["EDM03", "APO12", "APO13", "BAI09", "DSS05"],
    story: "A fictional design studio cannot see in one place which devices are held by whom and which updates have been deferred. A patch is an update that fixes a bug or vulnerability in software. Governance directs and oversees risk decisions; management translates these decisions into day-to-day work.",
    risk: "Unowned assets, unassessed vulnerabilities addressed by updates and unmonitored alerts can cause security risks to go unnoticed or to be accepted without authorization.",
    control: "Example practice: The studio assigns owners to assets; evaluates patches based on risk and compatibility impact, has deferrals approved by the authorized risk owner and monitors the handling of alerts. No single patching timeframe or tool is a universal COBIT rule.",
    evidence: [
      "Masked asset inventory with ownership and criticality information, including source and last update date.",
      "Security policy, risk register entries, acceptance or deferral decisions and oversight meeting decisions.",
      "Existing authorized patch status reports, deployment results and approved exception records.",
      "Monitoring scope, handling records for selected alerts and a listing of log retention settings that contains no secrets."
    ],
    steps: [
      "From the documentation, distinguish senior management's risk oversight, the risk owners and the responsibilities of security management; identify the organization's own criteria.",
      "Compare the asset inventory with existing, authorized device management reports; investigate missing, duplicate or out-of-scope assets. Do not initiate a new network scan.",
      "Select assets based on criticality and risk; compare existing patch reports with the organization's evaluation, testing and deployment criteria.",
      "From records, examine the justification for delayed patches, the authorized risk acceptance, its validity period and compensating measures; do not install patches or change security settings.",
      "Trace selected existing alerts to owner assignment and outcome records; assess the scope, currency and source reliability of reports and explicitly identify areas without sufficient evidence."
    ],
    redFlags: [
      "The owner or security monitoring coverage of a critical asset is unknown.",
      "A patch deferral continues indefinitely and without a decision by the authorized risk owner.",
      "It is known that alerts are generated, but it cannot be demonstrated that they are reviewed."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's patch policy requires a justified, time-bound risk approval for deferrals. Condition: The patch for the fictional asset examined was deferred; no valid approval or evidence of a compensating measure could be provided. Risk: A known security risk may persist without being assessed; it is not claimed that the vulnerability was exploited or that data was leaked.",
    limits: "This program is not a penetration test. It does not include attacks, password guessing, exploitation, malicious files or active scanning steps. A “vulnerability” entry in existing reports is not evidence of a successful attack. Every additional action in the production environment requires explicit approval.",
    exercise: {
      question: "Why are EDM03, APO12 and APO13 not the same thing?",
      answer: "EDM03 concerns evaluating, directing and monitoring risk optimization at the governance level. APO12 focuses on managing risk, and APO13 on managing security. DSS05, in turn, relates to the operational management of security services."
    }
  },
  {
    id: "denetim-planlama-raporlama",
    title: "Audit planning, evidence, reporting and follow-up",
    subtitle: "Connect the question, the criterion, the evidence and the conclusion.",
    objectives: ["MEA02", "MEA04", "APO12"],
    story: "A fictional education cooperative wants to understand the risks in its enrollment system. The auditor first documents what will be examined, for which period and against which criterion. Evidence is information that supports a conclusion; a finding describes the reasoned gap between the criterion and the observed condition.",
    risk: "Unclear scope, an incomplete population or weak evidence can lead to unsupported conclusions, significant risks being overlooked and ineffective actions.",
    control: "Example practice: The audit team applies a risk-based plan, checks on evidence sources, working paper review and verification of actions. This example method is not a universal COBIT rule or a COBIT compliance checklist.",
    evidence: [
      "Approved objective, scope, period, authorization, risk assessment and the criteria to be used.",
      "Source, filter and total information for the population to be examined; completeness checks and the rationale for sample selection.",
      "Masked evidence with a known source and date, test results, contradictions and review records.",
      "Draft findings containing criterion, condition and risk; management response, action owner, target date and follow-up evidence."
    ],
    steps: [
      "Clarify in writing the objective, scope, period, report recipient, access authorization and criteria; disclose any roles that affect independence. Do not confuse organizational policy with the COBIT reference.",
      "Define the population for each test; verify the report filter, date range and source total. Do not claim that items selected from an incomplete population represent the whole.",
      "Select tests and samples based on risk; evaluate control design and operation during the period separately. Do not tie the sample size to an automatic rule.",
      "Evaluate separately the sufficiency of evidence, i.e. the coverage and quantity needed to support the conclusion, and its reliability, i.e. its source, integrity and verifiability. Investigate contradictions and, if necessary, request additional authorized evidence.",
      "Write the finding with the criterion, the observed condition and the potential risk; evaluate management's explanation. Record the action owner and target date; during follow-up, assess closure based on evidence of implementation, not merely on a “completed” statement."
    ],
    redFlags: [
      "A definitive conclusion for the entire period is drawn from items selected from a report whose completeness has not been checked.",
      "A single verbal explanation or a screenshot without context is used for a definitive conclusion.",
      "An unverified loss is included in a finding, or an action is closed without evidence."
    ],
    sampleFinding: "Sample finding — Criterion: The organization's action tracking procedure requires a review of implementation evidence before closure. Condition: The fictional follow-up record was closed solely on the basis of the owner's “completed” message; no verification record was found. Risk: The risk may be considered remediated without the action having been implemented; it is not established that the action was in fact not performed or that any loss occurred.",
    limits: "COBIT objective codes are references that support thinking; applying these tests does not provide COBIT compliance or an assurance certificate. An audit is not an absolute guarantee. State authorization, scope, data constraints and sampling limitations in the report; do not bring secrets or a real employer's personal or confidential data into training content.",
    exercise: {
      question: "Which is better evidence: 500 screenshots of unknown origin, or a single record whose source has been verified?",
      answer: "Quantity alone does not decide the matter. The verified record may be more reliable but may not be sufficient for a conclusion about the entire population or period. Sufficiency and reliability are evaluated together; additional evidence and completeness testing are required where necessary."
    }
  }
];
