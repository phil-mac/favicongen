import Head from "next/head";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );

  const utils = api.useUtils();

  const createCheckoutSession = api.checkout.create.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Error creating checkout session:", error);
      setIsLoading(false);
    },
  });

  const generateFavicon = api.favicon.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedImageUrl(data.imageUrl);
      setIsLoading(false);
      void utils.credits.getBalance.invalidate();
    },
    onError: (error) => {
      console.error("Error generating favicon:", error);
      setIsLoading(false);
    },
  });

  const { data: creditBalance, isLoading: isBalanceLoading } =
    api.credits.getBalance.useQuery();

  const handleCheckout = async () => {
    setIsLoading(true);
    createCheckoutSession.mutate();
  };

  const handleGenerateFavicon = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    generateFavicon.mutate({ prompt });
  };

  return (
    <>
      <Head>
        <title>Dashboard - FaviconGenAI</title>
        <meta name="description" content="Manage your AI-generated favicons" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col">
          <h2 className="mb-4 mt-8 px-4 text-2xl font-bold">Dashboard</h2>
          <div className="mb-4 px-4">
            <p>
              Your credit balance:{" "}
              {isBalanceLoading ? "Loading..." : `${creditBalance} credits`}
            </p>
          </div>

          <div className="mb-8 px-4">
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              variant="default"
              className="mb-4"
            >
              {isLoading ? "Processing..." : "Buy credits"}
            </Button>
          </div>

          <div className="mb-8 px-4">
            <h3 className="mb-4 text-xl font-semibold">Generate New Favicon</h3>
            <div className="flex max-w-md gap-4">
              <Input
                type="text"
                placeholder="Describe your favicon..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
              <Button
                onClick={handleGenerateFavicon}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {generatedImageUrl && (
            <div className="px-4">
              <h3 className="mb-4 text-xl font-semibold">Generated Favicon</h3>
              <div className="relative h-32 w-32">
                <img
                  src={generatedImageUrl}
                  alt="Generated favicon"
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
