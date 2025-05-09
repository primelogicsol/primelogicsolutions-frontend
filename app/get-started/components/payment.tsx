"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Check, Download, FileText, Lock, CreditCard, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Appointment from "@/components/home/appointment"

interface ProceedOptionsProps {
  projectData?: any
  onUpdate?: (data: any) => void
}

export default function ProceedOptions({ projectData, onUpdate }: ProceedOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)

    if (onUpdate) {
      onUpdate({
        selectedOption: option,
        completed: false,
      })
    }
  }

  // Handle proceed button click
  const handleProceed = () => {
    if (selectedOption === "secure") {
      setShowPaymentModal(true)
    } else if (selectedOption === "quote") {
      // Simulate PDF download
      setTimeout(() => {
        const link = document.createElement("a")
        link.href = "/project-quote.pdf" // This would be a real PDF in production
        link.download = "Project_Quote.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        if (onUpdate) {
          onUpdate({
            selectedOption,
            completed: true,
            action: "downloaded_quote",
          })
        }
      }, 500)
    } else if (selectedOption === "consultation") {
      // We'll use the Link component instead of this window.open
      if (onUpdate) {
        onUpdate({
          selectedOption,
          completed: true,
          action: "opened_calendar",
        })
      }
    }
  }

  // Handle payment submission
  const handlePaymentSubmit = () => {
    setProcessingPayment(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false)
      setPaymentComplete(true)

      if (onUpdate) {
        onUpdate({
          selectedOption,
          completed: true,
          action: "completed_payment",
          paymentMethod,
        })
      }

      // Close modal after showing success for a moment
      setTimeout(() => {
        setShowPaymentModal(false)
      }, 2000)
    }, 2000)
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">You're Almost There — Choose Your Path Forward</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to proceed with your project. We're ready to support you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Option 1: Secure My Project */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I'm Ready to Start</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "secure" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("secure")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "secure" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Lock className="h-5 w-5" />
                  </div>
                  {selectedOption === "secure" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Secure My Project</CardTitle>
                <CardDescription>Proceed to Payment</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Lock in your project now with a 25% deposit. Your project will be prioritized in our queue.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <Image src="/assets/visa-icon.png" alt="Visa" width={20} height={12} />
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <Image src="/assets/mastercard-icon.png" alt="Mastercard" width={20} height={12} />
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <Image src="/assets/paypal-icon.png" alt="PayPal" width={20} height={12} />
                  </div>
                  <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <Image src="/assets/upi-icon.png" alt="UPI" width={20} height={12} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-7">
                <p className="text-xs text-gray-500">Secure payment gateway • 100% money-back guarantee</p>
              </CardFooter>
            </Card>
          </div>

          {/* Option 2: Request Formal Quote */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I Want to Compare Options</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "quote" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("quote")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "quote" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  {selectedOption === "quote" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Request Formal Quote</CardTitle>
                <CardDescription>Get Instant PDF</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Receive a detailed quote document with project specifications, timeline, and payment terms.
                </p>
                <div className="flex items-center justify-center mt-auto">
                  <div className="w-16 h-16 bg-[#003087] rounded flex items-center justify-center">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <p className="text-xs text-gray-500">PDF format • Share with stakeholders • Valid for 30 days</p>
              </CardFooter>
            </Card>
          </div>

          {/* Option 3: Schedule Free Consultation */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-3 text-[#003087]">I Need More Information</h3>
            <Card
              className={`border-2 transition-all cursor-pointer hover:shadow-md h-full ${
                selectedOption === "consultation" ? "border-[#003087] bg-blue-50" : "border-gray-200"
              }`}
              onClick={() => handleOptionSelect("consultation")}
            >
              <CardHeader className="pb-4">
                <div className="mb-2 flex justify-between items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedOption === "consultation" ? "bg-[#003087] text-white" : "bg-gray-100"
                    }`}
                  >
                    <Calendar className="h-5 w-5" />
                  </div>
                  {selectedOption === "consultation" && <Check className="h-5 w-5 text-[#003087]" />}
                </div>
                <CardTitle className="text-xl">Schedule Free Consultation</CardTitle>
                <CardDescription>Book a Meeting</CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow flex flex-col">
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  Discuss your project with our experts. Get personalized advice and answers to your questions.
                </p>
                <div className="flex items-center justify-center mt-auto">
                  <div className="w-20 h-16 bg-[#003087] rounded flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <p className="text-xs text-gray-500">30-minute call • No obligation • Choose your time slot</p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="flex justify-center mt-8">
          {selectedOption === "consultation" ? (
            <Link href="/consultation" prefetch={true}>
              <Button className="px-8 py-6 text-lg bg-[#FF6B35] hover:bg-[#e55a29] flex items-center gap-2">
                Book Consultation <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleProceed}
              disabled={!selectedOption}
              className="px-8 py-6 text-lg bg-[#FF6B35] hover:bg-[#e55a29] flex items-center gap-2"
            >
              {selectedOption === "secure" && (
                <>
                  Secure My Project <Lock className="ml-2 h-4 w-4" />
                </>
              )}
              {selectedOption === "quote" && (
                <>
                  Download Quote <Download className="ml-2 h-4 w-4" />
                </>
              )}
              {!selectedOption && "Select an Option"}
            </Button>
          )}
        </div>

        {/* Confidence Message */}
        {selectedOption && (
          <div className="text-center mt-4 text-gray-600 italic">
            You confidently choose:
            <span className="font-semibold ml-1">
              {selectedOption === "secure" && "Secure My Project"}
              {selectedOption === "quote" && "Request Formal Quote"}
              {selectedOption === "consultation" && "Schedule Free Consultation"}
            </span>
            {selectedOption === "secure" && <span className="block mt-1">(You're ready.)</span>}
          </div>
        )}

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Secure Your Project</DialogTitle>
              <DialogDescription>
                Complete your 25% deposit payment to secure your project and get started right away.
              </DialogDescription>
            </DialogHeader>

            {!paymentComplete ? (
              <>
                <div className="space-y-4 py-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Project Deposit (25%)</span>
                      <span>$1,350.00</span>
                    </div>
                    <div className="text-sm text-gray-500 mb-4">Based on your project estimate</div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span>Total Due Today</span>
                      <span>$1,350.00</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Select Payment Method</h4>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          Credit/Debit Card
                        </Label>
                        <div className="ml-auto flex gap-1">
                          <Image src="/visa-icon.png" alt="Visa" width={24} height={16} />
                          <Image src="/mastercard-icon.png" alt="Mastercard" width={24} height={16} />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="paypal" id="payment-paypal" />
                        <Label htmlFor="payment-paypal" className="flex items-center gap-2 cursor-pointer">
                          <Image src="/paypal-icon.png" alt="PayPal" width={16} height={16} />
                          PayPal
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 border rounded-lg p-3">
                        <RadioGroupItem value="upi" id="payment-upi" />
                        <Label htmlFor="payment-upi" className="flex items-center gap-2 cursor-pointer">
                          <Image src="/upi-icon.png" alt="UPI" width={16} height={16} />
                          UPI Payment
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center">
                      <h4 className="text-sm font-medium mb-2">Scan QR Code to Pay</h4>
                      <div className="bg-white p-2 rounded-lg mb-3">
                        <Image src="/upi-qr-code.png" alt="UPI QR Code" width={180} height={180} />
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        <p>UPI ID: company@upi</p>
                        <p className="mt-1">Scan with any UPI app: Google Pay, PhonePe, Paytm, etc.</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <input
                          id="card-number"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <input id="expiry" type="text" placeholder="MM/YY" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <input id="cvv" type="text" placeholder="123" className="w-full p-2 border rounded-md" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="name">Name on Card</Label>
                        <input
                          id="name"
                          type="text"
                          placeholder="John Smith"
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handlePaymentSubmit}
                    disabled={processingPayment}
                    className="w-full bg-[#003087] hover:bg-[#002060]"
                  >
                    {processingPayment ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-white rounded-full"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Pay $1,350.00 <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <div className="py-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                <p className="text-gray-600 text-center mb-4">
                  Your project is now secured. We'll be in touch shortly to get started.
                </p>
                <p className="text-sm text-gray-500">
                  Receipt sent to: {projectData?.registerYourself?.businessEmail || "your email"}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
