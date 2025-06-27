import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Play, PiggyBank } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Trackly</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          
          <Link href="/auth/signin">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Get Started Free</Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Track Your
                  <br />
                  <span className="text-gray-400">Spending</span>
                  <br />
                  Effortlessly
                </h1>

                <p className="text-xl text-gray-400 max-w-lg">
                  Manage your expenses with ease using our intuitive, real-time tracker.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                      Start Tracking Now
                    </Button>
                  </Link>
                  
                </div>
              </div>

              
            </div>

            {/* Right Content - Mobile Mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gray-900 rounded-[2.5rem] p-6 relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white text-sm mb-8">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 border border-white rounded-sm">
                          <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <Menu className="w-6 h-6 text-white" />
                        <span className="text-white font-medium">Home</span>
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                      </div>

                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="text-gray-400 text-sm">Total net worth</div>
                            <div className="flex items-center space-x-3">
                              <span className="text-white text-3xl font-bold">$324,750</span>
                              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">+2.8%</span>
                            </div>
                            <div className="text-gray-400 text-sm">
                              {"You've increased your net worth by "}
                              <span className="text-white font-medium">$8,950</span>
                              {" this month. Great job!"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          Week
                        </Button>
                        <Button size="sm" className="bg-gray-700 text-white">
                          Month
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          Year
                        </Button>
                      </div>

                      <div className="relative h-32 bg-gray-800 rounded-lg p-4">
                        <div className="absolute bottom-4 left-4 text-white font-medium">$33,200</div>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120">
                          <path d="M20 80 Q80 60 120 70 T220 40 T280 30" stroke="#10b981" strokeWidth="2" fill="none" />
                          <circle cx="220" cy="40" r="4" fill="#10b981" />
                        </svg>
                      </div>

                      <div className="flex space-x-3">
                        <Button className="flex-1 bg-gray-700 text-white">Withdraw</Button>
                        <Button className="flex-1 bg-blue-600 text-white">Invest now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
