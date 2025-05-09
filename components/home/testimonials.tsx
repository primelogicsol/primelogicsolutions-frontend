"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"

const getImagePath = (imageName: string) => {
  const basePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "/assets"
  // Handle cases where basePath might already end with a slash or imageName might start with one
  const separator = basePath.endsWith("/") || imageName.startsWith("/") ? "" : "/"
  return `${basePath}${separator}${imageName.startsWith("/") ? imageName.substring(1) : imageName}`
}

const testimonials = [
  {
    company: "Microsoft",
    logo: ("/assets/Microsoft.png"),
    quote: "PLS ensures agility, securing top talent.",
    author: "Carol Taylor, Director of Content Experience",
    results: [
      { metric: "50% Faster", description: "launch of projects" },
      { metric: "10,000", description: "projects completed" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Providing AI-driven automation, cloud solutions, and software development to optimize business efficiency.",
  },
  {
    classnames: "bg-",
    company: "Google",
    logo: ("/assets/google.jpeg"),
    quote: "Scaling innovation effortlessly with PLS.",
    author: "John Doe, Project Manager",
    results: [
      { metric: "30% Cost Savings", description: "by hiring specialized experts" },
      { metric: "5,000+", description: "professionals engaged worldwide" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Enabling businesses with custom software, IT consulting, and AI-based business intelligence.",
  },
  {
    company: "Amazon",
    logo: ("/assets/Amazon.png"),
    quote: "PLS transforms challenges into seamless execution.",
    author: "Jane Smith, Senior HR Director",
    results: [
      { metric: "3x Productivity", description: "increase in project turnaround time" },
      { metric: "20+ Teams", description: "hiring across different departments" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Specializing in digital transformation, cybersecurity, and cloud-based infrastructure to scale operations.",
  },
  {
    company: "Salesforce",
    logo: ("/assets/salesforce.png"),
    quote: "Optimized workflows drive success with PLS.",
    author: "Mark Johnson, Senior Product Lead",
    results: [
      { metric: "40% Efficiency Boost", description: "in CRM automation" },
      { metric: "7,500+", description: "businesses streamlined with specialized professionals" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Delivering CRM customization, AI-enhanced automation, and enterprise software solutions.",
  },
  {
    company: "CraftLore Open Repository",
    logo: ("/assets/craftlore.png"),
    quote: "PLS scales vision while preserving authenticity.",
    author: "Hamadan Craft Revival Foundation",
    results: [
      { metric: "100% Traceability", description: "Blockchain-secured artisan records" },
      { metric: "5,000+", description: "Artisans supported through open-access knowledge sharing" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Driving innovation with blockchain integration, cloud-based data management, and API-driven solutions.",
  },
  {
    company: "PerfectServe",
    logo: ("/assets/PerfectServe.png"),
    quote: "Industry experts help us enhance guest experiences through seamless digital solutions.",
    author: "Emily Carter, Director of Digital Transformation",
    results: [
      { metric: "25% Increase", description: "in operational efficiency" },
      { metric: "4,000+", description: "Restaurants & Hotels optimized" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Offering hospitality automation, AI-powered customer analytics, and omnichannel marketing solutions.",
  },
  {
    company: "DKC B2B Connect",
    logo:   ("/assets/b2b.png"),
    quote:
      "Our platform revolutionizes Kashmiri craft exports, offering a seamless B2B experience for global businesses.",
    author: "De Koshur Crafts B2B Team",
    results: [
      { metric: "100% Authenticity", description: "Verified GI-certified handicrafts" },
      { metric: "3,000+", description: "International Buyers connected with Kashmiri artisans" },
    ],
    poweredBy:
      "🔹 Powered by Prime Logic Solutions – Supporting B2B e-commerce development, AI-powered business matchmaking, and blockchain-based authentication systems.",
  },
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / slidesPerView))
    }, 8000)

    return () => clearInterval(interval)
  }, [slidesPerView])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / slidesPerView))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(testimonials.length / slidesPerView)) % Math.ceil(testimonials.length / slidesPerView),
    )
  }

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#003087] text-center mb-10">
        Trusted by leading brands and startups
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Testimonials Container */}
        <div className="overflow-hidden w-full max-w-5xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
          >
            {testimonials.map((t, index) => (
              <div key={index} className="w-full flex-shrink-0 px-3" style={{ flex: `0 0 ${100 / slidesPerView}%` }}>
                <div className="rounded-xl p-6 bg-white shadow-md border-4 border-[#003087] transition group hover:bg-[#003087] hover:border-white h-full flex flex-col justify-between">
                  {/* Logo - Always Visible */}
                  <div className="mb-4 bg-transparent flex justify-center">
                    <Image
                      src={t.logo || getImagePath("placeholder.png")}
                      alt={`${t.company} logo`}
                      width={200}
                      height={100}
                      className="transition object-contain"
                      onError={(e) => {
                        console.error(`Failed to load image: ${t.logo}`)
                        // @ts-ignore - TypeScript doesn't know about currentTarget.src
                        e.currentTarget.src = getImagePath("placeholder.png")
                      }}
                    />
                  </div>

                  <blockquote className="text-lg text-gray-800 mb-3 mt-4 text-center group-hover:text-white">
                    {t.quote}
                  </blockquote>
                  <cite className="text-gray-600 block mb-4 mt-4 text-center group-hover:text-white">{t.author}</cite>
                  <div className="border-t border-gray-200 pt-3 group-hover:border-white">
                    <h3 className="text-gray-800 text-sm mb-2 text-center group-hover:text-white">Results</h3>
                    <div className="space-y-2">
                      {t.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-medium text-gray-900 group-hover:text-white">
                            {result.metric}
                          </div>
                          <div className="text-gray-600 text-sm group-hover:text-white">{result.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Powered By */}
                  <p className="text-sm text-gray-500 mt-4 text-center group-hover:text-white">{t.poweredBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </section>

  )
}
