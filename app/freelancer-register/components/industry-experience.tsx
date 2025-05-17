"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface IndustryExperienceData {
  selectedIndustries: string[]
}

interface IndustryExperienceProps {
  data: IndustryExperienceData
  onUpdate: (data: IndustryExperienceData) => void
}

export default function IndustryExperience({ data, onUpdate }: IndustryExperienceProps) {
  const [formData, setFormData] = useState<IndustryExperienceData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    setFormData((prev) => {
      const isSelected = prev.selectedIndustries.includes(industry)

      if (isSelected) {
        return {
          ...prev,
          selectedIndustries: prev.selectedIndustries.filter((i) => i !== industry),
        }
      } else {
        return {
          ...prev,
          selectedIndustries: [...prev.selectedIndustries, industry],
        }
      }
    })
  }

  // List of industries
  const industries = [
    "Fintech",
    "HealthTech",
    "GovTech / FEMA / Defense",
    "E-Commerce",
    "SaaS (B2B/B2C)",
    "EdTech",
    "AI & Machine Learning",
    "Real Estate & PropTech",
    "Blockchain / Web3",
    "Media / Publishing",
    "ClimateTech / Energy",
    "Manufacturing / IoT",
    "LegalTech",
    "NGOs / Nonprofits",
    "Marketing & AdTech",
    "Transportation / Logistics",
    "Travel & Hospitality",
    "SportsTech / Gaming",
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Industry Experience</h1>
          <p className="text-gray-600">
            Great developers don't just write code — they understand the industries they build for.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Your Industry Experience</CardTitle>
            <CardDescription>Choose the industries where you have professional experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.selectedIndustries.includes(industry)
                      ? "border-[#FF6B35] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => toggleIndustry(industry)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        formData.selectedIndustries.includes(industry) ? "bg-[#FF6B35] text-white" : "bg-gray-200"
                      }`}
                    >
                      {formData.selectedIndustries.includes(industry) && <Check className="w-3 h-3" />}
                    </div>
                    <span>{industry}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Selected Industries</h3>
              <div className="flex flex-wrap gap-2">
                {formData.selectedIndustries.length > 0 ? (
                  formData.selectedIndustries.map((industry, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {industry}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No industries selected yet</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
