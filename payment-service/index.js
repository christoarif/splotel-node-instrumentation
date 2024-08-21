// payment-service/index.js
const { start } = require('@splunk/otel');
const { getInstrumentations } = require('@splunk/otel/lib/instrumentations');
require('dotenv').config();  // Load environment variables from .env
const accessToken = process.env.SPLUNK_APM_TOKEN;

// Initialize OpenTelemetry
start({
  serviceName: 'Payment-Service',
  accessToken: accessToken,  // Your Splunk Observability access token
  endpoint: 'https://ingest.us1.signalfx.com/v2/trace',  // Splunk Observability endpoint
  metrics: true,
  tracing: {
    instrumentations: [
      ...getInstrumentations()  // Automatically instrument common libraries
    ],
  },
});

const express = require('express');
const axios = require('axios');
const app = express();

app.get('/payment', async (req, res) => {
  try {
    const ticketResponse = await axios.get('http://localhost:3002/ticket');
    res.json({ message: 'Payment Service Response', ticket: ticketResponse.data });
  } catch (error) {
    res.status(500).send('Error calling Ticket Service');
  }
});

app.listen(3003, () => {
  console.log('Payment Service running on port 3003');
});
