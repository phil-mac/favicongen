import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { LandingPageComponent } from "~/components/landing-page";

import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.website.getAll.useQuery();

  // const user = useUser();

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
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            FaviconGenAI - {user.user?.firstName}
          </h1> */}

      <LandingPageComponent />

      {/* <p className="text-2xl text-white">
            {data
              ? data.map((website) => <p key={website.id}>{website.url}</p>)
              : "Loading tRPC query..."}
          </p>
        </div>
      </main> */}
    </>
  );
}
