const getScreenshot = require('./screenshot');

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
    const qs = new URLSearchParams(event.queryStringParameters);
    
    console.log(
    `${process.env.URL || `http://localhost:8888`}/thumbnail?${qs.toString()}`
    );
    
    const photoBuffer = await getScreenshot(
        `${process.env.URL || `http://localhost:8888`}/thumbnail?${qs.toString()}`,
        // Here we need to pass a boolean to say if we are on the server. Netlify has a bug where process.env.NETLIFY is undefiend in functions so I'm using one of the only vars I can find
        // !process.env.NETLIFY
        process.env.URL.includes('http://localhost')
    );
    
    return {
        statusCode: 200,
        body: photoBuffer,
        isBase64Encoded: true,
    };
};