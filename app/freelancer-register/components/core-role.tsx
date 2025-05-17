"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Globe, Code, Smartphone, Palette, Server, Database, BarChart, Blocks, TestTube, Shield } from "lucide-react"

interface CoreRoleData {
  primaryDomain: string
}

interface CoreRoleProps {
  data: CoreRoleData
  onUpdate: (data: CoreRoleData) => void
}

export default function CoreRole({ data, onUpdate }: CoreRoleProps) {
  const [formData, setFormData] = useState<CoreRoleData>(data)
  const [otherDomain, setOtherDomain] = useState("")

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Handle domain selection
  const handleDomainSelect = (domain: string) => {
    setFormData({
      ...formData,
      primaryDomain: domain,
    })
  }

  // Handle "Other" domain input
  const handleOtherDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherDomain(e.target.value)
    if (e.target.value) {
      setFormData({
        ...formData,
        primaryDomain: `Other: ${e.target.value}`,
      })
    } else {
      setFormData({
        ...formData,
        primaryDomain: "",
      })
    }
  }

  // Domain options with icons and descriptions
  const domains = [
    {
      id: "web-development",
      name: "Web Development",
      icon: <Globe className="h-6 w-6" />,
      description: "Frontend/backend engineers, JAMstack, CMS, SSR/SPAs",
    },
    {
      id: "software-engineering",
      name: "Software Engineering",
      icon: <Code className="h-6 w-6" />,
      description: "Full-stack, backend systems, architecture, API-heavy apps",
    },
    {
      id: "mobile-app-development",
      name: "Mobile App Development",
      icon: <Smartphone className="h-6 w-6" />,
      description: "iOS/Android/Flutter/React Native/PWA experts",
    },
    {
      id: "ui-ux-design",
      name: "UI/UX + Product Design",
      icon: <Palette className="h-6 w-6" />,
      description: "Product-focused designers, prototypers, creative leads",
    },
    {
      id: "devops-cloud",
      name: "DevOps & Cloud Engineering",
      icon: <Server className="h-6 w-6" />,
      description: "AWS, CI/CD, Kubernetes, infrastructure-as-code specialists",
    },
    {
      id: "data-science-ai",
      name: "Data Science & AI/ML",
      icon: <Database className="h-6 w-6" />,
      description: "ML engineers, data scientists, prompt engineers, NLP experts",
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing & SEO",
      icon: <BarChart className="h-6 w-6" />,
      description: "Performance marketers, CRO experts, paid ads, analytics pros",
    },
    {
      id: "blockchain-web3",
      name: "Blockchain / Web3 Development",
      icon: <Blocks className="h-6 w-6" />,
      description: "Smart contracts, DApps, tokenomics, crypto backend",
    },
    {
      id: "qa-testing",
      name: "QA & Test Automation",
      icon: <TestTube className="h-6 w-6" />,
      description: "Selenium, Cypress, TestRail, QA processes, regression testing",
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity / Compliance",
      icon: <Shield className="h-6 w-6" />,
      description: "Infosec, SOC 2 readiness, encryption, auth protocols",
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">What You Master — Core Role & Strength</h1>
          <p className="text-gray-600">We deploy mastery. Select the zone where you lead.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Primary Domain of Mastery</CardTitle>
            <CardDescription>Choose ONE only — This determines your onboarding path</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domains.map((domain) => (
                <div
                  key={domain.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.primaryDomain === domain.name
                      ? "border-[#FF6B35] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleDomainSelect(domain.name)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        formData.primaryDomain === domain.name ? "bg-[#FF6B35] text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {domain.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={domain.id}
                          name="primaryDomain"
                          checked={formData.primaryDomain === domain.name}
                          onChange={() => handleDomainSelect(domain.name)}
                          className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35]"
                        />
                        <Label htmlFor={domain.id} className="font-medium cursor-pointer">
                          {domain.name}
                        </Label>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{domain.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Other option */}
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  formData.primaryDomain.startsWith("Other:")
                    ? "border-[#FF6B35] bg-orange-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (otherDomain) {
                    handleDomainSelect(`Other: ${otherDomain}`)
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      formData.primaryDomain.startsWith("Other:")
                        ? "bg-[#FF6B35] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <Code className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="other-domain"
                        name="primaryDomain"
                        checked={formData.primaryDomain.startsWith("Other:")}
                        onChange={() => {
                          if (otherDomain) {
                            handleDomainSelect(`Other: ${otherDomain}`)
                          }
                        }}
                        className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35]"
                      />
                      <Label htmlFor="other-domain" className="font-medium cursor-pointer">
                        Other (Please Specify)
                      </Label>
                    </div>
                    <div className="mt-2">
                      <Input
                        id="other-domain-input"
                        value={otherDomain}
                        onChange={handleOtherDomainChange}
                        placeholder="Specify your domain"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
