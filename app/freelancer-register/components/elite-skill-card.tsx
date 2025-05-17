"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface EliteSkillCardsData {
  selectedSkills: string[]
}

interface EliteSkillCardsProps {
  data: EliteSkillCardsData
  primaryDomain: string
  onUpdate: (data: EliteSkillCardsData) => void
}

export default function EliteSkillCards({ data, primaryDomain, onUpdate }: EliteSkillCardsProps) {
  const [formData, setFormData] = useState<EliteSkillCardsData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedSkills.includes(skill)

      if (isSelected) {
        return {
          ...prev,
          selectedSkills: prev.selectedSkills.filter((s) => s !== skill),
        }
      } else {
        return {
          ...prev,
          selectedSkills: [...prev.selectedSkills, skill],
        }
      }
    })
  }

  // Get skills based on primary domain
  const getSkillsByDomain = () => {
    if (primaryDomain.includes("Web Development")) {
      return [
        { name: "React.js", description: "Dynamic frontend UIs" },
        { name: "Next.js", description: "SSR, SSG, SEO-friendly apps" },
        { name: "Tailwind CSS", description: "Utility-first responsive design" },
        { name: "JavaScript / TypeScript", description: "Core logic & typed safety" },
        { name: "GraphQL / REST APIs", description: "Data fetching layer" },
        { name: "Webflow / Framer", description: "No-code/low-code visual design" },
        { name: "Firebase / Supabase", description: "BaaS with auth, DB, and hosting" },
        { name: "Headless CMS", description: "Sanity, Strapi, Contentful" },
        { name: "Vercel / Netlify", description: "Jamstack deploy platforms" },
        { name: "Stripe / PayPal APIs", description: "Payments integration" },
        { name: "Lighthouse / A11Y", description: "Performance and accessibility audits" },
      ]
    } else if (primaryDomain.includes("Software Engineering")) {
      return [
        { name: "Python / Java / C# / Go", description: "Core programming stacks" },
        { name: "Node.js / Express", description: "Backend API architecture" },
        { name: "PostgreSQL / MySQL / MongoDB", description: "Databases & ORMs" },
        { name: "Docker / Kubernetes", description: "Containerization & orchestration" },
        { name: "AWS / GCP / Azure", description: "Cloud platforms" },
        { name: "CI/CD Pipelines", description: "GitHub Actions, GitLab CI, CircleCI" },
        { name: "Microservices Architecture", description: "Modular deployment strategies" },
        { name: "API Security / Auth", description: "JWT, OAuth, Keycloak" },
        { name: "Event-Driven Systems", description: "Kafka, Pub/Sub" },
        { name: "Testing: Jest / Mocha / Postman", description: "Unit + Integration testing" },
        { name: "System Design / UML / OOP", description: "Architecture-level thinking" },
      ]
    } else if (primaryDomain.includes("Digital Marketing")) {
      return [
        { name: "Google Ads / Meta Ads", description: "PPC strategy and scaling" },
        { name: "SEO (On-page + Off-page)", description: "Search optimization mastery" },
        { name: "Content Strategy", description: "Brand messaging & engagement" },
        { name: "Google Analytics / GA4", description: "Behavioral analysis & insights" },
        { name: "Conversion Rate Optimization (CRO)", description: "Landing pages, funnels, A/B testing" },
        { name: "HubSpot / Mailchimp / ActiveCampaign", description: "Email automation" },
        { name: "Social Media Scaling", description: "Organic & paid growth" },
        { name: "UTM Tracking & Attribution Modeling", description: "Funnel measurement & ROI" },
        { name: "AI Tools (Jasper, Copy.ai, Surfer)", description: "Enhanced content creation" },
        { name: "Brand Campaigns / GTM", description: "Launch & campaign planning" },
        { name: "Affiliate / Influencer Marketing", description: "Network growth strategies" },
      ]
    } else if (primaryDomain.includes("Mobile App Development")) {
      return [
        { name: "React Native", description: "Cross-platform mobile development" },
        { name: "Flutter / Dart", description: "Google's UI toolkit for mobile" },
        { name: "iOS / Swift", description: "Native iOS development" },
        { name: "Android / Kotlin", description: "Native Android development" },
        { name: "Mobile UI/UX Design", description: "Mobile-specific interface design" },
        { name: "App Store Optimization", description: "Visibility and conversion optimization" },
        { name: "Push Notifications", description: "User engagement strategies" },
        { name: "Mobile Authentication", description: "Biometrics, OAuth, SSO" },
        { name: "Offline-First Architecture", description: "Local storage and sync" },
        { name: "Mobile Analytics", description: "User behavior tracking" },
        { name: "Mobile CI/CD", description: "Automated build and deployment" },
      ]
    } else if (primaryDomain.includes("UI/UX")) {
      return [
        { name: "User Research", description: "Interviews, surveys, usability testing" },
        { name: "Wireframing & Prototyping", description: "Low to high fidelity mockups" },
        { name: "Figma / Adobe XD", description: "Industry-standard design tools" },
        { name: "Design Systems", description: "Component libraries and style guides" },
        { name: "Interaction Design", description: "Micro-interactions and animations" },
        { name: "Accessibility (WCAG)", description: "Inclusive design principles" },
        { name: "Information Architecture", description: "Content structure and navigation" },
        { name: "Visual Design", description: "Typography, color theory, layout" },
        { name: "User Testing", description: "Usability evaluation methods" },
        { name: "Design Thinking", description: "Problem-solving methodology" },
        { name: "Design-to-Code", description: "Translating designs to development" },
      ]
    } else if (primaryDomain.includes("DevOps")) {
      return [
        { name: "Infrastructure as Code", description: "Terraform, CloudFormation, Pulumi" },
        { name: "Containerization", description: "Docker, Podman, container registries" },
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "CI/CD Pipelines", description: "GitHub Actions, Jenkins, GitLab CI" },
        { name: "Cloud Platforms", description: "AWS, Azure, GCP expertise" },
        { name: "Monitoring & Observability", description: "Prometheus, Grafana, ELK stack" },
        { name: "Site Reliability Engineering", description: "SLOs, error budgets, reliability" },
        { name: "Security Automation", description: "DevSecOps practices" },
        { name: "Configuration Management", description: "Ansible, Chef, Puppet" },
        { name: "Serverless Architecture", description: "Lambda, Azure Functions, Cloud Run" },
        { name: "Network Infrastructure", description: "VPCs, load balancing, CDNs" },
      ]
    } else if (primaryDomain.includes("Data Science")) {
      return [
        { name: "Machine Learning", description: "Supervised and unsupervised learning" },
        { name: "Deep Learning", description: "Neural networks, CNN, RNN, transformers" },
        { name: "Natural Language Processing", description: "Text analysis and generation" },
        { name: "Computer Vision", description: "Image and video processing" },
        { name: "Data Engineering", description: "ETL pipelines, data warehousing" },
        { name: "Statistical Analysis", description: "Hypothesis testing, regression" },
        { name: "Python Data Stack", description: "Pandas, NumPy, scikit-learn" },
        { name: "Big Data Technologies", description: "Spark, Hadoop, Kafka" },
        { name: "Data Visualization", description: "Tableau, Power BI, D3.js" },
        { name: "MLOps", description: "ML model deployment and monitoring" },
        { name: "Prompt Engineering", description: "LLM optimization techniques" },
      ]
    } else if (primaryDomain.includes("Blockchain")) {
      return [
        { name: "Smart Contract Development", description: "Solidity, Rust, Move" },
        { name: "Web3.js / Ethers.js", description: "Blockchain interaction libraries" },
        { name: "DApp Development", description: "Decentralized application architecture" },
        { name: "Blockchain Protocols", description: "Ethereum, Solana, Polkadot" },
        { name: "Tokenomics", description: "Token design and economics" },
        { name: "NFT Development", description: "Non-fungible token standards and marketplaces" },
        { name: "Consensus Mechanisms", description: "PoW, PoS, DPoS, BFT variants" },
        { name: "Blockchain Security", description: "Audit techniques and vulnerability prevention" },
        { name: "Layer 2 Solutions", description: "Scaling solutions like Rollups, Sidechains" },
        { name: "Crypto Wallets", description: "Wallet integration and management" },
        { name: "Cross-chain Interoperability", description: "Bridges and multi-chain applications" },
      ]
    } else if (primaryDomain.includes("QA")) {
      return [
        { name: "Test Automation", description: "Selenium, Cypress, Playwright" },
        { name: "API Testing", description: "Postman, REST Assured, SoapUI" },
        { name: "Performance Testing", description: "JMeter, Gatling, LoadRunner" },
        { name: "Mobile Testing", description: "Appium, XCTest, Espresso" },
        { name: "Test Management", description: "TestRail, qTest, Zephyr" },
        { name: "Continuous Testing", description: "Integration with CI/CD pipelines" },
        { name: "Security Testing", description: "OWASP, penetration testing" },
        { name: "Accessibility Testing", description: "WCAG compliance verification" },
        { name: "Test-Driven Development", description: "Writing tests before code" },
        { name: "Behavior-Driven Development", description: "Cucumber, SpecFlow, Gherkin" },
        { name: "Visual Regression Testing", description: "Percy, Applitools, BackstopJS" },
      ]
    } else if (primaryDomain.includes("Cybersecurity")) {
      return [
        { name: "Penetration Testing", description: "Ethical hacking and vulnerability assessment" },
        { name: "Security Architecture", description: "Designing secure systems" },
        { name: "Incident Response", description: "Handling security breaches" },
        { name: "Security Compliance", description: "SOC 2, HIPAA, GDPR, PCI DSS" },
        { name: "Network Security", description: "Firewalls, IDS/IPS, VPNs" },
        { name: "Application Security", description: "SAST, DAST, secure coding practices" },
        { name: "Cloud Security", description: "Securing cloud infrastructure" },
        { name: "Identity & Access Management", description: "Authentication and authorization" },
        { name: "Cryptography", description: "Encryption, hashing, digital signatures" },
        { name: "Security Monitoring", description: "SIEM, threat hunting" },
        { name: "Security Automation", description: "Security orchestration and response" },
      ]
    } else {
      // Default skills for other domains
      return [
        { name: "Project Management", description: "Planning, execution, and delivery" },
        { name: "Communication", description: "Clear and effective communication" },
        { name: "Problem Solving", description: "Analytical and creative solutions" },
        { name: "Teamwork", description: "Collaboration and cooperation" },
        { name: "Adaptability", description: "Flexibility and resilience" },
        { name: "Time Management", description: "Prioritization and efficiency" },
        { name: "Leadership", description: "Guidance and motivation" },
        { name: "Critical Thinking", description: "Evaluation and analysis" },
        { name: "Creativity", description: "Innovation and originality" },
        { name: "Technical Proficiency", description: "Domain-specific expertise" },
        { name: "Client Relationship", description: "Building and maintaining trust" },
      ]
    }
  }

  const skills = getSkillsByDomain()

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Elite Skill Cards</h1>
          <p className="text-gray-600">Choose your superpowers. We'll match you to missions that need them most.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Skills for {primaryDomain}</CardTitle>
            <CardDescription>Choose the skills that best represent your expertise in this domain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.selectedSkills.includes(skill.name)
                      ? "border-[#FF6B35] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleSkill(skill.name)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        formData.selectedSkills.includes(skill.name) ? "bg-[#FF6B35] text-white" : "bg-gray-200"
                      }`}
                    >
                      {formData.selectedSkills.includes(skill.name) && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Selected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {formData.selectedSkills.length > 0 ? (
                  formData.selectedSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No skills selected yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
