import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Bot } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

export function Header() {
  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <Bot className="h-6 w-6 text-stone-900 dark:text-stone-50" />
        <span className="ml-2 text-lg font-bold">FaviconGenAI</span>
      </Link>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList>
          <SignedIn>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </SignedIn>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-4">
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
