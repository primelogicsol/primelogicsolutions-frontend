"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Globe,
  Github,
  Gitlab,
  Dribbble,
  Figma,
  SquareStackIcon as StackOverflow,
  BookOpen,
  Database,
  Linkedin,
} from "lucide-react"

interface WhoYouAreData {
  fullName: string
  email: string
  timeZone: string
  country: string
  professionalLinks: {
    github?: string
    gitlab?: string
    dribbble?: string
    behance?: string
    stackoverflow?: string
    medium?: string
    kaggle?: string
    personalSite?: string
    linkedin?: string
  }
}

interface WhoYouAreProps {
  data: WhoYouAreData
  onUpdate: (data: WhoYouAreData) => void
}

export default function WhoYouAre({ data, onUpdate }: WhoYouAreProps) {
  const [formData, setFormData] = useState<WhoYouAreData>(data)

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name.startsWith("link_")) {
      const linkType = name.replace("link_", "")
      setFormData({
        ...formData,
        professionalLinks: {
          ...formData.professionalLinks,
          [linkType]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Get user's timezone
  useEffect(() => {
    if (!formData.timeZone) {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        setFormData((prev) => ({
          ...prev,
          timeZone: timezone,
        }))
      } catch (error) {
        console.error("Could not detect timezone:", error)
      }
    }
  }, [formData.timeZone])

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Who You Are — Global Identity Check</h1>
          <p className="text-gray-600">Let's begin with who you are and where you operate from.</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic information helps us verify your identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone">Time Zone (Auto-detected)</Label>
                  <Input
                    id="timeZone"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                    placeholder="Your timezone"
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                    <option value="PK">Pakistan</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="BR">Brazil</option>
                    <option value="MX">Mexico</option>
                    <option value="ZA">South Africa</option>
                    <option value="NG">Nigeria</option>
                    <option value="EG">Egypt</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SG">Singapore</option>
                    <option value="MY">Malaysia</option>
                    <option value="PH">Philippines</option>
                    <option value="ID">Indonesia</option>
                    <option value="TH">Thailand</option>
                    <option value="VN">Vietnam</option>
                    <option value="KR">South Korea</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Verification Links</CardTitle>
              <CardDescription>Add at least one professional profile link to verify your expertise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="link_github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub
                  </Label>
                  <Input
                    id="link_github"
                    name="link_github"
                    value={formData.professionalLinks.github || ""}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_gitlab" className="flex items-center gap-2">
                    <Gitlab className="h-4 w-4" /> GitLab
                  </Label>
                  <Input
                    id="link_gitlab"
                    name="link_gitlab"
                    value={formData.professionalLinks.gitlab || ""}
                    onChange={handleInputChange}
                    placeholder="https://gitlab.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_dribbble" className="flex items-center gap-2">
                    <Dribbble className="h-4 w-4" /> Dribbble
                  </Label>
                  <Input
                    id="link_dribbble"
                    name="link_dribbble"
                    value={formData.professionalLinks.dribbble || ""}
                    onChange={handleInputChange}
                    placeholder="https://dribbble.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_behance" className="flex items-center gap-2">
                    <Figma className="h-4 w-4" /> Behance
                  </Label>
                  <Input
                    id="link_behance"
                    name="link_behance"
                    value={formData.professionalLinks.behance || ""}
                    onChange={handleInputChange}
                    placeholder="https://behance.net/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_stackoverflow" className="flex items-center gap-2">
                    <StackOverflow className="h-4 w-4" /> Stack Overflow
                  </Label>
                  <Input
                    id="link_stackoverflow"
                    name="link_stackoverflow"
                    value={formData.professionalLinks.stackoverflow || ""}
                    onChange={handleInputChange}
                    placeholder="https://stackoverflow.com/users/yourid"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_medium" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Medium / Dev.to
                  </Label>
                  <Input
                    id="link_medium"
                    name="link_medium"
                    value={formData.professionalLinks.medium || ""}
                    onChange={handleInputChange}
                    placeholder="https://medium.com/@yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_kaggle" className="flex items-center gap-2">
                    <Database className="h-4 w-4" /> Kaggle / Hugging Face
                  </Label>
                  <Input
                    id="link_kaggle"
                    name="link_kaggle"
                    value={formData.professionalLinks.kaggle || ""}
                    onChange={handleInputChange}
                    placeholder="https://kaggle.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_personalSite" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Personal Site / Notion
                  </Label>
                  <Input
                    id="link_personalSite"
                    name="link_personalSite"
                    value={formData.professionalLinks.personalSite || ""}
                    onChange={handleInputChange}
                    placeholder="https://yourpersonalsite.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link_linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn Profile
                  </Label>
                  <Input
                    id="link_linkedin"
                    name="link_linkedin"
                    value={formData.professionalLinks.linkedin || ""}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
              </div>
              <p className="text-sm text-amber-600 mt-4">
                Please provide at least one professional link to verify your expertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
