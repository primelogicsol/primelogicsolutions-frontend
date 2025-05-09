import { getTechnologyById } from "@/lib/technologies"
import { notFound } from "next/navigation"
import Image from "next/image"

interface TechnologyPreviewIframeProps {
  params: {
    id: string
  }
  searchParams: {
    t?: string
  }
}

export default async function TechnologyPreviewIframe({ params, searchParams }: TechnologyPreviewIframeProps) {
  const timestamp = searchParams.t || Date.now().toString()
  const technology = await getTechnologyById(params.id)

  if (!technology) {
    notFound()
  }

  // Add timestamp to URL to prevent caching
  const addTimestampToUrl = (url: string): string => {
    if (!url) return url

    // Don't add timestamp to external URLs or data URLs
    if (url.startsWith("http") || url.startsWith("data:")) return url

    // Add timestamp as query parameter
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}t=${timestamp}`
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden bg-gray-100 h-64 mb-6">
          {technology.image ? (
            <Image
              src={addTimestampToUrl(technology.image) || "/placeholder.svg"}
              alt={technology.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=400&width=800"
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl font-bold">{technology.title}</h1>
              <p className="text-lg mt-2">{technology.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          {technology.description?.intro?.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
          {technology.description?.conclusion && <p className="font-medium">{technology.description.conclusion}</p>}
        </div>

        {/* Features */}
        {technology.features && technology.features.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {technology.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  {feature.details && feature.details.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {technology.benefits && technology.benefits.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {technology.benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {technology.techStack && technology.techStack.stack && technology.techStack.stack.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">{technology.techStack.title || "Technology Stack"}</h2>
            <div className="space-y-6">
              {technology.techStack.stack.map((stack, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">{stack.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {technology.services && technology.services.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            <div className="space-y-4">
              {technology.services.map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-l-4 border-[#003087]">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        {technology.faq && technology.faq.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {technology.faq.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
