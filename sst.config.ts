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
            certificate: Certificate.fromCertificateArn(stack, "3dd2a628-1454-4ebf-8d66-9d59fa4174e4", "arn:aws:acm:us-east-1:684706882628:certificate/3dd2a628-1454-4ebf-8d66-9d59fa4174e4"),
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
