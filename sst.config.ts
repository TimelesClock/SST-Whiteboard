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
            certificate: Certificate.fromCertificateArn(stack, "5fadaabb-93fa-4a74-b77e-2ce9ae83692e", "arn:aws:acm:us-east-1:684706882628:certificate/5fadaabb-93fa-4a74-b77e-2ce9ae83692e"),
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
