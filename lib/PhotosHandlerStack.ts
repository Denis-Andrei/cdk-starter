import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Fn } from "aws-cdk-lib";
import { Code, Runtime, Function as LambdaFunction} from 'aws-cdk-lib/aws-lambda'

export class PhotosHandlerStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const targetBucket = Fn.importValue('photos-bucket')


        new LambdaFunction(this, 'PhotosHandler', {
            runtime: Runtime.NODEJS_16_X,
            handler: 'index.handler',
            code: Code.fromInline(`
            exports.handler = async (event) => {
              console.log("hello!zxzxc: " + process.env.TARGET_BUCKET)
            };
          `),
            environment: {
                TARGET_BUCKET: targetBucket,
            },

        });
        
        
    }
}