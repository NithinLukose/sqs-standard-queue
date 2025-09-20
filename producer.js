import express from "express";
import AWS from "aws-sdk";

const app = express();
app.use(express.json());
AWS.config.update({ region: "us-east-1" });
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const queueURL =
  "https://sqs.us-east-1.amazonaws.com/869211860260/MyFirstQueue";

app.post("/order", async (req, res) => {
  const { orderId, userEmail, items } = req.body;
  const params = {
    QueueUrl: queueURL,
    MessageBody: JSON.stringify({ orderId, userEmail, items }),
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      res.status(500).json({ error: "Could not queue order" });
    } else {
      console.log("Success", data.MessageId);
      res.json({ status: "Order queued for notification" });
    }
  });
});

app.listen(3000, () => console.log("Producer listening on port 3000"));
