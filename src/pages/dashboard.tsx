import Head from "next/head";
import { Header } from "~/components/Header";
import { api } from "~/utils/api";
import { useState } from "react";
import { Download, Loader2, Plus, Store } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );

  const utils = api.useUtils();
  const { data: creditBalance, isLoading: isBalanceLoading } =
    api.credits.getBalance.useQuery();

  const createCheckoutSession = api.checkout.create.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error("Error creating checkout session:", error);
      setIsGenerating(false);
    },
  });

  const generateFavicon = api.favicon.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedImageUrl(data.imageUrl);
      setIsGenerating(false);
      void utils.credits.getBalance.invalidate();
    },
    onError: (error) => {
      console.error("Error generating favicon:", error);
      setIsGenerating(false);
    },
  });

  const handleGenerateFavicon = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    generateFavicon.mutate({ prompt });
  };

  return (
    <>
      <Head>
        <title>Dashboard - FaviconGenAI</title>
        <meta
          name="description"
          content="Generate unique favicons for your websites"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto max-w-5xl p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-stone-500 dark:text-stone-400">
                Generate unique favicons for your websites
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">
                Credits remaining:{" "}
                <span className="text-stone-900 dark:text-stone-50">
                  {isBalanceLoading ? "..." : creditBalance}
                </span>
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Buy Credits
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Purchase Credits</DialogTitle>
                    <DialogDescription>
                      Choose a credit package to continue generating favicons.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Select defaultValue="10">
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 credits - $4.20</SelectItem>
                        <SelectItem
                          value="110"
                          disabled
                          className="text-stone-400"
                        >
                          110 credits - $42.0 (Coming soon)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      className="w-full"
                      onClick={() => createCheckoutSession.mutate()}
                      disabled={createCheckoutSession.isPending}
                    >
                      {createCheckoutSession.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Redirecting to checkout...
                        </>
                      ) : (
                        <>
                          <Store className="mr-2 h-4 w-4" />
                          Purchase Now
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Favicon</CardTitle>
                <CardDescription>
                  Enter a prompt to generate a unique favicon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input
                      id="prompt"
                      placeholder="e.g. a white cat on shelf"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleGenerateFavicon}
                    disabled={isGenerating || !prompt.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Favicon</CardTitle>
                <CardDescription>
                  Preview and download your favicon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex aspect-square items-center justify-center rounded-lg border border-stone-200 bg-stone-100/50 dark:border-stone-800 dark:bg-stone-800/50">
                  {generatedImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={generatedImageUrl}
                      alt="Generated favicon"
                      className="h-32 w-32 object-contain"
                    />
                  ) : (
                    <div className="text-sm text-stone-500 dark:text-stone-400">
                      No favicon generated yet
                    </div>
                  )}
                </div>
              </CardContent>
              {generatedImageUrl && (
                <CardFooter>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Favicon
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
