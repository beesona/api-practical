// add CF magic as needed
// fix issue with PagedResponseBodyCPC
const fs = require('fs');

const LAMBDA_REF = 'ServiceLambda'; // RESOURCE NAME GOES HERE
const gatewayIntegration = {
  "uri": {
    "Fn::Join": [
      "",
      [
        "arn:aws:apigateway:",
        {
          "Ref": "AWS::Region"
        },
        ":lambda:path/2015-03-31/functions/",
        {
          "Fn::GetAtt": [
            LAMBDA_REF,
            "Arn"
          ]
        },
        "/invocations"
      ]
    ]
  },
  "passthroughBehavior": "when_no_match",
  "httpMethod": "POST",
  "type": "aws_proxy"
};

const swagger = require('./dist/swagger.json');

// Update base path for hosted swagger ui. Don't want to set this in swaggerconfig.json because it would break local
swagger.basePath = '/<APINAME>';
fs.writeFileSync('./dist/swagger.json', JSON.stringify(swagger));

// Add docs routes
swagger.paths['/docs'] = {
  get:{
    responses: { 
      '200': { description: 'Ok'  }
    }
  }
};
swagger.paths['/docs/{proxy+}'] = {
  get: {
    responses: {
      '200': { description: 'Ok'  }
    },
    parameters: [
      { name: 'proxy', in: 'path', required: true, type: 'string' }
    ]
  }
};

// Add Lambda integration
Object.keys(swagger.paths).forEach(path => {
  Object.keys(swagger.paths[path]).forEach(method => {
    swagger.paths[path][method]['x-amazon-apigateway-integration'] = gatewayIntegration;
    // add headers
    swagger.paths[path][method].parameters = swagger.paths[path][method].parameters || [];
    swagger.paths[path][method].parameters.push({ name: 'tenantid', in: 'header', required: false, type: 'string' });
    swagger.paths[path][method].parameters.push({ name: 'servicerid', in: 'header', required: false, type: 'string' });
  });
});

let sanitized_out = JSON.stringify(swagger);
sanitized_out = sanitized_out.replace(/PagedResponseBodyXXX\[]/g, 'PagedResponseBodyXXXArray');

fs.writeFileSync('./swagger.json', sanitized_out);
