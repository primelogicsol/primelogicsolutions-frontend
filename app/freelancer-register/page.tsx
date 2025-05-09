"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import axios from "axios"

// Define the schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  yourPortfolio: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject1: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject2: z.string().url({ message: "Please enter a valid URL." }),
  yourTopProject3: z.string().url({ message: "Please enter a valid URL." }),
  detail: z.string().min(10, { message: "Details must be at least 10 characters." }),
  niche: z.string().min(2, { message: "Please specify your skills/niche." }),
  address: z.string().min(2, { message: "Please enter your address." }),
  country: z.string().min(2, { message: "Please enter your country." }),
  yearsOfExperience: z.string().min(1, { message: "Please enter your years of experience." }),
})

// Server action to handle form submission
async function submitFreelancerRegistration(formData: z.infer<typeof formSchema>) {
  console.log(typeof formData.yearsOfExperience)
  try {
    const response = await axios.post(
      "https://api.primelogicsol.com/api/v1/freelancer/getFreeLancerJoinUsRequest",
      formData,
    )

    // if (!response.ok) {
    //   const errorData = await response.json()
    //   throw new Error(errorData.error || "Failed to submit registration")
    // }

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error occurred" }
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      yourPortfolio: "",
      yourTopProject1: "",
      yourTopProject2: "",
      yourTopProject3: "",
      detail: "",
      niche: "",
      address: "",
      country: "",
      yearsOfExperience: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await submitFreelancerRegistration(values)

      if (!result.success) {
        throw new Error(result.error || "Something went wrong")
      }

      toast({
        title: "Registration successful!",
        description: "Your application has been submitted.",
      })
      // Removed the redirect line
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Something went wrong.",
        description: "Your application couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4 flex justify-center">
            <Image src="/assets/logo6.png" alt="Company Logo" width={150} height={60} priority />
          </div>
          <CardTitle className="text-2xl font-bold text-[#003087]">Freelancer Registration</CardTitle>
          <CardDescription>Fill out the form below to register as a freelancer</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yourPortfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Portfolio URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourportfolio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="yourTopProject1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Live Project </FormLabel>
                      <FormControl>
                        <Input placeholder="https://project1.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yourTopProject2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Github Project </FormLabel>
                      <FormControl>
                        <Input placeholder="https://project2.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yourTopProject3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Own Project</FormLabel>
                      <FormControl>
                        <Input placeholder="https://project3.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="niche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Skills/Niche</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Node.js, UI/UX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#003087] font-medium">Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#003087] font-medium">Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us why you want to join and any additional information"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#003087] hover:bg-[#002266] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">
            By submitting this form, you agree to our terms and conditions.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
