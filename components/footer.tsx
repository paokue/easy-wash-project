import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Footer() {
   return (
      <footer className="bg-primary/5 py-12 px-4 border-t border-border relative z-60">
         <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <span className="font-semibold">Easywash</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                     Professional laundry service with convenient pickup and delivery.
                  </p>
               </div>
               <div>
                  <h3 className="font-semibold mb-3">Product</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="hover:text-primary hover:underline">
                        <Link href="/app" className="transition-colors">
                           Customer App
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/shop" className="transition-colors">
                           Shop Dashboard
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/admin" className="transition-colors">
                           Admin Panel
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/pricing" className="transition-colors">
                           Pricing
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="font-semibold mb-3">Support</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="hover:text-primary hover:underline">
                        <Link href="#" className="transition-colors">
                           Help Center
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="#" className="transition-colors">
                           Contact Us
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/policies/quality-guarantee" className="transition-colors">
                           Quality Guarantee
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/policies/damage-policy" className="transition-colors">
                           Damage Policy
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/policies/lost-items" className="transition-colors">
                           Lost Items
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="/policies/cancellation" className="transition-colors">
                           Cancellation
                        </Link>
                     </li>
                  </ul>
               </div>
               <div>
                  <h3 className="font-semibold mb-3">Policies</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="hover:text-primary hover:underline">
                        <Link href="#" className="transition-colors">
                           Privacy Policy
                        </Link>
                     </li>
                     <li className="hover:text-primary hover:underline">
                        <Link href="#" className="transition-colors">
                           Terms
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
            <Separator className="my-8" />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
               <p className="text-sm text-muted-foreground">© 2025 Easywash. All rights reserved.</p>
            </div>
         </div>
      </footer>
   )
}