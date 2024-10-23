import Head from "next/head";
import { Header } from "~/components/Header";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <>
      <Head>
        <title>Checkout Success - FaviconGenAI</title>
        <meta name="description" content="Your purchase was successful" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center">
          <h2 className="mb-4 text-3xl font-bold text-green-600">Thank You!</h2>
          <p className="mb-8 text-xl">Your purchase was successful.</p>
          <p className="text-lg">
            You can now access your new features on the{" "}
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              dashboard
            </Link>
            .
          </p>
        </main>
      </div>
    </>
  );
}
