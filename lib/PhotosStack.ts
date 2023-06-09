import { Construct } from "constructs";
import * as cdk from 'aws-cdk-lib';
import { Bucket } from "aws-cdk-lib/aws-s3";
import { CfnOutput, Fn } from "aws-cdk-lib";

export class PhotosStack extends cdk.Stack {
    
    private stackSuffix: string;
    public readonly photoBucketArn: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix();

        const photosBucket = new Bucket(this, 'PhotosBucket2', {
            bucketName: `photos-bucket-${this.stackSuffix}`
        });

        this.photoBucketArn = photosBucket.bucketArn; // stored the ARN of the bucket so we can pass it to the PhotosHandlerStack

        //a way to change the logical ID
        // (myBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket1234')

        
    }

    private initializeSuffix() {
            const shortStackId = Fn.select(2, Fn.split('/', this.stackId))
            this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}