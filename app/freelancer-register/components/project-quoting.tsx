"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProjectQuotingData {
  compensationPreference: string
  smallProjectPrice: number
  midProjectPrice: number
  longTermPrice: number
  milestoneTerms: string
  willSubmitProposals: string
}

interface ProjectQuotingProps {
  data: ProjectQuotingData
  onUpdate: (data: ProjectQuotingData) => void
}

export default function ProjectQuoting({ data, onUpdate }: ProjectQuotingProps) {
  const [formData, setFormData] = useState<ProjectQuotingData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Handle radio button changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name.includes("Price") ? Number(value) || 0 : value,
    })
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Project-Based Quoting & Bidding</h1>
          <p className="text-gray-600">Your work. Your value. Your terms — per project.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Project-Based Compensation Preference</CardTitle>
              <CardDescription>
                Would you like to work on fixed-price, milestone-based, or bidding-based projects?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.compensationPreference}
                onValueChange={(value) => handleRadioChange("compensationPreference", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="fixed" id="comp-fixed" />
                  <div>
                    <Label htmlFor="comp-fixed" className="cursor-pointer">
                      Yes — I prefer fixed project pricing
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Set price for defined scope of work</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="bidding" id="comp-bidding" />
                  <div>
                    <Label htmlFor="comp-bidding" className="cursor-pointer">
                      Yes — I am open to bidding against scoped briefs
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Compete for projects based on your proposal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="hourly" id="comp-hourly" />
                  <div>
                    <Label htmlFor="comp-hourly" className="cursor-pointer">
                      No — I prefer hourly/retainer only
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">Bill for time spent rather than project outcomes</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferred Project-Based Price Range</CardTitle>
              <CardDescription>Provide your typical price ranges for different project sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smallProjectPrice">Typical Small Project Quote (1–2 weeks)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="smallProjectPrice"
                        name="smallProjectPrice"
                        type="number"
                        min="0"
                        value={formData.smallProjectPrice || ""}
                        onChange={handleInputChange}
                        placeholder="e.g., 500 - 2,000"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="midProjectPrice">Mid-Sized Project Quote (3–5 weeks)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="midProjectPrice"
                        name="midProjectPrice"
                        type="number"
                        min="0"
                        value={formData.midProjectPrice || ""}
                        onChange={handleInputChange}
                        placeholder="e.g., 2,000 - 8,000"
                        className="pl-7"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longTermPrice">Long-Term Engagement ({">"}1 month)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input
                        id="longTermPrice"
                        name="longTermPrice"
                        type="number"
                        min="0"
                        value={formData.longTermPrice || ""}
                        onChange={handleInputChange}
                        placeholder="Monthly pricing"
                        className="pl-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Milestone-Based Bidding Support</CardTitle>
              <CardDescription>For complex projects or government-backed programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Preferred Milestone Payment Terms</Label>
                  <RadioGroup
                    value={formData.milestoneTerms}
                    onValueChange={(value) => handleRadioChange("milestoneTerms", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50/50" id="milestone-5050" />
                      <Label htmlFor="milestone-5050" className="cursor-pointer">
                        50/50
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30/40/30" id="milestone-304030" />
                      <Label htmlFor="milestone-304030" className="cursor-pointer">
                        30/40/30
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="milestone-custom" />
                      <Label htmlFor="milestone-custom" className="cursor-pointer">
                        Custom
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.milestoneTerms === "custom" && (
                    <Input name="customMilestone" placeholder="Specify your custom milestone terms" className="mt-2" />
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Will you submit scoped proposals per brief?</Label>
                  <RadioGroup
                    value={formData.willSubmitProposals}
                    onValueChange={(value) => handleRadioChange("willSubmitProposals", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes-template" id="proposal-yes-template" />
                      <Label htmlFor="proposal-yes-template" className="cursor-pointer">
                        Yes, I have a proposal template
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes-help" id="proposal-yes-help" />
                      <Label htmlFor="proposal-yes-help" className="cursor-pointer">
                        Yes, but need help from PLS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="proposal-no" />
                      <Label htmlFor="proposal-no" className="cursor-pointer">
                        No, I prefer pricing-only bidding
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
