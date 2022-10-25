//this references the testStatus.js file 
const testStatusFile = require('./testStatus.js');
//references helperFunctions.js
const helperFunctions = require('./helperFunctions.js');

//this is for Google Calendar Assignments
module.exports.updateMessageContent = function (task_id, task_title, task_description, task_due_date, JSON_channel_ts) {
    var template = `{
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "Task Assignment",
                    "emoji": true
                }
            },
            {
                "type": "context",
                "elements": [
                    {
                        "type": "plain_text",
                        "text": "Here are the contents of a task that was assigned to you.",
                        "emoji": true
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "context",
                "block_id": "task_id_BlockID",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": ">RequestID: \`${task_id}\`"
                    }
                ]
            },
            {
                "type": "context",
                "block_id": "task_title_BlockID",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": ">The name of the task: \`${task_title}\`."
                    }
                ]
            },
            {
                "type": "context",
                "block_id": "task_description_BlockID",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": ">The description of the task: \`${task_description}\`"
                    }
                ]
            },
            {
                "type": "context",
                "block_id": "task_due_date_BlockID",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": ">The assigned due date is \`${task_due_date}\`."
                    }
                ]
            },
            {
                "type": "context",
                "block_id": "JSON_channel_ts_BlockID",
                "elements": [
                    {
                        "type": "mrkdwn",
                        "text": ">You can ignore this, it's just for reference: \`${JSON_channel_ts}\`."
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "block_id": "TaskDone_TaskNotDone_BlockID",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Task Done",
                            "emoji": true
                        },
                        "value": "TaskDone",
                        "action_id": "TaskDone_ActionID"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Task Not Done By Due Date",
                            "emoji": true
                        },
                        "value": "TaskNotDone",
                        "action_id": "TaskNotDone_ActionID"
                    }
                ]
            }
        ]
    }`;
    return template;
};

//this is the message sent to the approvers channel
module.exports.createRequestMessageForApprovers = async function (requesterUserID, inputData, slackApp) {
    try {
        //the slackApp parameter is used to pass through Slack's Web APIs so that I can post the message into the channel without sending the msg back.
        var inputData_parsed = JSON.parse(inputData);
        var requesterID = inputData_parsed.requesterID; //same at the requesterUserID parameter
        var requestID = inputData_parsed.requestID;
        var task_description = inputData_parsed.task_description;
        var productName = inputData_parsed.productName;
        var productCost = inputData_parsed.productCost;
        var transactionType_asText = inputData_parsed.transactionType_asText;
        var paymentMethod = inputData_parsed.paymentMethod;
        var paymentToVendorOrCustomer = inputData_parsed.paymentToVendorOrCustomer;
        var paymentToVendorOrCustomer_name = inputData_parsed.paymentToVendorOrCustomer_name;
        var makePaymentByDate = inputData_parsed.makePaymentByDate;
        var imageLinksThatWereSubmitted = inputData_parsed.imageLinksThatWereSubmitted;
        var paymentMethodIsCash = inputData_parsed.paymentMethodIsCash;
        //these 5 options are only available if the paymentMethodIsCash is true.
        //if it's false, then it will be set to "null". 
        var cash_accountName = inputData_parsed.cash_accountName;
        var cash_bankName = inputData_parsed.cash_bankName;
        var cash_AccountNumber = inputData_parsed.cash_AccountNumber;
        var cash_RoutingNumber = inputData_parsed.cash_RoutingNumber;
        var cash_SWIFTCode = inputData_parsed.cash_SWIFTCode;
        //creating JSON from above 5 variables
        var cash_JSON = {
            "accountName": cash_accountName,
            "bankName": cash_bankName,
            "AccountNumber": cash_AccountNumber,
            "RoutingNumber": cash_RoutingNumber,
            "SWIFTCode": cash_SWIFTCode
        };
        var numberOfApproversNeeded = "1";
        if (productCost >= 10000) {
            numberOfApproversNeeded = "2";
        }
        //this just adds the imageSection if there are images being submitted
        var imageSection = "";
        if (imageLinksThatWereSubmitted.length > 0) {
            imageSection = `{"type": "section","block_id": "approvers_imageSection_BlockID","text": {"type": "mrkdwn","text": ">*Any images that may have been attached:*\\n>${imageLinksThatWereSubmitted}"}},`
        };

        var template = `{
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "NEW EXPENSE REQUEST",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "block_id": "approvers_requestID_BlockID",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Request ID:* \`${requestID}\`\\nFrom: <@${requesterID}>"
                    }
                },
                {
                    "type": "section",
                    "block_id": "approvers_requestDescription_BlockID",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Description:*\\n${task_description}"
                    }
                },
                {
                    "type": "section",
                    "block_id": "approvers_requestInformation_BlockID",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": ">*Product Name:*\\n>${productName}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Product Cost:*\\n>$${productCost}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Expense Type/Category:*\\n>${transactionType_asText}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Payment Method:*\\n>${paymentMethod}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Vendor or Customer:*\\n>${paymentToVendorOrCustomer}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Vendor or Customer Name:*\\n>${paymentToVendorOrCustomer_name}"
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">*Payment should be made by:*\\n>${makePaymentByDate}"
                        }
                    ]
                },${imageSection}
                {
                    "type": "section",
                    "block_id": "expenseRequestStatus_numberOfApproversNeeded_BlockID",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Number of Additional Approvers Needed:*\\n${numberOfApproversNeeded}"
                    }
                },
                {
                    "type": "section",
                    "block_id": "expenseRequestStatus_ListOfApproversTimestamps_BlockID",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*List of Users Already Approved:*\\n"
                    }
                },
                {
                    "type": "section",
                    "block_id": "expenseRequestStatus_BlockID",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Current Request Status:*\\nNo Decision Yet"
                    }
                },
                {
                    "type": "actions",
                    "block_id": "approvers_ApproveDeny_BTN_BlockID",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Approve"
                            },
                            "confirm": {
                                "title": {
                                    "type": "plain_text",
                                    "text": "Are you sure you want to approve this request?"
                                },
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "Please make sure that someone else hasn't already approved this request. If someone has, make sure it hasn't been logged in QuickBooks Online, or else there will be two expenses in QuickBooks Online for the same expense request."
                                },
                                "confirm": {
                                    "type": "plain_text",
                                    "text": "Approve it!"
                                },
                                "deny": {
                                    "type": "plain_text",
                                    "text": "Go back, let me check."
                                }
                            },
                            "style": "primary",
                            "value": "Approve",
                            "action_id": "approve_approvers_ApproveDeny_BTN_ActionID"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Deny"
                            },
                            "style": "danger",
                            "value": "Deny",
                            "action_id": "deny_approvers_ApproveDeny_BTN_ActionID"
                        }
                    ]
                }
            ]a
        }`;
        //add a check to see if the created template is valid JSON
        if (template) {
            try {
                //this check to see if the template is valid JSON
                JSON.parse(template);
                //console.log("Template is valid JSON");
            } catch (e) {
                //if it reaches here, the template is not valid JSON
                //therefore, you want to throw an error, and call the sendErrorMessageOnThrow function
                //to make it easier, the function will autogenerate a UUID if the value is not provided. 
                //You can also pass in your own UUID if you want.
                //just pass in the value "null" (but not as a string) if you want the function to autogenerate a UUID in the proper parameter
                //the stuff above should happen in the main catch block
                //this block just creates the error message
                
                customErrorMsg = "The application ran into an issue processing the information you provided. You can try again, or contact the app developer for assistance as they would have some information.";
                var errorObj = new Error("Application ran into an issue when trying to create the Slack Blocks Template for the message sent to the Approvers' channel. The template has been attached in Slack.");
                errorObj.messageTemplate = JSON.stringify(template);
                errorObj.requesterUserID = requesterUserID;
                errorObj.customErrorMsg = customErrorMsg;
                throw errorObj;
                
                //console.log("Template is not valid JSON");
            }
        };

        var templateParsed = JSON.stringify(JSON.parse(template).blocks);
        console.log(templateParsed);

        var postMessageResult = slackApp.client.chat.postMessage({
            channel: process.env.requests_googleforms_approvers, 
            text: "This is a request. This is placeholder text for the Slack Block Kit message.",
            blocks: templateParsed,
            metadata: {
                "event_type": "requestApprovedAction", 
                "event_payload": {
                    "requestID": requestID,
                    "previousApproverID": "",
                    "listOfApprovers": [],
                    "listOfApproversTimestamps": [],
                    "cost": productCost,
                    "numberOfApprovals": 0,
                    "requesterUserID": requesterID
                }
            }
        });
        return postMessageResult;
    } catch (error) {
        console.log(error);
        let errorJSON = {
			requesterUserID: requesterUserID,
			customErrorMsg: "An error was encountered while trying to process your request. Please try again. If the problem persists, please contact the application maintainer. \`This is an unexpected error with a generic error message.\`",
			message: "An unexpected error occurred while creating a message for the approvers. This is a generic error message.",
		};
        if (error.customErrorMsg != null || error.customErrorMsg != undefined) {
			errorJSON.customErrorMsg = error.customErrorMsg;
		};
		//this bit below basically checks if there's a error.message which is basically a message that's attached to the error object before the error is thrown.
		//this is a bit less descriptive than the customErrorMsg which is shown in the end user. That contains instructions on how to fix the error. error.message does not have that. It is meant to be a short and simple error message.
		//if there is, then it will use that message instead of the generic error message.
		if (error.message != null || error.message != undefined) {
			errorJSON.message = error.message;
		};
		await helperFunctions.sendErrorMessageOnThrow(errorJSON.requesterUserID, errorJSON.customErrorMsg, null, errorJSON.message, error.stack, true, error.messageTemplate);
        return {
            sendMsgToApproversOk: false
        }
    }
}