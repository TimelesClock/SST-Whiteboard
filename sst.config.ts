import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "SSTTest",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site",{
        environment:{
          DATABASE_URL : process.env.DATABASE_URL!,
          NEXT_PUBLIC_SOCKET_URL : process.env.NEXT_PUBLIC_SOCKET_URL!,
          NEXTAUTH_URL : process.env.NEXTAUTH_URL!,
          NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_GITHUB_ID : process.env.NEXTAUTH_GITHUB_ID!,
          NEXTAUTH_GITHUB_SECRET : process.env.NEXTAUTH_GITHUB_SECRET!,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
