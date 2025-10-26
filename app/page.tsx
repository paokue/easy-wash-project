"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone, Clock, MapPin, Shield, Star, Truck, Sparkles, Store, Clock1, WashingMachine } from "lucide-react"

import Header from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"
import { Separator } from "@/components/ui/separator"

const translations = {
  lo: {
    hero: {
      badge: "ບໍລິການຊັກຮີດມືອາຊີບ",
      title: "ຊັກຮີດສະອາດ, ",
      titleHighlight: "ສົ່ງເຖິງບ້ານ",
      description:
        "ກຳນົດເວລາມາເກັບ, ຕິດຕາມການສັ່ງຊື້, ແລະ ຮັບເຄື່ອງນຸ່ງທີ່ສະອາດສົ່ງເຖິງປະຕູບ້ານ. ການດູແລແບບມືອາຊີບສຳລັບເຄື່ອງນຸ່ງຂອງທ່ານດ້ວຍການສັ່ງຊື້ທາງມືຖືທີ່ສະດວກສະບາຍ.",
      downloadApp: "ດາວໂຫຼດແອັບ",
      learnMore: "ຮຽນຮູ້ເພີ່ມເຕີມ",
    },
  },
  en: {
    hero: {
      badge: "Professional Laundry Service",
      title: "Fresh laundry, ",
      titleHighlight: "delivered",
      description:
        "Schedule pickup, track your order, and get fresh, clean laundry delivered to your door. Professional care for your clothes with convenient mobile ordering.",
      downloadApp: "Download App",
      learnMore: "Learn More",
    },
  },
}

export default function LandingPage() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [language, setLanguage] = useState<"en" | "en">("en")
  const [activeSection, setActiveSection] = useState("how-it-works")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const heroBackgrounds = [
    "https://i.pinimg.com/1200x/33/3a/60/333a6009e79964ef5c625db241ce3460.jpg",
    "/clean-folded-laundry-and-fresh-clothes.jpg",
    "/professional-laundry-service-delivery.jpg",
    "https://i.pinimg.com/1200x/6b/83/3c/6b833cba743b0e57a48a37cf86c61d47.jpg",
  ]

  const sectionBackgrounds = {
    "how-it-works": "https://i.pinimg.com/1200x/e0/b5/c4/e0b5c4686448a7672f7f6e51c0238a35.jpg",
    "features": "/premium-laundry-features-background.jpg",
    "shop-owner": "/laundry-shop-business-background.jpg",
  }

  const t = translations[language]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % heroBackgrounds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroBackgrounds.length])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const heroHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const footerHeight = 400

      const isInHero = scrollTop < heroHeight
      const isInFooter = scrollTop + windowHeight > documentHeight - footerHeight
      setShowSidebar(!isInHero && !isInFooter)

      const sections = [
        { id: "how-it-works", element: document.getElementById("how-it-works") },
        { id: "features", element: document.getElementById("features") },
        { id: "cta", element: document.getElementById("cta") },
        { id: "shop-owner", element: document.getElementById("shop-owner") },
      ]

      const newVisibleSections = new Set<string>()
      let currentActiveSection = "how-it-works"

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const sectionTop = rect.top + scrollTop

          // Section is visible if it's in the viewport
          if (rect.top < windowHeight && rect.bottom > 0) {
            newVisibleSections.add(section.id)
          }

          // Section is active when its center is closest to viewport center
          const sectionCenter = sectionTop + rect.height / 2
          const viewportCenter = scrollTop + windowHeight / 2

          if (Math.abs(sectionCenter - viewportCenter) < windowHeight / 2) {
            currentActiveSection = section.id
          }
        }
      }

      setActiveSection(currentActiveSection)
      setVisibleSections(newVisibleSections)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getSectionContent = () => {
    switch (activeSection) {
      case "how-it-works":
        return {
          title: "How Easywash Works",
          description: "Simple, convenient laundry service in just a few taps",
        }
      case "features":
        return {
          title: "Why Choose Easywash?",
          description: "Professional laundry service with premium quality and convenience",
        }
      default:
        return {
          title: "Laundry Made Effortless",
          description: "oin thousands of happy customers who enjoy fresh, clean clothes without lifting a finger. Schedule your pickup today and discover how easy laundry can be.",
        }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentBgIndex ? "opacity-100" : "opacity-0"
                }`}
              style={{
                backgroundImage: `url('${bg}')`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-6 text-xs bg-white/20 text-white border-white/30">
            {t.hero.badge}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            {t.hero.title}
            <span className="text-primary">{t.hero.titleHighlight}</span>
          </h1>
          <p className="text-lg text-white/90 text-balance mb-8 max-w-2xl mx-auto">{t.hero.description}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="text-sm bg-primary">
                <Smartphone className="w-4 h-4 mr-2" />
                {t.hero.downloadApp}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-sm bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              {t.hero.learnMore}
            </Button>
          </div>
        </div>
      </section>

      <div
        className="relative"
        style={{
          backgroundImage: `url('${sectionBackgrounds[activeSection as keyof typeof sectionBackgrounds] || sectionBackgrounds["how-it-works"]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        <div
          className={`fixed left-0 top-0 w-[40%] h-screen hidden sm:flex items-center justify-center z-10 transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="max-w-md px-8 relative z-10">
            <div className="transition-all duration-500 ease-in-out">
              <h2 className="text-4xl font-bold mb-6 text-balance transition-all duration-500 transform text-primary">
                {getSectionContent().title}
              </h2>
              <p className="text-lg text-white/90 text-balance transition-all duration-500 transform">
                {getSectionContent().description}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-0 sm:ml-[40%] w-full sm:w-[60%] relative">
          <div className="relative z-10">
            <section id="how-it-works" className="min-h-screen flex items-center py-12 sm:py-22 px-4 sm:px-12">
              <div
                className={`w-full transition-all duration-1000 ${visibleSections.has("how-it-works") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="grid gap-8">
                  <Card className="text-center transform transition-all duration-700 hover:scale-105 bg-white/30 text-white shadow-md border-0">
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock1 className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Schedule Pickup</CardTitle>
                    </div>
                    <CardContent className="-mt-5">
                      Use our mobile app to schedule a convenient pickup time. Choose your services and special
                      instructions.
                    </CardContent>
                  </Card>

                  <Card className="text-center transform transition-all duration-700 hover:scale-105 bg-white/30 text-white shadow-md border-0">
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <WashingMachine className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Professional Care</CardTitle>
                    </div>
                    <CardContent className="-mt-5">
                      Our experienced team handles your clothes with care using premium detergents and professional
                      equipment.
                    </CardContent>
                  </Card>

                  <Card className="text-center transform transition-all duration-700 hover:scale-105 bg-white/30 text-white shadow-md border-0">
                    <div>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Fast Delivery</CardTitle>
                    </div>
                    <CardContent className="-mt-5">
                      Get your fresh, clean laundry delivered back to you within 24-48 hours. Track your order in
                      real-time.
                    </CardContent>
                  </Card>

                </div>
              </div>
            </section>

            <section id="features" className="min-h-screen flex items-center py-12 sm:py-22 px-4 sm:px-12 ">
              <div
                className={`w-full transition-all duration-1000 ${visibleSections.has("features") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="space-y-12">
                  <div className="flex gap-4 transform transition-all duration-700 hover:translate-x-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl text-white font-semibold mb-2 drop-shadow-lg">24-48 Hour Turnaround</h3>
                      <p className="text-md text-white/90 drop-shadow-lg">Fast, reliable service that fits your schedule</p>
                    </div>
                  </div>
                  <div className="flex gap-4 transform transition-all duration-700 hover:translate-x-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-lg">Convenient Pickup & Delivery</h3>
                      <p className="text-md text-muted-foreground text-white/90 drop-shadow-lg">We come to you - no more trips to the laundromat</p>
                    </div>
                  </div>
                  <div className="flex gap-4 transform transition-all duration-700 hover:translate-x-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-lg">Insured & Guaranteed</h3>
                      <p className="text-md text-muted-foreground text-white/90 drop-shadow-lg">
                        Your clothes are protected with full insurance coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 transform transition-all duration-700 hover:translate-x-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-lg">Premium Quality</h3>
                      <p className="text-md text-muted-foreground text-white/90 drop-shadow-lg">
                        Professional-grade equipment and eco-friendly detergents
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-accent/10 rounded-2xl p-8 text-center mt-12 transform transition-all duration-700 hover:scale-105">
                    <h3 className="text-xl font-semibold mb-4 text-white">Ready to get started?</h3>
                    <p className="text-white text-muted-foreground mb-6">
                      Join thousands of satisfied customers who trust Easywash with their laundry
                    </p>
                    <Button className="w-auto">Download the App</Button>
                  </div>
                </div>
              </div>
            </section>

            <section id="cta" className="min-h-screen flex items-center py-12 sm:py-22 px-4 sm:px-12 ">
              <div
                className={`w-full transition-all duration-1000 ${visibleSections.has("cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="space-y-16">
                  <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 transform transition-all duration-700 hover:scale-105">
                      <Star className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">Trusted by 10,000+ customers</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">Experience the convenience today</h3>
                    <p className="text-lg text-white/90 mb-8 max-w-4xl mx-auto text-balance">
                      Save time, reduce stress, and enjoy professionally cleaned clothes delivered to your door. Join
                      the thousands who have already made the switch to smarter laundry.
                    </p>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-8 mb-16">
                    <div className="text-center transform transition-all duration-700 hover:scale-110">
                      <div className="text-2xl font-bold mb-2 text-white">24-48h</div>
                      <div className="text-lg text-white/60">Average turnaround</div>
                    </div>
                    <div className="text-center transform transition-all duration-700 hover:scale-110">
                      <div className="text-2xl font-bold mb-2 text-white">99.9%</div>
                      <div className="text-sm text-white/60">Customer satisfaction</div>
                    </div>
                    <div className="text-center transform transition-all duration-700 hover:scale-110">
                      <div className="text-2xl font-bold mb-2 text-white">50k+</div>
                      <div className="text-sm text-white/60">Orders completed</div>
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-2xl p-8 mb-16 transform transition-all duration-700 hover:scale-105">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-4 italic text-white">
                      "Easywash has completely transformed my weekly routine. The convenience of pickup and delivery
                      means I have more time for what matters most. The quality is outstanding!"
                    </blockquote>
                    <cite className="text-sm text-white/60">— Sarah M., Regular Customer</cite>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-background relative z-60">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Trusted by 10,000+ customers</span>
          </div>

          <h2 className="text-primary text-xl sm:text-3xl font-bold mb-6 text-balance">Experience the convenience today</h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-4xl mx-auto text-balance">
            Save time, reduce stress, and enjoy professionally cleaned clothes delivered to your door. Join the
            thousands who have already made the switch to smarter laundry.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-12">
            <div className="text-center border p-4 rounded-xl border-primary">
              <div className="text-primary text-md ms:text-2xl font-bold mb-1">24-48h</div>
              <div className="text-md text-muted-foreground">Average turnaround</div>
            </div>
            <div className="text-center border p-4 rounded-xl border-primary">
              <div className="text-primary text-md ms:text-2xl font-bold mb-1">99.9%</div>
              <div className="text-md text-muted-foreground">Customer satisfaction</div>
            </div>
            <div className="text-center border p-4 rounded-xl border-primary">
              <div className="text-primary text-md ms:text-2xl font-bold mb-1">50k+</div>
              <div className="text-md text-muted-foreground">Orders completed</div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center gap-1 mb-4 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg mb-4 italic">
              "Easywash has completely transformed my weekly routine. The convenience of pickup and delivery means I
              have more time for what matters most. The quality is outstanding!"
            </blockquote>
            <cite className="text-sm text-muted-foreground">— Sarah M., Regular Customer</cite>
          </div>

          <Separator />

          <div className="text-center my-12">
            <h3 className="text-primary text-xsl sm:text-2xl font-bold mb-4">Are you a laundry shop owner?</h3>
            <p className="text-md sm:text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
              Join our network of professional laundry shops and grow your business with our platform
            </p>

            <div className="flex gap-4 justify-center">
              <Link href="/auth/shop-login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm bg-transparent transform transition-all duration-300 hover:scale-105 hover:bg-primary"
                >
                  <Store className="w-4 h-4 mr-2" />
                  Shop Login
                </Button>
              </Link>
              <Link href="/auth/shop-register">
                <Button size="lg" className="text-sm transform transition-all duration-300 hover:scale-105">
                  Start Your Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
