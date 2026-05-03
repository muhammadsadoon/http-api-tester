import { Metadata } from "next";
import HelpClient from "./HelpClient";

export const metadata: Metadata = {
  title: "API Platform Help Center | How to Test & Debug REST APIs",
  description: "Learn how to use our professional API testing platform. A complete A-Z guide on HTTP methods, request headers, JSON body handling, and visual HTML response preview.",
  keywords: "API Tutorial, How to use API Tester, REST API Guide, HTTP Documentation, API Debugging Steps, JSON Payload Guide",
};

export default function HelpPage() {
  return <HelpClient />;
}
