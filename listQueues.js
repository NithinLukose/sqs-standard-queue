import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

sqs.listQueues({}, function (err, data) {
  if (err) {
    console.log("Error", err);
  }
  console.log("Success", data.QueueUrls);
});
