// ticket-service/index.js
const { start } = require('@splunk/otel');
const { getInstrumentations } = require('@splunk/otel/lib/instrumentations');
require('dotenv').config();  // Load environment variables from .env

const accessToken = process.env.SPLUNK_APM_TOKEN;
// Initialize OpenTelemetry
start({
  serviceName: 'Ticket-Service',
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

app.get('/ticket', async (req, res) => {
  try {
    const contentResponse = await axios.get('http://localhost:3001/content');
    res.json({ message: 'Ticket Service Response', content: contentResponse.data });
  } catch (error) {
    res.status(500).send('Error calling Content Service');
  }
});

app.listen(3002, () => {
  console.log('Ticket Service running on port 3002');
});
