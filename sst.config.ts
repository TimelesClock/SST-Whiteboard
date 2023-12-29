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
          NEXTAUTH_SECFRET : process.env.NEXTAUTH_SECFRET!,
          GITHUB_ID : process.env.GITHUB_ID!,
          GITHUB_SECRET : process.env.GITHUB_SECRET!,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
