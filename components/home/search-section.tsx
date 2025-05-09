"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
// Import the ImageWithFallback component
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

export default function SearchSection() {
  const [mainImgSrc, setMainImgSrc] = useState("")
  const [logoImgSrc, setLogoImgSrc] = useState("")
  const [mainImgError, setMainImgError] = useState(false)
  const [logoImgError, setLogoImgError] = useState(false)

  useEffect(() => {
    const baseImagePath = process.env.NEXT_PUBLIC_IMAGE_PATH || "/assets"
    console.log("Image base path in search-section:", baseImagePath)

    // Set initial image paths using environment variable
    setMainImgSrc(`/assets/Image1.png`)
    setLogoImgSrc(`/assets/logo2.png`)
  }, [])

  const handleMainImgError = () => {
    console.log("Main image failed to load:", mainImgSrc)
    setMainImgError(true)
    // Try fallback path
    setMainImgSrc("/assets/Image1.png")
  }

  const handleLogoImgError = () => {
    console.log("Logo image failed to load:", logoImgSrc)
    setLogoImgError(true)
    // Try fallback path
    setLogoImgSrc("/assets/logo2.png")
  }

  // Second fallback handler for direct paths
  const handleMainImgFallbackError = () => {
    console.log("Main image fallback also failed")
    setMainImgSrc("/modern-enterprise-hub.png") // Use placeholder as final fallback
  }

  const handleLogoImgFallbackError = () => {
    console.log("Logo image fallback also failed")
    setLogoImgSrc("/abstract-geometric-logo.png") // Use placeholder as final fallback
  }

  return (
    <motion.section
      className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-[#003087] rounded-2xl overflow-hidden text-white">
          <div className="grid md:grid-cols-3 items-center relative">
            {/* Image Section */}
            <div className="flex col-span-2 relative h-full min-h-[500px] bg-[#003087]">
              {mainImgSrc ? (
                <div className="relative w-full h-full">
                  <ImageWithFallback
                    src={mainImgSrc || "/placeholder.svg?height=500&width=800&query=enterprise"}
                    alt="Enterprise"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 66vw"
                    fallbackSrc="/modern-enterprise-hub.png"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">
                  Enterprise Image
                </div>
              )}

              {/* Info Card */}
              <div className="absolute mb-8 bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#003087] p-4 rounded-xl shadow-lg w-11/12 max-w-md text-center">
                <h3 className="text-lg font-semibold">
                  Our solutions are designed to align with US industry regulations, including GDPR, HIPAA, PCI-DSS, and
                  federal cybersecurity standards.
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-12">
              <div className="flex flex-col items-center text-center">
                {logoImgSrc ? (
                  <div className="relative w-[150px] sm:w-[200px] md:w-[250px] h-[100px] sm:h-[150px] md:h-[200px]">
                    <ImageWithFallback
                      src={logoImgSrc || "/placeholder.svg?height=200&width=250&query=enterprise logo"}
                      alt="Enterprise Logo"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 150px, (max-width: 1200px) 200px, 250px"
                      fallbackSrc="/abstract-geometric-logo.png"
                    />
                  </div>
                ) : (
                  <div className="w-[250px] h-[200px] flex items-center justify-center bg-[#003087] text-white rounded-md">
                    Company Logo
                  </div>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-white mb-8 max-w-3xl mx-auto text-center">
                  At PLS, we master your market&apos;s intricacies. Our experts deliver tailored solutions nationwide,
                  from advanced automation to transformative digital marketing, driving your success.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.section>
  )
}
