This is a personal example.

This repo gives a simple and concrete example on how you can instrument a Node.js app programatically using the [splunk otel js](https://github.com/signalfx/splunk-otel-js) package to be able to send traces directly to Splunk Observability Cloud endpoint. This might be done when you are unable to install OpenTelemetry Collector in the host where you are running the application. 

As much as possible, we would want to use the OTel Collector for scalability and performance.

To start sending data, you need to add the following to where your services are defined

```
const { start } = require('@splunk/otel');
const { getInstrumentations } = require('@splunk/otel/lib/instrumentations');  
```

```
start({
  serviceName: 'your-service-name', // Replace with your service name
  accessToken: accessToken,  
  endpoint: 'https://ingest.us1.signalfx.com/v2/trace',  
  metrics: true,
  tracing: {
    instrumentations: [
      ...getInstrumentations()
    ],
  },
});
```

In this example, since we want to instrument all 3 services, you need to add the instrumentation code to 
`content-service/index.js`, `payment-service/index.js`, `ticket-service/index.js`

# Setting up this example

1. Rename .env_example to .env
2. Add in your APM Ingest token
3. Install dependencies `npm install`
4. Run `node content-service/index.js` `node ticket-service/index.js` `node payment-service/index.js`. The services will run in localhost ports 3001, 3002 and 3003 respectively.
5. Generate some traces by running `curl http://localhost:3003/payment `
6. You should see APM traces in the Splunk Observability Cloud UI.

