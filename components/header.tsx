import React from "react";
import Link from "next/link";
import { Languages } from "lucide-react";

import { Button } from "./ui/button";

export default function Header() {
   const [language, setLanguage] = React.useState<"lo" | "en">("lo")
   const [headerStyle, setHeaderStyle] = React.useState("transparent")
   const toggleLanguage = () => {
      setLanguage((prev) => (prev === "lo" ? "en" : "lo"))
   }

   const getHeaderClasses = () => {
      switch (headerStyle) {
         case "transparent":
            return "bg-transparent border-transparent"
         case "blur":
            return "bg-black/20 backdrop-blur-md border-white/10"
         case "white":
            return "bg-white/95 backdrop-blur-sm border-border"
         default:
            return "bg-transparent border-transparent"
      }
   }

   React.useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY
         const heroHeight = window.innerHeight
         const windowHeight = window.innerHeight

         if (scrollTop > heroHeight) {
            setHeaderStyle("white")
         } else if (scrollTop > 50) {
            setHeaderStyle("blur")
         } else {
            setHeaderStyle("transparent")
         }

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

               if (rect.top < windowHeight && rect.bottom > 0) {
                  newVisibleSections.add(section.id)
               }

               const sectionCenter = sectionTop + rect.height / 2
               const viewportCenter = scrollTop + windowHeight / 2

               if (Math.abs(sectionCenter - viewportCenter) < windowHeight / 2) {
                  currentActiveSection = section.id
               }
            }
         }

      }

      window.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => window.removeEventListener("scroll", handleScroll)
   }, [])


   return (
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${getHeaderClasses()}`}>
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className={`hidden sm:block text-2xl font-semibold ${headerStyle === "white" ? "text-primary" : "text-white"}`}>
                     Easywash
                  </span>
                  <span className={`block sm:hidden text-2xl font-semibold ${headerStyle === "white" ? "text-foreground" : "text-white"}`}>
                     EW
                  </span>
               </div>
               <div className="flex items-center gap-0 sm:gap-3">
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={toggleLanguage}
                     className={`text-sm ${headerStyle === "white" ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}`}
                  >
                     <Languages className="w-4 h-4" />
                     {language === "lo" ? "English" : "ລາວ"}
                  </Button>
                  <Link href="/auth/login">
                     <Button
                        variant="ghost"
                        size="sm"
                        className={`text-sm ${headerStyle === "white" ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"}`}
                     >
                        Sign In
                     </Button>
                  </Link>
                  <Link href="/auth/register">
                     <Button size="sm" className="text-sm">
                        Get Started
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      </header>

   )
}