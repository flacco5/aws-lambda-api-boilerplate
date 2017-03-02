var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));
//PUT method    
if (event.http_method == "POST") {
var params = {
    TableName: "Login",
    Item: {
        "logid": event.logid,
        "logname": event.logname,
        "town": event.town
        }};
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        context.succeed("SUCCESS ");
    }});
} 
else {
    //mapping template
    params = {
        TableName: "Login",
        Key: {
            "logid": event.logid,
            "logname": event.logname
            },
        UpdateExpression: "set town = :g",
        ExpressionAttributeValues:{
        ":g": event.town
        },
        ReturnValues:"UPDATED_NEW"
        };
//GET method
if (event.http_method == "GET") {
docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        context.succeed(data.Item);
        context.succeed('SUCCESS');
    }});}
//DELETE method
if (event.http_method == "DELETE") {
  params = { 
      TableName: "Login",
      Key: {
            "logid": event.logid,
            "logname": event.logname
            },
      ReturnValues:"NONE" 
  };
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        context.succeed('SUCCESS');
    }});}
//UPDATE method
if (event.http_method == "PUT") {
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
        context.succeed("SUCCESS " + JSON.stringify(data));
    }});}
}
}

