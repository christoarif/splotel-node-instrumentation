// content-service/index.js
const { start } = require('@splunk/otel');
const { getInstrumentations } = require('@splunk/otel/lib/instrumentations');
require('dotenv').config();  // Load environment variables from .env

const accessToken = process.env.SPLUNK_APM_TOKEN;
// Initialize OpenTelemetry
start({
  serviceName: 'Content-Service',
  accessToken: accessToken,  // Replace with your Splunk Observability access token
  endpoint: 'https://ingest.us1.signalfx.com/v2/trace',  // Replace with your Splunk Observability endpoint
  metrics: true,
  tracing: {
    instrumentations: [
      ...getInstrumentations()
    ],
  },
});

const express = require('express');
const app = express();

app.get('/content', (req, res) => {
  res.json({ message: 'Content Service Response' });
});

app.listen(3001, () => {
  console.log('Content Service running on port 3001');
});
