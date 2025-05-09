"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Smartphone, Tablet, Monitor } from "lucide-react"

interface IndustryPreviewProps {
  industryId: string
  industry?: any
  children: React.ReactNode
}

export function IndustryPreview({ industryId, industry, children }: IndustryPreviewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [industryData, setIndustryData] = useState<any>(null)
  const [viewMode, setViewMode] = useState("desktop")
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIndustry() {
      if (!open) return

      setIsLoading(true)
      setError(null)

      try {
        // If industry data is provided directly, use it
        if (industry) {
          console.log("Using provided industry data:", industry)
          setIndustryData(industry)
          setIsLoading(false)
          return
        }

        // Otherwise fetch from API
        const response = await fetch(`/api/industries/${industryId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch industry")
        }
        const data = await response.json()
        console.log("Fetched industry data:", data)
        setIndustryData(data)
      } catch (error) {
        console.error("Error fetching industry:", error)
        setError("Failed to load industry data. Please try again.")
        // Set a default empty structure to prevent rendering errors
        setIndustryData({
          title: "Error loading industry",
          subtitle: "",
          description: { intro: [], conclusion: "" },
          industryStatus: { title: "", items: [] },
          challenges: [],
          requirements: [],
          solutions: [],
          features: [],
          faq: [],
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchIndustry()
  }, [industryId, industry, open])

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      case "desktop":
      default:
        return "100%"
    }
  }

  // Safe access function to prevent undefined errors
  const safeGet = (obj: any, path: string, defaultValue: any = "") => {
    try {
      const keys = path.split(".")
      let result = obj

      for (const key of keys) {
        if (result === undefined || result === null) return defaultValue
        result = result[key]
      }

      return result === undefined || result === null ? defaultValue : result
    } catch (e) {
      console.error(`Error accessing ${path}:`, e)
      return defaultValue
    }
  }

  // Simplified preview renderer
  const renderPreview = () => {
    if (!industryData) return <div className="p-8 text-center">No data available</div>

    try {
      return (
        <div className="p-6">
          {/* Hero Section */}
          <div className="bg-[#003087] py-8 px-4 mb-8 text-center text-white rounded-lg">
            <h1 className="text-3xl font-bold mb-2">{safeGet(industryData, "title")}</h1>
            <p className="text-lg">{safeGet(industryData, "subtitle")}</p>
          </div>

          {/* Featured Image */}
          {safeGet(industryData, "image") && (
            <div className="mb-8 flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-md max-w-full">
                <Image
                  src={safeGet(industryData, "image") || "/placeholder.svg"}
                  alt={safeGet(industryData, "title")}
                  className="w-full h-auto max-h-[400px] object-cover"
                  onError={(e) => {
                    console.error("Error loading image:", e)
                    e.currentTarget.src = "/placeholder.svg?height=400&width=800"
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            {Array.isArray(safeGet(industryData, "description.intro", [])) ? (
              safeGet(industryData, "description.intro", []).map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No description available</p>
            )}
          </div>

          {/* Industry Status, Challenges & Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Industry Status, Challenges & Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status */}
              <div className="bg-white rounded-lg shadow p-4 border">
                <h3 className="text-xl font-bold mb-2">Industry Status</h3>
                <ul className="list-disc pl-5">
                  {Array.isArray(safeGet(industryData, "industryStatus.items", [])) ? (
                    safeGet(industryData, "industryStatus.items", []).map((item: string, index: number) => (
                      <li key={index} className="mb-1 text-gray-700">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No status items available</li>
                  )}
                </ul>
              </div>

              {/* Challenges */}
              <div className="bg-white rounded-lg shadow p-4 border">
                <h3 className="text-xl font-bold mb-2">Challenges</h3>
                <ul className="list-disc pl-5">
                  {Array.isArray(safeGet(industryData, "challenges", [])) ? (
                    safeGet(industryData, "challenges", []).map((item: string, index: number) => (
                      <li key={index} className="mb-1 text-gray-700">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No challenges available</li>
                  )}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow p-4 border">
                <h3 className="text-xl font-bold mb-2">Requirements</h3>
                <ul className="list-disc pl-5">
                  {Array.isArray(safeGet(industryData, "requirements", [])) ? (
                    safeGet(industryData, "requirements", []).map((item: string, index: number) => (
                      <li key={index} className="mb-1 text-gray-700">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No requirements available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(safeGet(industryData, "solutions", [])) ? (
                safeGet(industryData, "solutions", []).map((solution: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4 border">
                    <h3 className="text-xl font-bold mb-2">{safeGet(solution, "title")}</h3>
                    <ul className="list-disc pl-5">
                      {Array.isArray(safeGet(solution, "items", [])) ? (
                        safeGet(solution, "items", []).map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="mb-1 text-gray-700">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No items available</li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-500">No solutions available</div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.isArray(safeGet(industryData, "features", [])) ? (
                safeGet(industryData, "features", []).map((feature: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4 border">
                    <h3 className="text-xl font-bold mb-2">{safeGet(feature, "title")}</h3>
                    <p className="mb-4 text-gray-700">{safeGet(feature, "description")}</p>
                    {safeGet(feature, "image") && (
                      <div className="rounded overflow-hidden">
                        <img
                          src={safeGet(feature, "image") || "/placeholder.svg"}
                          alt={safeGet(feature, "title")}
                          className="w-full h-auto max-h-[200px] object-cover"
                          onError={(e) => {
                            console.error("Error loading feature image:", safeGet(feature, "image"))
                            e.currentTarget.src = "/placeholder.svg?height=200&width=300"
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-500">No features available</div>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            <div className="space-y-4">
              {Array.isArray(safeGet(industryData, "faq", [])) ? (
                safeGet(industryData, "faq", []).map((item: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow p-4 border">
                    <h3 className="text-xl font-bold mb-2">{safeGet(item, "question")}</h3>
                    <p className="text-gray-700">{safeGet(item, "answer")}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No FAQ available</div>
              )}
            </div>
          </div>
        </div>
      )
    } catch (e) {
      console.error("Error rendering preview:", e)
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error Rendering Preview</h2>
          <p className="mb-4">There was an error rendering the preview. Please check the console for details.</p>
          <pre className="bg-gray-100 p-4 rounded text-left overflow-auto max-h-[300px]">
            {JSON.stringify(industryData, null, 2)}
          </pre>
        </div>
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[90vw] w-[90vw] max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>Industry Preview</DialogTitle>
            <Tabs defaultValue="desktop" value={viewMode} onValueChange={setViewMode} className="ml-auto">
              <TabsList>
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="tablet">
                  <Tablet className="h-4 w-4 mr-2" />
                  Tablet
                </TabsTrigger>
                <TabsTrigger value="desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DialogHeader>

        <div
          className="overflow-auto p-4 bg-gray-100"
          style={{
            maxHeight: "calc(90vh - 180px)",
            height: "calc(90vh - 180px)",
          }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading preview...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Preview</h3>
                <p className="text-red-700">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : industryData ? (
            <div
              className="bg-white mx-auto border rounded-lg shadow-sm overflow-auto"
              style={{ width: getPreviewWidth() }}
            >
              <TabsContent value="desktop" className="mt-0">
                {renderPreview()}
              </TabsContent>

              <TabsContent value="tablet" className="mt-0">
                {renderPreview()}
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                {renderPreview()}
              </TabsContent>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No industry data available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
