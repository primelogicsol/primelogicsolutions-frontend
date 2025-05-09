"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Plus, Trash, Eye } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndustryPreview } from "@/components/industry-preview"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the schema for industry form validation
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(1, {
    message: "Slug is required.",
  }),
  subtitle: z.string().min(1, {
    message: "Subtitle is required.",
  }),
  image: z.string().optional(),
  parentIndustry: z.string().optional(),
  isPublished: z.boolean().default(false),
  status: z.string().optional().default("draft"),
  description: z.object({
    intro: z.array(z.string()),
    conclusion: z.string(),
  }),
  industryStatus: z
    .object({
      title: z.string().optional(),
      items: z.array(z.string()),
    })
    .optional(),
  challenges: z.array(z.string()),
  requirements: z.array(z.string()).optional(),
  solutions: z.array(
    z.object({
      title: z.string(),
      items: z.array(z.string()),
    }),
  ),
  benefits: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
    }),
  ),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

export function IndustryForm({ id }: { id?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [industryData, setIndustryData] = useState<any>(null)
  const [isIndustryLoading, setIsIndustryLoading] = useState(!!id)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [featureImagePreviews, setFeatureImagePreviews] = useState<{ [key: number]: string }>({})
  const { toast } = useToast()

  // Load industry data if editing
  useEffect(() => {
    async function loadIndustry() {
      if (id) {
        try {
          setIsIndustryLoading(true)
          console.log("IndustryForm: Loading industry with ID:", id)

          const response = await fetch(`/api/industries/${id}`)

          if (!response.ok) {
            throw new Error(`Failed to fetch industry: ${response.statusText}`)
          }

          const industry = await response.json()
          console.log("IndustryForm: Industry data loaded:", industry)

          if (industry) {
            // Ensure the industry has all required properties
            setIndustryData({
              ...industry,
              id: industry.id || industry._id,
              description: industry.description || { intro: [], conclusion: "" },
              industryStatus: industry.industryStatus || { title: "", items: [] },
              challenges: industry.challenges || [],
              requirements: industry.requirements || [],
              solutions: industry.solutions || [],
              benefits: industry.benefits || [],
              features: industry.features || [],
              faq: industry.faq || [],
            })

            // Set image preview if image exists
            if (industry.image) {
              setImagePreview(industry.image)
            }

            // Set feature image previews
            if (industry.features && industry.features.length > 0) {
              const previews: { [key: number]: string } = {}
              industry.features.forEach((feature: any, index: number) => {
                if (feature.image) {
                  previews[index] = feature.image
                }
              })
              setFeatureImagePreviews(previews)
            }
          } else {
            setError("Industry not found")
            console.error("IndustryForm: Industry not found with ID:", id)
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : "Unknown error")
          console.error("IndustryForm: Error loading industry:", error)
          toast({
            title: "Error",
            description: "Failed to load industry data",
            variant: "destructive",
          })
        } finally {
          setIsIndustryLoading(false)
        }
      }
    }

    loadIndustry()
  }, [id, toast])

  // Initialize form with default values
  const defaultValues: FormValues = {
    title: "",
    slug: "",
    subtitle: "",
    image: "",
    parentIndustry: "",
    isPublished: false,
    status: "draft",
    description: {
      intro: [""],
      conclusion: "",
    },
    industryStatus: {
      title: "",
      items: [""],
    },
    challenges: [""],
    requirements: [""],
    solutions: [
      {
        title: "",
        items: [""],
      },
    ],
    benefits: [
      {
        title: "",
        description: "",
      },
    ],
    features: [
      {
        title: "",
        description: "",
        image: "",
      },
    ],
    faq: [
      {
        question: "",
        answer: "",
      },
    ],
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Update form when industry data changes
  useEffect(() => {
    if (industryData) {
      console.log("IndustryForm: Updating form with industry data:", industryData)
      form.reset({
        title: industryData.title || "",
        slug: industryData.slug || "",
        subtitle: industryData.subtitle || "",
        image: industryData.image || "",
        parentIndustry: industryData.parentIndustry || "",
        isPublished: industryData.isPublished || false,
        status: industryData.status || "draft",
        description: {
          intro: industryData.description?.intro || [""],
          conclusion: industryData.description?.conclusion || "",
        },
        industryStatus: industryData.industryStatus || { title: "", items: [""] },
        challenges: industryData.challenges || [""],
        requirements: industryData.requirements || [""],
        solutions: industryData.solutions || [{ title: "", items: [""] }],
        benefits: industryData.benefits || [{ title: "", description: "" }],
        features: industryData.features || [{ title: "", description: "", image: "" }],
        faq: industryData.faq || [{ question: "", answer: "" }],
      })
    }
  }, [industryData, form])

  // Handle image preview updates
  const handleImagePreview = (url: string) => {
    setImagePreview(url)
  }

  // Handle feature image preview updates
  const handleFeatureImagePreview = (index: number, url: string) => {
    setFeatureImagePreviews((prev) => ({
      ...prev,
      [index]: url,
    }))
  }

  async function onSubmit(values: FormValues) {
    setIsLoading(true)

    try {
      // Make sure all arrays have at least empty values to prevent null errors
      const formattedValues = {
        ...values,
        description: {
          intro: values.description.intro || [],
          conclusion: values.description.conclusion || "",
        },
        industryStatus: values.industryStatus || { title: "", items: [] },
        challenges: values.challenges || [],
        requirements: values.requirements || [],
        solutions: values.solutions || [],
        benefits: values.benefits || [],
        features: values.features || [],
        faq: values.faq || [],
      }

      const url = id ? `/api/industries/${id}` : "/api/industries"
      const method = id ? "PUT" : "POST"

      console.log(`IndustryForm: ${id ? "Updating" : "Creating"} industry with URL:`, url)
      console.log("IndustryForm: Request method:", method)
      console.log("IndustryForm: Request data:", formattedValues)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedValues),
      })

      const responseData = await response.json().catch(() => ({}))

      if (!response.ok) {
        console.error("Error response:", responseData)
        throw new Error(`Failed to ${id ? "update" : "create"} industry: ${responseData.error || response.statusText}`)
      }

      toast({
        title: "Success",
        description: `Industry ${id ? "updated" : "created"} successfully`,
      })

      router.push("/admin/industries")
    } catch (error) {
      console.error(`Error ${id ? "updating" : "creating"} industry:`, error)
      toast({
        title: "Error",
        description: `Failed to ${id ? "update" : "create"} industry: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to add an item to an array field
  function addArrayItem(fieldName: string, parentIndex?: number) {
    if (fieldName === "description.intro") {
      const intro = [...form.getValues("description.intro"), ""]
      form.setValue("description.intro", intro)
    } else if (fieldName === "industryStatus.items") {
      const items = [...(form.getValues("industryStatus")?.items || []), ""]
      form.setValue("industryStatus.items", items)
    } else if (fieldName === "challenges") {
      const items = [...form.getValues("challenges"), ""]
      form.setValue("challenges", items)
    } else if (fieldName === "requirements") {
      const items = [...(form.getValues("requirements") || []), ""]
      form.setValue("requirements", items)
    } else if (fieldName === "solutions") {
      const items = [...form.getValues("solutions"), { title: "", items: [""] }]
      form.setValue("solutions", items)
    } else if (fieldName === "solutions.items" && parentIndex !== undefined) {
      const solutions = [...form.getValues("solutions")]
      solutions[parentIndex].items = [...solutions[parentIndex].items, ""]
      form.setValue("solutions", solutions)
    } else if (fieldName === "benefits") {
      const items = [...form.getValues("benefits"), { title: "", description: "" }]
      form.setValue("benefits", items)
    } else if (fieldName === "features") {
      const items = [...form.getValues("features"), { title: "", description: "", image: "" }]
      form.setValue("features", items)
    } else if (fieldName === "faq") {
      const items = [...form.getValues("faq"), { question: "", answer: "" }]
      form.setValue("faq", items)
    }
  }

  // Helper function to remove an item from an array field
  function removeArrayItem(fieldName: string, index: number, parentIndex?: number) {
    if (fieldName === "description.intro") {
      const intro = [...form.getValues("description.intro")]
      intro.splice(index, 1)
      form.setValue("description.intro", intro)
    } else if (fieldName === "industryStatus.items") {
      const industryStatus = { ...form.getValues("industryStatus") }
      industryStatus.items.splice(index, 1)
      form.setValue("industryStatus", industryStatus)
    } else if (fieldName === "challenges") {
      const items = [...form.getValues("challenges")]
      items.splice(index, 1)
      form.setValue("challenges", items)
    } else if (fieldName === "requirements") {
      const items = [...(form.getValues("requirements") || [])]
      items.splice(index, 1)
      form.setValue("requirements", items)
    } else if (fieldName === "solutions") {
      const items = [...form.getValues("solutions")]
      items.splice(index, 1)
      form.setValue("solutions", items)
    } else if (fieldName === "solutions.items" && parentIndex !== undefined) {
      const solutions = [...form.getValues("solutions")]
      solutions[parentIndex].items.splice(index, 1)
      form.setValue("solutions", solutions)
    } else if (fieldName === "benefits") {
      const items = [...form.getValues("benefits")]
      items.splice(index, 1)
      form.setValue("benefits", items)
    } else if (fieldName === "features") {
      const items = [...form.getValues("features")]
      items.splice(index, 1)
      // Also remove the feature image preview
      setFeatureImagePreviews((prev) => {
        const newPreviews = { ...prev }
        delete newPreviews[index]
        // Reindex the previews
        const reindexed: { [key: number]: string } = {}
        Object.keys(newPreviews).forEach((key) => {
          const numKey = Number.parseInt(key)
          if (numKey > index) {
            reindexed[numKey - 1] = newPreviews[numKey]
          } else {
            reindexed[numKey] = newPreviews[numKey]
          }
        })
        return reindexed
      })
      form.setValue("features", items)
    } else if (fieldName === "faq") {
      const items = [...form.getValues("faq")]
      items.splice(index, 1)
      form.setValue("faq", items)
    }
  }

  if (isIndustryLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading industry data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-destructive text-xl mb-4">Error loading industry</div>
        <p className="mb-4">{error}</p>
        <Button onClick={() => router.push("/admin/industries")}>Back to Industries</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{id ? "Edit Industry" : "Create New Industry"}</h2>
          {id && (
            <div className="flex items-center space-x-2">
              <IndustryPreview industryId={id} industry={form.getValues()}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </IndustryPreview>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-7">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Industry title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="industry-slug" {...field} />
                    </FormControl>
                    <FormDescription>The URL path for this industry</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Industry subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/placeholder.svg?height=400&width=800"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          handleImagePreview(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>The URL for the industry image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="flex flex-col">
                  <FormLabel>Image Preview</FormLabel>
                  <div className="mt-2 border rounded-md overflow-hidden h-[150px] bg-gray-50 flex items-center justify-center">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        console.error("Failed to load image preview:", imagePreview)
                        e.currentTarget.src = "/placeholder.svg?height=150&width=300"
                        toast({
                          title: "Image Error",
                          description: "Could not load image preview. Please check the URL.",
                          variant: "destructive",
                        })
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="parentIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Industry (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Parent industry name" {...field} />
                  </FormControl>
                  <FormDescription>If this is a sub-industry, enter the parent industry name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Introduction Paragraphs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("description.intro").map((paragraph, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`description.intro.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Textarea placeholder="Introduction paragraph" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("description.intro", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("description.intro")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Paragraph
                </Button>
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="description.conclusion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conclusion</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Conclusion paragraph" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardHeader>
                <CardTitle>Industry Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="industryStatus.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Industry Status Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("industryStatus")?.items?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`industryStatus.items.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Status item" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("industryStatus.items", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("industryStatus.items")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Status Item
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Challenges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("challenges").map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`challenges.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Challenge" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("challenges", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("challenges")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Challenge
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("requirements")?.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name={`requirements.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Requirement" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem("requirements", index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Requirement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="solutions" className="space-y-4">
            {form.watch("solutions").map((solution, solutionIndex) => (
              <Card key={solutionIndex} className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Solution {solutionIndex + 1}</CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem("solutions", solutionIndex)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`solutions.${solutionIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solution Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Solution title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Solution Items</FormLabel>
                    {solution.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <FormField
                          control={form.control}
                          name={`solutions.${solutionIndex}.items.${itemIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Solution item" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("solutions.items", itemIndex, solutionIndex)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem("solutions.items", solutionIndex)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={() => addArrayItem("solutions")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Solution
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("benefits").map((benefit, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Benefit {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("benefits", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`benefits.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Benefit title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`benefits.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Benefit description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("benefits")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Benefit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("features").map((feature, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Feature {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("features", index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`features.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Feature title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`features.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Feature description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`features.${index}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="/placeholder.svg?height=200&width=300"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  handleFeatureImagePreview(index, e.target.value)
                                }}
                              />
                            </FormControl>
                            <FormDescription>URL for feature image</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {featureImagePreviews[index] && (
                        <div className="mt-2 border rounded-md overflow-hidden h-[100px] bg-gray-50 flex items-center justify-center">
                          <img
                            src={featureImagePreviews[index] || "/placeholder.svg"}
                            alt="Feature preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              console.error("Failed to load feature image preview:", featureImagePreviews[index])
                              e.currentTarget.src = "/placeholder.svg?height=100&width=200"
                              toast({
                                title: "Image Error",
                                description: "Could not load feature image preview. Please check the URL.",
                                variant: "destructive",
                              })
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("features")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.watch("faq").map((faq, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">FAQ {index + 1}</h4>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("faq", index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormField
                        control={form.control}
                        name={`faq.${index}.question`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Question</FormLabel>
                            <FormControl>
                              <Input placeholder="FAQ question" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`faq.${index}.answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answer</FormLabel>
                            <FormControl>
                              <Textarea placeholder="FAQ answer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("faq")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add FAQ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <FormDescription>Make this industry visible to visitors</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Set the current status of this industry</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {id ? "Update Industry" : "Create Industry"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
