import { Bot, Globe, Image } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Header } from "~/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>FaviconGenAI</title>
        <meta
          name="description"
          content="Generate a favicon for your website using AI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <section className="flex w-full flex-1 items-center py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Generate AI-Powered Favicons
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Create unique favicons for your website using our advanced
                    AI. Just enter your domain and we&apos;ll do the rest.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Enter your website domain"
                      type="text"
                    />
                    <Button type="submit">Generate</Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We&apos;ll crawl your website to create a favicon that
                    matches your style.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Globe className="h-12 w-12 text-stone-900 dark:text-stone-50" />
                  <h2 className="text-xl font-bold">Website Crawling</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our AI analyzes your website&apos;s design and content to
                    create a matching favicon.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Bot className="h-12 w-12 text-stone-900 dark:text-stone-50" />
                  <h2 className="text-xl font-bold">AI-Powered Generation</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Advanced algorithms ensure your favicon is unique and
                    represents your brand.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Image className="h-12 w-12 text-stone-900 dark:text-stone-50" />
                  <h2 className="text-xl font-bold">Multiple Formats</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get your favicon in various sizes and formats for all
                    devices and browsers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Affordable Pricing
                  </h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get started with our introductory offer and create stunning
                    favicons for your websites.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <div
                    className="rounded-lg border border-stone-200 bg-white text-stone-950 shadow-sm dark:border-stone-800 dark:bg-stone-950 dark:text-stone-50"
                    data-v0-t="card"
                  >
                    <div className="flex flex-col space-y-1.5 p-6">
                      <h3 className="text-2xl font-semibold leading-none tracking-tight">
                        Starter Pack
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Perfect for trying out our service
                      </p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <div className="flex items-baseline text-5xl font-bold">
                        $1
                        <span className="ml-1 text-xl font-normal text-stone-500 dark:text-stone-400">
                          /5 generations
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <Button className="w-full">Get Started</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 AI Favicon. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
