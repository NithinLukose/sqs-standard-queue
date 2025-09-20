import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const queueURL =
  "https://sqs.us-east-1.amazonaws.com/869211860260/MyFirstQueue";

function poll() {
  const params = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 5,
    WaitTimeSeconds: 10,
    VisibilityTimeout: 30,
  };
  sqs.receiveMessage(params, (err, data) => {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      console.log(data.Messages);
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
    }
  });
}

setInterval(poll, 5000);
