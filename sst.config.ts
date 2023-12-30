import { type SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export default {
  config(_input) {
    return {
      name: "SSTTest",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: "whiteboard.timeles.codes",
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(stack, "fb228fdb-3d42-4c8f-a1d8-4b47887ecfd1", "arn:aws:acm:ap-southeast-1:684706882628:certificate/fb228fdb-3d42-4c8f-a1d8-4b47887ecfd1"),
          },
        },
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL!,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          NEXTAUTH_GITHUB_ID: process.env.NEXTAUTH_GITHUB_ID!,
          NEXTAUTH_GITHUB_SECRET: process.env.NEXTAUTH_GITHUB_SECRET!,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
