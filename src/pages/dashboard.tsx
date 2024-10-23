import Head from "next/head";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
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

  const { data: creditBalance, isLoading: isBalanceLoading } =
    api.credits.getBalance.useQuery();

  const handleCheckout = async () => {
    setIsLoading(true);
    createCheckoutSession.mutate();
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
          <p className="mb-4 px-4">Your generated favicons will appear here.</p>
          <div className="px-4">
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              variant="default"
            >
              {isLoading ? "Processing..." : "Buy credits"}
            </Button>
          </div>
        </main>
      </div>
    </>
  );
}
