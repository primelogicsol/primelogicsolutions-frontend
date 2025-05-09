"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"

interface SaveIndicatorProps {
  saving?: boolean
  className?: string
}

export default function SaveIndicator({ saving = false, className = "" }: SaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (saving) {
      // When saving starts, hide the "Saved" indicator
      setShowSaved(false)
    } else {
      // When saving finishes, show the "Saved" indicator
      setShowSaved(true)

      // Hide the indicator after 2 seconds
      const timer = setTimeout(() => {
        setShowSaved(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [saving])

  if (!saving && !showSaved) return null

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-md text-sm flex items-center gap-2 transition-opacity duration-300 ${
        saving
          ? "bg-blue-100 border border-blue-200 text-blue-800"
          : "bg-green-100 border border-green-200 text-green-800"
      } ${className}`}
    >
      {saving ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
          Saving...
        </>
      ) : (
        <>
          <Check className="w-4 h-4" />
          Progress saved
        </>
      )}
    </div>
  )
}
