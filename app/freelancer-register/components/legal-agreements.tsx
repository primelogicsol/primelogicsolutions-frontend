"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, Upload } from "lucide-react"

interface Agreement {
  id: string
  accepted: boolean
}

interface IdentityVerification {
  idType: string
  taxDocType: string
  addressVerified: boolean
}

interface WorkAuthorization {
  interested: boolean
}

interface LegalAgreementsData {
  agreements: Agreement[]
  identityVerification: IdentityVerification
  workAuthorization: WorkAuthorization
}

interface LegalAgreementsProps {
  data: LegalAgreementsData
  freelancerName: string
  onUpdate: (data: LegalAgreementsData) => void
}

export default function LegalAgreements({ data, freelancerName, onUpdate }: LegalAgreementsProps) {
  const [formData, setFormData] = useState<LegalAgreementsData>(data)

  // Initialize agreements only once when component mounts
  useEffect(() => {
    if (formData.agreements.length === 0) {
      setFormData({
        ...formData,
        agreements: [
          { id: "nda", accepted: false },
          { id: "workForHire", accepted: false },
          { id: "scope", accepted: false },
          { id: "payment", accepted: false },
          { id: "security", accepted: false },
          { id: "nonSolicitation", accepted: false },
          { id: "codeOfConduct", accepted: false },
          { id: "ipBoundaries", accepted: false },
        ],
      })
    }
  }, []) // Empty dependency array means this runs only once on mount

  // Update parent component when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData, onUpdate])

  // Toggle agreement acceptance
  const toggleAgreement = (id: string) => {
    setFormData((prev) => {
      const updatedAgreements = prev.agreements.map((agreement) => {
        if (agreement.id === id) {
          return { ...agreement, accepted: !agreement.accepted }
        }
        return agreement
      })
      return {
        ...prev,
        agreements: updatedAgreements,
      }
    })
  }

  // Handle identity verification changes
  const handleIdentityChange = (field: keyof IdentityVerification, value: string | boolean) => {
    setFormData({
      ...formData,
      identityVerification: {
        ...formData.identityVerification,
        [field]: value,
      },
    })
  }

  // Handle work authorization changes
  const handleWorkAuthChange = (interested: boolean) => {
    setFormData({
      ...formData,
      workAuthorization: {
        interested,
      },
    })
  }

  // Check if an agreement is accepted
  const isAgreementAccepted = (id: string) => {
    const agreement = formData.agreements.find((a) => a.id === id)
    return agreement ? agreement.accepted : false
  }

  // Get agreement title
  const getAgreementTitle = (id: string) => {
    switch (id) {
      case "nda":
        return "Project-Specific NDA"
      case "workForHire":
        return "Work-for-Hire Agreement"
      case "scope":
        return "Project Scope & Deliverables"
      case "payment":
        return "Payment Terms Agreement"
      case "security":
        return "Security & Compliance Addendum"
      case "nonSolicitation":
        return "Non-Solicitation Clause"
      case "codeOfConduct":
        return "Code of Conduct Acknowledgment"
      case "ipBoundaries":
        return "Project Intellectual Boundaries"
      default:
        return id
    }
  }

  // Get agreement description
  const getAgreementDescription = (id: string) => {
    switch (id) {
      case "nda":
        return "Binds you to confidentiality obligations for client/project"
      case "workForHire":
        return "Ensures all IP generated under this project is owned by the client upon completion"
      case "scope":
        return "Legal acknowledgment of the official Statement of Work (SOW), timelines, and handover terms"
      case "payment":
        return "Defines milestone payouts, fixed-price rates, payment intervals (Net-7, Net-15, etc.)"
      case "security":
        return "For projects involving PII, HIPAA, GDPR, SOC2, or U.S. Gov/FEMA compliance guidelines"
      case "nonSolicitation":
        return "Prohibits client bypass or off-platform deals for 12 months"
      case "codeOfConduct":
        return "You agree to respectful, timely, and professional behavior with team/client"
      case "ipBoundaries":
        return "Declares what pre-owned IP (e.g., code, components) you may use with retained rights"
      default:
        return ""
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Legal Agreements</h1>
          <p className="text-gray-600">
            Complete the agreement checklist before accessing project assets or timelines.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Agreement Checklist</CardTitle>
              <CardDescription>Freelancer must review and accept each document digitally</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.agreements.map((agreement) => (
                  <div key={agreement.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={`agreement-${agreement.id}`}
                      checked={agreement.accepted}
                      onCheckedChange={() => toggleAgreement(agreement.id)}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor={`agreement-${agreement.id}`}
                        className="font-medium cursor-pointer flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4 text-gray-500" />
                        {getAgreementTitle(agreement.id)}
                        {agreement.id !== "security" && <span className="text-red-500">*</span>}
                      </Label>
                      <p className="text-sm text-gray-500">{getAgreementDescription(agreement.id)}</p>
                      <button
                        type="button"
                        className="text-xs text-blue-600 hover:underline mt-1"
                        onClick={() => {
                          // This would open the document in a real implementation
                          alert(`View ${getAgreementTitle(agreement.id)} document`)
                        }}
                      >
                        View Document
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>Required once or when expired</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-medium">Proof of Identity Submission</Label>
                  <p className="text-sm text-gray-500">Upload any ONE of the following government-issued IDs:</p>
                  <RadioGroup
                    value={formData.identityVerification.idType}
                    onValueChange={(value) => handleIdentityChange("idType", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passport" id="id-passport" />
                      <Label htmlFor="id-passport" className="cursor-pointer">
                        Passport (Photo Page)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="national-id" id="id-national" />
                      <Label htmlFor="id-national" className="cursor-pointer">
                        National Identity Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="drivers-license" id="id-drivers" />
                      <Label htmlFor="id-drivers" className="cursor-pointer">
                        Driver's License (with address)
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="mt-2 p-3 border border-dashed rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Upload ID (Coming Soon)</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="font-medium">Tax Documentation</Label>
                  <RadioGroup
                    value={formData.identityVerification.taxDocType}
                    onValueChange={(value) => handleIdentityChange("taxDocType", value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="w9" id="tax-w9" />
                      <Label htmlFor="tax-w9" className="cursor-pointer">
                        W-9 Form (for U.S. persons)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="w8ben" id="tax-w8ben" />
                      <Label htmlFor="tax-w8ben" className="cursor-pointer">
                        W-8BEN (for international persons)
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-xs text-gray-500">Used for compliance with IRS / FATCA reporting.</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="address-verification"
                      checked={formData.identityVerification.addressVerified}
                      onCheckedChange={(checked) =>
                        handleIdentityChange("addressVerified", checked === true ? true : false)
                      }
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="address-verification" className="font-medium cursor-pointer">
                        Proof of Address Verification (If Required by Project)
                      </Label>
                      <p className="text-sm text-gray-500">
                        Utility bill or bank statement matching name and address (For regulatory or
                        jurisdiction-specific deployments)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Authorization Pathway</CardTitle>
              <CardDescription>For International Freelancers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-800">U.S. Work Authorization Opportunity</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      At Prime Logic Solutions (PLS), we value long-term contributors who demonstrate reliability,
                      innovation, and integrity. If you are not currently authorized to work in the United States, we
                      may support your eligibility based on consistent engagement and legal merit.
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="work-auth-acknowledge"
                          checked={formData.workAuthorization.interested}
                          onCheckedChange={(checked) => handleWorkAuthChange(checked === true ? true : false)}
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="work-auth-acknowledge" className="cursor-pointer">
                            I am interested in exploring long-term collaboration that could lead to U.S. work
                            authorization within the next 24 months.
                          </Label>
                          <p className="text-xs text-blue-600 mt-1">
                            Note: This does not guarantee sponsorship or visa processing. Eligibility will depend on
                            legal, immigration, and business criteria defined by U.S. law.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Final Certification</CardTitle>
              <CardDescription>Digital signature and certification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name:</p>
                      <p className="font-medium">{freelancerName || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date:</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="final-certification"
                    checked={
                      formData.agreements.filter((a) => a.accepted).length === formData.agreements.length &&
                      formData.identityVerification.idType !== "" &&
                      formData.identityVerification.taxDocType !== ""
                    }
                    disabled
                    className="mt-1"
                  />
                  <Label htmlFor="final-certification" className="text-sm">
                    I hereby declare that all submitted documents are valid, that I have read and agreed to all legal
                    agreements listed above, and that I consent to digital storage and verification for project
                    clearance.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
