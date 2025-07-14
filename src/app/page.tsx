import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CameraIcon, ShareIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <CameraIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Frameport</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Features
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Button>
              <Button variant="outline">
                Log In
              </Button>
              <Button>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Modern Photo Sharing
              <span className="text-primary-600"> for Photographers</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Share your work with clients, collect feedback, and deliver photos with a professional 
              platform designed for photographers. Mobile-first, secure, and beautifully simple.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Free Trial
              </Button>
              <a href="/gallery">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  View Gallery Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to share photos professionally
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Built for photographers who want to deliver exceptional client experiences
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Mobile-First Design</CardTitle>
                <CardDescription>
                  Native touch gestures, responsive layouts, and PWA capabilities for seamless mobile experience
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <ShareIcon className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Secure Sharing</CardTitle>
                <CardDescription>
                  Password-protected links, expiration dates, and granular permissions for complete control
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Security</CardTitle>
                <CardDescription>
                  GDPR compliant, encrypted storage, and enterprise-grade security for your valuable work
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your photo sharing?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Join thousands of photographers who trust Frameport with their client work
            </p>
            <div className="mt-10">
              <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-primary-50 border-white px-8 py-4 text-lg">
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CameraIcon className="h-6 w-6 text-primary-600" />
                <span className="ml-2 text-lg font-semibold text-gray-900">Frameport</span>
              </div>
              <p className="text-sm text-gray-600">
                © 2024 Frameport. Built for photographers, by photographers.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}