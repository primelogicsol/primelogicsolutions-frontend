"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface ToolCategory {
  category: string
  tools: string[]
}

interface ToolstackProficiencyData {
  selectedTools: ToolCategory[]
}

interface ToolstackProficiencyProps {
  data: ToolstackProficiencyData
  primaryDomain: string
  onUpdate: (data: ToolstackProficiencyData) => void
}

export default function ToolstackProficiency({ data, primaryDomain, onUpdate }: ToolstackProficiencyProps) {
  const [formData, setFormData] = useState<ToolstackProficiencyData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Toggle tool selection
  const toggleTool = (category: string, tool: string) => {
    setFormData((prev) => {
      const categoryIndex = prev.selectedTools.findIndex((c) => c.category === category)

      if (categoryIndex === -1) {
        // Category doesn't exist, add it with the selected tool
        return {
          ...prev,
          selectedTools: [...prev.selectedTools, { category, tools: [tool] }],
        }
      } else {
        // Category exists, check if tool is already selected
        const categoryTools = prev.selectedTools[categoryIndex].tools
        const isToolSelected = categoryTools.includes(tool)

        if (isToolSelected) {
          // Remove tool from category
          const updatedTools = categoryTools.filter((t) => t !== tool)

          if (updatedTools.length === 0) {
            // If no tools left in category, remove the category
            return {
              ...prev,
              selectedTools: prev.selectedTools.filter((c) => c.category !== category),
            }
          } else {
            // Update tools in category
            const updatedSelectedTools = [...prev.selectedTools]
            updatedSelectedTools[categoryIndex] = { category, tools: updatedTools }
            return {
              ...prev,
              selectedTools: updatedSelectedTools,
            }
          }
        } else {
          // Add tool to category
          const updatedSelectedTools = [...prev.selectedTools]
          updatedSelectedTools[categoryIndex] = {
            category,
            tools: [...categoryTools, tool],
          }
          return {
            ...prev,
            selectedTools: updatedSelectedTools,
          }
        }
      }
    })
  }

  // Check if a tool is selected
  const isToolSelected = (category: string, tool: string) => {
    const categoryData = formData.selectedTools.find((c) => c.category === category)
    return categoryData ? categoryData.tools.includes(tool) : false
  }

  // Get tools based on primary domain
  const getToolsByDomain = () => {
    if (primaryDomain.includes("Web Development")) {
      return [
        {
          category: "Frontend Frameworks",
          tools: ["Next.js 14", "Remix", "Qwik", "Astro", "SvelteKit"],
        },
        {
          category: "Styling",
          tools: ["Tailwind CSS 4", "ShadCN UI", "Radix UI", "Styled Components", "CSS Modules"],
        },
        {
          category: "CMS / Headless",
          tools: ["Payload CMS", "Sanity V3", "Builder.io", "Contentful", "Strapi"],
        },
        {
          category: "Hosting/Deployments",
          tools: ["Vercel Edge", "Cloudflare Pages", "Netlify", "AWS Amplify", "Digital Ocean App Platform"],
        },
        {
          category: "State Management",
          tools: ["Zustand", "Jotai", "Recoil", "Redux Toolkit", "TanStack Query"],
        },
        {
          category: "Form Tools",
          tools: ["React Hook Form", "Formbricks", "Formik", "Zod", "Yup"],
        },
        {
          category: "Auth & Access",
          tools: ["Clerk.dev", "Auth.js", "NextAuth", "Supabase Auth", "Firebase Auth"],
        },
        {
          category: "Testing",
          tools: ["Playwright", "Vitest", "Cypress 13", "Jest", "Testing Library"],
        },
      ]
    } else if (primaryDomain.includes("Software Engineering")) {
      return [
        {
          category: "Programming Languages",
          tools: ["Rust", "Go 1.23", "Python 3.13", "TypeScript 5", "Java 21", "C#/.NET 8"],
        },
        {
          category: "Backend Frameworks",
          tools: ["Bun.js", "Fastify", "tRPC", "NestJS", "Django", "Spring Boot", "ASP.NET Core"],
        },
        {
          category: "DevOps / Infra",
          tools: ["Dagger.io", "Pulumi", "Nitric", "Terraform", "AWS CDK"],
        },
        {
          category: "Containers & Orchestration",
          tools: ["Kubernetes v1.30", "DevSpace", "Portainer", "Docker Compose", "Podman"],
        },
        {
          category: "API Tools",
          tools: ["tRPC", "OpenAPI 3.1", "gRPC", "GraphQL", "REST"],
        },
        {
          category: "CI/CD Pipelines",
          tools: ["Dagger", "GitHub Actions Matrix", "Earthly", "GitLab CI", "CircleCI"],
        },
        {
          category: "Observability",
          tools: ["Grafana Tempo", "OpenTelemetry", "Sentry AI", "Datadog", "New Relic"],
        },
        {
          category: "Security",
          tools: ["Semgrep", "Wiz", "Sigstore", "Snyk", "SonarQube"],
        },
      ]
    } else if (primaryDomain.includes("Digital Marketing")) {
      return [
        {
          category: "AI Content Creation",
          tools: ["Jasper AI", "Writer.com", "Surfer AI", "Copy.ai", "ChatGPT"],
        },
        {
          category: "SEO Audits & Tools",
          tools: ["Ahrefs 2025", "ClearScope", "Outranking", "Semrush", "Moz Pro"],
        },
        {
          category: "Ad Optimization",
          tools: ["Madgicx", "Revealbot", "Google PMAX", "Meta Advantage+", "TikTok Ads Manager"],
        },
        {
          category: "Email & Automation",
          tools: ["Customer.io", "Encharge", "MailerLite AI", "Klaviyo", "ActiveCampaign"],
        },
        {
          category: "Analytics & CRO",
          tools: ["GA4 Advanced", "PostHog", "Microsoft Clarity", "Hotjar", "Mixpanel"],
        },
        {
          category: "Funnel Tools",
          tools: ["FunnelKit", "ConvertFlow", "Proof Pulse", "ClickFunnels", "Unbounce"],
        },
        {
          category: "Influencer Mgmt",
          tools: ["Heepsy", "Upfluence", "Impact.com", "CreatorIQ", "Grin"],
        },
        {
          category: "Attribution Tools",
          tools: ["Triple Whale", "Northbeam", "Segment Personas", "Rockerbox", "Windsor.ai"],
        },
      ]
    } else if (primaryDomain.includes("Mobile App Development")) {
      return [
        {
          category: "Cross-Platform Frameworks",
          tools: ["React Native", "Flutter", "Expo", "Ionic", "Capacitor"],
        },
        {
          category: "Native iOS",
          tools: ["Swift UI", "Swift", "Xcode", "Objective-C", "Cocoa Touch"],
        },
        {
          category: "Native Android",
          tools: ["Kotlin", "Jetpack Compose", "Android Studio", "Java", "Android SDK"],
        },
        {
          category: "Mobile UI Frameworks",
          tools: ["React Native Paper", "Native Base", "Flutter Material", "Tamagui", "UI Kitten"],
        },
        {
          category: "Mobile State Management",
          tools: ["Redux Toolkit", "MobX", "Zustand", "Riverpod", "Provider"],
        },
        {
          category: "Mobile Testing",
          tools: ["Detox", "Appium", "Maestro", "XCTest", "Espresso"],
        },
        {
          category: "Mobile CI/CD",
          tools: ["Fastlane", "App Center", "Bitrise", "Codemagic", "Firebase App Distribution"],
        },
        {
          category: "Mobile Analytics",
          tools: ["Firebase Analytics", "Mixpanel", "Amplitude", "Segment", "AppsFlyer"],
        },
      ]
    } else if (primaryDomain.includes("UI/UX")) {
      return [
        {
          category: "Design Tools",
          tools: ["Figma", "Adobe XD", "Sketch", "Framer", "Penpot"],
        },
        {
          category: "Prototyping",
          tools: ["Figma Prototyping", "ProtoPie", "Principle", "InVision", "Marvel"],
        },
        {
          category: "User Research",
          tools: ["Maze", "UserTesting", "Lookback", "Optimal Workshop", "Dovetail"],
        },
        {
          category: "Design Systems",
          tools: ["Figma Variables", "Tokens Studio", "Zeroheight", "Storybook", "Lingo"],
        },
        {
          category: "Collaboration",
          tools: ["Figma FigJam", "Miro", "Notion", "Abstract", "Zeplin"],
        },
        {
          category: "Accessibility",
          tools: ["Stark", "Axe", "Contrast", "ColorBox", "A11y"],
        },
        {
          category: "Animation",
          tools: ["Lottie", "Rive", "After Effects", "Haiku", "Kite Compositor"],
        },
        {
          category: "Design-to-Code",
          tools: ["Anima", "Plasmic", "Supernova", "Relay", "Pagedraw"],
        },
      ]
    } else if (primaryDomain.includes("DevOps")) {
      return [
        {
          category: "Infrastructure as Code",
          tools: ["Terraform", "Pulumi", "AWS CloudFormation", "Azure ARM", "Google Cloud Deployment Manager"],
        },
        {
          category: "Containerization",
          tools: ["Docker", "Podman", "Buildah", "Kaniko", "Buildpacks"],
        },
        {
          category: "Orchestration",
          tools: ["Kubernetes", "Nomad", "Docker Swarm", "OpenShift", "Rancher"],
        },
        {
          category: "CI/CD",
          tools: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "ArgoCD"],
        },
        {
          category: "Monitoring",
          tools: ["Prometheus", "Grafana", "Datadog", "New Relic", "Dynatrace"],
        },
        {
          category: "Logging",
          tools: ["Elasticsearch", "Loki", "Splunk", "Graylog", "Fluentd"],
        },
        {
          category: "Security",
          tools: ["Vault", "Snyk", "Trivy", "Falco", "OPA"],
        },
        {
          category: "Cloud Platforms",
          tools: ["AWS", "Azure", "GCP", "DigitalOcean", "Linode"],
        },
      ]
    } else if (primaryDomain.includes("Data Science")) {
      return [
        {
          category: "ML Frameworks",
          tools: ["PyTorch", "TensorFlow", "JAX", "scikit-learn", "Keras"],
        },
        {
          category: "Data Processing",
          tools: ["Pandas", "NumPy", "Dask", "PySpark", "Polars"],
        },
        {
          category: "Visualization",
          tools: ["Matplotlib", "Seaborn", "Plotly", "Bokeh", "D3.js"],
        },
        {
          category: "MLOps",
          tools: ["MLflow", "Weights & Biases", "DVC", "Kubeflow", "Seldon"],
        },
        {
          category: "NLP",
          tools: ["Hugging Face", "spaCy", "NLTK", "Gensim", "LangChain"],
        },
        {
          category: "Computer Vision",
          tools: ["OpenCV", "Detectron2", "YOLO", "MediaPipe", "Albumentations"],
        },
        {
          category: "Big Data",
          tools: ["Spark", "Hadoop", "Kafka", "Airflow", "Databricks"],
        },
        {
          category: "Cloud ML",
          tools: ["AWS SageMaker", "Google Vertex AI", "Azure ML", "Databricks", "Colab Pro"],
        },
      ]
    } else if (primaryDomain.includes("Blockchain")) {
      return [
        {
          category: "Smart Contract Languages",
          tools: ["Solidity", "Rust", "Move", "Vyper", "Ink"],
        },
        {
          category: "Blockchain Frameworks",
          tools: ["Hardhat", "Foundry", "Truffle", "Brownie", "Anchor"],
        },
        {
          category: "Web3 Libraries",
          tools: ["ethers.js", "web3.js", "viem", "wagmi", "thirdweb"],
        },
        {
          category: "Blockchain Networks",
          tools: ["Ethereum", "Solana", "Polygon", "Avalanche", "Polkadot"],
        },
        {
          category: "NFT Tools",
          tools: ["OpenSea API", "Manifold", "IPFS/Filecoin", "Arweave", "Metaplex"],
        },
        {
          category: "DeFi Protocols",
          tools: ["Uniswap", "Aave", "Compound", "MakerDAO", "Curve"],
        },
        {
          category: "Blockchain Security",
          tools: ["Slither", "Mythril", "Echidna", "Manticore", "Scribble"],
        },
        {
          category: "Blockchain Analytics",
          tools: ["Dune Analytics", "Nansen", "Chainalysis", "Etherscan", "Glassnode"],
        },
      ]
    } else if (primaryDomain.includes("QA")) {
      return [
        {
          category: "Test Automation",
          tools: ["Selenium", "Cypress", "Playwright", "TestCafe", "WebdriverIO"],
        },
        {
          category: "API Testing",
          tools: ["Postman", "REST Assured", "Karate", "SoapUI", "Pactum"],
        },
        {
          category: "Mobile Testing",
          tools: ["Appium", "Detox", "XCUITest", "Espresso", "Maestro"],
        },
        {
          category: "Performance Testing",
          tools: ["JMeter", "Gatling", "k6", "LoadRunner", "Locust"],
        },
        {
          category: "Test Management",
          tools: ["TestRail", "qTest", "Zephyr", "Xray", "PractiTest"],
        },
        {
          category: "BDD",
          tools: ["Cucumber", "SpecFlow", "Behave", "Serenity", "Gauge"],
        },
        {
          category: "Visual Testing",
          tools: ["Percy", "Applitools", "BackstopJS", "Chromatic", "Screener"],
        },
        {
          category: "Security Testing",
          tools: ["OWASP ZAP", "Burp Suite", "Acunetix", "Nessus", "Metasploit"],
        },
      ]
    } else if (primaryDomain.includes("Cybersecurity")) {
      return [
        {
          category: "Penetration Testing",
          tools: ["Metasploit", "Burp Suite", "Nmap", "Wireshark", "Kali Linux"],
        },
        {
          category: "Vulnerability Management",
          tools: ["Nessus", "Qualys", "Rapid7", "OpenVAS", "Tenable.io"],
        },
        {
          category: "SIEM & Monitoring",
          tools: ["Splunk", "ELK Stack", "QRadar", "Wazuh", "AlienVault"],
        },
        {
          category: "Identity & Access",
          tools: ["Okta", "Auth0", "Keycloak", "Azure AD", "CyberArk"],
        },
        {
          category: "Cloud Security",
          tools: ["AWS Security Hub", "Azure Sentinel", "GCP Security Command Center", "Prisma Cloud", "Lacework"],
        },
        {
          category: "Application Security",
          tools: ["SonarQube", "Checkmarx", "Veracode", "Snyk", "OWASP ZAP"],
        },
        {
          category: "Compliance",
          tools: ["Vanta", "Drata", "Secureframe", "Tugboat Logic", "Hyperproof"],
        },
        {
          category: "Threat Intelligence",
          tools: ["Recorded Future", "ThreatConnect", "Mandiant", "CrowdStrike", "Anomali"],
        },
      ]
    } else {
      // Default tools for other domains
      return [
        {
          category: "Project Management",
          tools: ["Jira", "Asana", "Trello", "Monday.com", "ClickUp"],
        },
        {
          category: "Communication",
          tools: ["Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet"],
        },
        {
          category: "Documentation",
          tools: ["Notion", "Confluence", "Google Docs", "Coda", "Obsidian"],
        },
        {
          category: "Design",
          tools: ["Figma", "Adobe Creative Suite", "Canva", "Sketch", "Miro"],
        },
        {
          category: "Productivity",
          tools: ["Notion", "Todoist", "Evernote", "Obsidian", "Roam Research"],
        },
        {
          category: "Version Control",
          tools: ["Git", "GitHub", "GitLab", "Bitbucket", "Azure DevOps"],
        },
        {
          category: "Analytics",
          tools: ["Google Analytics", "Mixpanel", "Amplitude", "Hotjar", "Looker"],
        },
        {
          category: "CRM",
          tools: ["Salesforce", "HubSpot", "Zoho", "Pipedrive", "Monday Sales CRM"],
        },
      ]
    }
  }

  const toolCategories = getToolsByDomain()

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Toolstack Proficiency</h1>
          <p className="text-gray-600">We don't just onboard for today. We deploy for what's next.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Tools for {primaryDomain}</CardTitle>
            <CardDescription>Choose the tools and frameworks you're proficient with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {toolCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-4">
                  <h3 className="font-medium text-lg">{category.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          isToolSelected(category.category, tool)
                            ? "border-[#FF6B35] bg-orange-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => toggleTool(category.category, tool)}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                              isToolSelected(category.category, tool) ? "bg-[#FF6B35] text-white" : "bg-gray-200"
                            }`}
                          >
                            {isToolSelected(category.category, tool) && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-sm">{tool}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="font-medium mb-4">Your Selected Tools</h3>
              {formData.selectedTools.length > 0 ? (
                <div className="space-y-4">
                  {formData.selectedTools.map((category, index) => (
                    <div key={index}>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">{category.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.tools.map((tool, toolIndex) => (
                          <Badge key={toolIndex} variant="secondary" className="px-3 py-1">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No tools selected yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
