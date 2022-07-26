const testStatus = require('./testStatus.js');

var requestAppModalView = { //view created using Slack's interactive Block Kit Builder. Just for Google Calendar thing.
    "type": "modal",
    "callback_id": "create-google-cal-task-callback",
    "title": {
      "type": "plain_text",
      "text": "Slack-RequestApp",
      "emoji": true
    },
    "submit": {
      "type": "plain_text",
      "text": "Submit",
      "emoji": true
    },
    "close": {
      "type": "plain_text",
      "text": "Cancel",
      "emoji": true
    },
    "blocks": [
        {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "This is used to assign a user a task that need to be completed. The request will be pushed to the Google Calendar of the email address specified below."
        }
        },
        {
            "type": "input",
            "block_id": "requesteeSelectBlock_BlockID",
            "element": {
                "type": "users_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select One User",
                    "emoji": true
                },
                "action_id": "requesteeSelectBlock_ActionID",
            },
            "label": {
                "type": "plain_text",
                "text": "User who will be assigned task:",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "requesteeEmailAddress_BlockID",
            "element": {
                "type": "plain_text_input",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Enter Email Address",
                    "emoji": true
                },
                "action_id": "requesteeEmailAddress_ActionID",
            },
            "label": {
                "type": "plain_text",
                "text": "Enter their email address, preferably a work address:",
                "emoji": true
            }
        },
        {
			"type": "context",
			"elements": [
				{
					"type": "plain_text",
					"text": "Try and use the same email address as you did before, if this isn't the first time you're assigning this user a task.",
					"emoji": true
				}
			]
		},
        {
            "type": "input",
            "block_id": "taskTitle_BlockID",
            "element": {
                "type": "plain_text_input",
                "placeholder": {
					"type": "plain_text",
					"text": "Enter the title of the task.",
					"emoji": true
				},
                "action_id": "taskTitle_ActionID"
            },
            "label": {
                "type": "plain_text",
                "text": "Title of Task",
                "emoji": true
            }
        },
        {
            "type": "input",
            "block_id": "taskDescription_BlockID",
            "element": {
                "type": "plain_text_input",
                "placeholder": {
					"type": "plain_text",
					"text": "Enter a description for this task. You should provide context, and describe what is required.",
					"emoji": true
				},
                "multiline": true,
                "action_id": "taskDescription_ActionID"
            },
            "label": {
                "type": "plain_text",
                "text": "Describe the Task. ",
                "emoji": true
            }
        },
        {
			"type": "input",
            "block_id": "taskDueDate_BlockID",
			"element": {
				"type": "datepicker",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "taskDueDate_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "When does the task need to be completed by? The task will be due at 12 or 1 AM on this date, depending on Daylight Savings Time.",
				"emoji": true
			}
		}
    ]
};

var requestApp_CreateRequestModalView = {
	"type": "modal",
    "callback_id": "createExpenseRequest-callback",
	"title": {
		"type": "plain_text",
		"text": "Slack-RequestApp",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Notice: Wherever you can input text, DO NOT use any quotation marks if possible. You can use alternatives like parentheses, or brackets.\nAlso, DO NOT use the \\ symbol. If you do, your request will be automatically rejected, and you will have to create another request without that character."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a description for this request. You should provide however much context you see necessary in order to get this expense approved and so that the accountants can actually pay it."
				}
			]
		},
		{
			"type": "input",
            "block_id": "Description_BlockID",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "Description_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Description",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the cost of this expense. This should be a number, it should not include any currency symbols, and it should not include any commas. For example, if the expense is $1,000.00, you should enter 1000.00. You are not required to enter the cent value if it's zero.\nUsage of characters that result in something that isn't a number will result in your request being automatically denied, and you being asked to re-fill out the form."
				}
			]
		},
		{
			"type": "input",
            "block_id": "Cost_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "Cost_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Cost",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What date must the payment be made by, if approved?"
				}
			]
		},
		{
			"type": "input",
            "block_id": "paymentDueByDate_BlockID",
			"element": {
				"type": "datepicker",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "paymentDueByDate_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select Date",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Select whether this payment is being made to a Vendor (like Google), or a Customer. You can also opt for employee, but payment should be logged as a Vendor. Ensure you're making clear that the payment is for an employee reimbursement, and not a vendor in the description. It should be one of the first things mentioned."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomer_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select Vendor or Customer",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Vendor",
							"emoji": true
						},
						"value": "Vendor"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Customer",
							"emoji": true
						},
						"value": "Customer"
					}
				],
				"action_id": "VendorOrCustomer_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Choose whether payment is to Vendor or Customer:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the name of the Vendor or Customer. This should be the name of the company or person you are paying. If you are paying an employee, enter their name here, or any info that specifies who."
				}
			]
		},
		{
			"type": "input",
            "block_id": "VendorOrCustomerName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "VendorOrCustomerName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter the Vendor or Customer's Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a VERY short (like 2 or 3 words) description of the product name (like Google Voice or Employee Reimbursement)."
				}
			]
		},
		{
			"type": "input",
            "block_id": "ProductName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "ProductName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Product Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What type of transaction is this? If it's uncategorized, you can put a best fit category in the description section."
				}
			]
		},
		{
			"type": "input",
			"block_id": "TransactionType_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an option...",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Advertising & Promotion",
							"emoji": true
						},
						"value": "160"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Office Supplies",
							"emoji": true
						},
						"value": "169"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Reimbursement",
							"emoji": true
						},
						"value": "185"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Computer and Internet Expenses",
							"emoji": true
						},
						"value": "163"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Other (Uncategorized Expense)",
							"emoji": true
						},
						"value": "199"
					}
				],
				"action_id": "TransactionType_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select the type of this transaction:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Select whether payment is in cash or credit card:"
			}
		},
		{
			"type": "actions",
			"block_id": "PaymentMethod_BlockID",
			"elements": [
				{
					"type": "radio_buttons",
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "Credit Card",
								"emoji": true
							},
							"value": "CreditCard"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Cash",
								"emoji": true
							},
							"value": "Cash"
						}
					],
					"action_id": "PaymentMethod_ActionID"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Add any optional images by linking to a Google Drive Image or Folder"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Please make sure that your image links are viewable publicly (meaning not signed into a Google Account). Suggestion is to use Google Drive, but make sure the image is set to be viewable by anyone with link; you can find a guide for Google Drive Sharing here: \n[https://slack-requestapp.herokuapp.com/slack/help/GoogleDriveImagePerms].\nYou can also put any relevant links here. If you have multiple, separate them with a comma that way the links don't become messed up."
				}
			]
		},
		{
			"type": "input",
            "block_id": "imageLink_BlockID",
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"placeholder": {
					"type": "plain_text",
					"text": "Paste Link to Image or Folder here",
					"emoji": true
				},
				"action_id": "imageLink_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Paste Google Drive Link",
				"emoji": true
			}
		}
	]
};

var requestApp_CreateRequestModalView_paymentMethod_cash_View = {
	"type": "modal",
    "callback_id": "createExpenseRequest-callback",
	"title": {
		"type": "plain_text",
		"text": "Slack-RequestApp",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Throughout the form, anywhere where you can input text, avoid using quotation marks, if possible. Use alternatives like parentheses, or brackets.\nAlso, do NOT use the \\ symbol. If you do, your request will be automatically rejected, and you will have to create another request without that character."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a short, descriptive description about what this request is for. It will be passed on to the accountants so they know what to pay for. This description will also be stored as the memo of this expense."
				}
			]
		},
		{
			"type": "input",
            "block_id": "Description_BlockID",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "Description_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Description",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the cost of the request. You should not include the dollar ($) sign, but it's fine if you do.\nThere is no strict format, other than using only numbers and a single decimal point, but try to express dollar amounts as you would normally like: \"1.00\", \"10\" or even \"1.0\".\nUsage of characters that result in something that isn't a number will result in your request being automatically denied, and you being asked to re-fill out the form"
				}
			]
		},
		{
			"type": "input",
            "block_id": "Cost_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "Cost_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Cost",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What date must the payment be made by, if approved?"
				}
			]
		},
		{
			"type": "input",
            "block_id": "paymentDueByDate_BlockID",
			"element": {
				"type": "datepicker",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "paymentDueByDate_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select Date",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Select whether this payment is being made to a Vendor (like Google), or a Customer. You can also opt for employee, but payment should be logged as a Vendor. Ensure you're making clear that the payment is for an employee reimbursement, and not a Vendor."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomer_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select Vendor or Customer",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Vendor",
							"emoji": true
						},
						"value": "Vendor"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Customer",
							"emoji": true
						},
						"value": "Customer"
					}
				],
				"action_id": "VendorOrCustomer_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Choose whether payment is to Vendor or Customer:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the name of the Vendor or Customer. If it's a Vendor, the phone number will be set at 0000000000."
				}
			]
		},
		{
			"type": "input",
            "block_id": "VendorOrCustomerName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "VendorOrCustomerName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter the Vendor or Customer's Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a VERY short (like 2 or 3 words) description of the product name (like Google Voice)."
				}
			]
		},
		{
			"type": "input",
            "block_id": "ProductName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "ProductName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Product Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What type of transaction is this?"
				}
			]
		},
		{
			"type": "input",
			"block_id": "TransactionType_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an option...",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Advertising & Promotion",
							"emoji": true
						},
						"value": "160"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Office Supplies",
							"emoji": true
						},
						"value": "169"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Reimbursement",
							"emoji": true
						},
						"value": "185"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Computer and Internet Expenses",
							"emoji": true
						},
						"value": "163"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Other (Uncategorized Expense)",
							"emoji": true
						},
						"value": "199"
					}
				],
				"action_id": "TransactionType_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select the type of this transaction:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Select whether payment is in cash or credit card:"
			}
		},
		{
			"type": "actions",
			"block_id": "PaymentMethod_BlockID",
			"elements": [
				{
					"type": "radio_buttons",
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "Credit Card",
								"emoji": true
							},
							"value": "CreditCard"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Cash",
								"emoji": true
							},
							"value": "Cash"
						}
					],
					"action_id": "PaymentMethod_ActionID"
				}
			]
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Additional Info for Cash Payments",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "AccountName_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "AccountName_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Account Name:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "BankName_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "BankName_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Bank Name:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "AccountNumber_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "AccountNumber_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Account Number:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "RoutingNumber_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "RoutingNumber_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Routing Number:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "SWIFTCode_Cash_BlockID",
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"action_id": "SWIFTCode_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter SWIFT Code (for international transactions):",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Add any optional images by linking to a Google Drive Image or Folder"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Please make sure that your image links are viewable publicly (meaning not signed into a Google Account). Suggestion is to use Google Drive, but make sure the image is set to be viewable by anyone with link; you can find a guide for Google Drive Sharing here: \n[https://slack-requestapp.herokuapp.com/slack/help/GoogleDriveImagePerms]"
				}
			]
		},
		{
			"type": "input",
            "block_id": "imageLink_BlockID",
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"placeholder": {
					"type": "plain_text",
					"text": "Paste Link to Image or Folder",
					"emoji": true
				},
				"action_id": "imageLink_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Paste Google Drive Link",
				"emoji": true
			}
		}
	]
};

var requestApp_showApplicationInTestMode = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "Slack-RequestApp",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Close Notice",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Hey! This application is currently in test mode. Only the maintainer can access this application to use this function during this time. Check back later."
			}
		}
	]
};

var requestApp_checkTestStatus = async () => {
	var status = testStatus.test;
	if(status == "true") {
		return JSON.stringify({
			"type": "modal",
			"title": {
				"type": "plain_text",
				"text": "Slack-RequestApp",
				"emoji": true
			},
			"close": {
				"type": "plain_text",
				"text": "Close Notice",
				"emoji": true
			},
			"blocks": [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "Hey! This application is currently in test mode. Only the maintainer (currently the account called 'Info') can access this application to use this function during this time. Check back later. If you believe this is a mistake, please contant the maintainer."
					}
				}
			]
		});
	} else if (status == "false") {
		return JSON.stringify({
			"type": "modal",
			"title": {
				"type": "plain_text",
				"text": "Slack-RequestApp",
				"emoji": true
			},
			"close": {
				"type": "plain_text",
				"text": "Close Notice",
				"emoji": true
			},
			"blocks": [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": "This application is not currently inside test mode. Everyone should be able to use this application. If there's any concerns or issues, please contact the maintainer, which is currently the account called 'Info' on Slack."
					}
				}
			]
		});
	}
};

async function requestApp_RequestAddReplyView(privateMetadata) {
	privateMetadata = JSON.stringify(privateMetadata);
	var requestApp_addReplyView = {
		"type": "modal",
		"callback_id": "RequestAddReplyButton-callback",
		"private_metadata": privateMetadata,
		"title": {
			"type": "plain_text",
			"text": "Slack-RequestApp",
			"emoji": true
		},
		"submit": {
			"type": "plain_text",
			"text": "Submit",
			"emoji": true
		},
		"close": {
			"type": "plain_text",
			"text": "Cancel",
			"emoji": true
		},
		"blocks": [
			{
				"type": "input",
				"block_id": "RequestAddReplyButton_Text_BlockID",
				"element": {
					"type": "plain_text_input",
					"multiline": true,
					"action_id": "RequestAddReplyButton_Text_ActionID"
				},
				"label": {
					"type": "plain_text",
					"text": "Write what additional information you want to provide.\nThis information will be added as a reply.",
					"emoji": true
				}
			}
		]
	};
	return requestApp_addReplyView;
}



var requestApp_CreateRequestModalView_test = {
	"type": "modal",
	"callback_id": "createExpenseRequest-callback-test",
	"title": {
		"type": "plain_text",
		"text": "Slack-RequestApp (Test)",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Throughout the form, anywhere where you can input text, avoid using quotation marks, if possible. Use alternatives like parentheses, or brackets.\nAlso, do NOT use the \\ symbol. If you do, your request will be automatically rejected, and you will have to create another request without that character."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a short, descriptive description about what this request is for. It will be passed on to the accountants so they know what to pay for. This description will also be stored as the memo of this expense."
				}
			]
		},
		{
			"type": "input",
			"block_id": "Description_BlockID",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "Description_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Description",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the cost of the request. You should not include the dollar ($) sign, but it's fine if you do.\nThere is no strict format, other than using only numbers and a single decimal point, but try to express dollar amounts as you would normally like: \"1.00\", \"10\" or even \"1.0\".\nUsage of characters that result in something that isn't a number will result in your request being automatically denied, and you being asked to re-fill out the form"
				}
			]
		},
		{
			"type": "input",
			"block_id": "Cost_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "Cost_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Cost",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What date must the payment be made by, if approved?"
				}
			]
		},
		{
			"type": "input",
			"block_id": "paymentDueByDate_BlockID",
			"element": {
				"type": "datepicker",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "paymentDueByDate_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select Date",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Select whether this payment is being made to a Vendor (like Google), or a Customer. You can also opt for employee, but payment should be logged as a Vendor. Ensure you're making clear that the payment is for an employee reimbursement, and not a Vendor."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomer_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select Vendor or Customer",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Vendor",
							"emoji": true
						},
						"value": "Vendor"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Customer",
							"emoji": true
						},
						"value": "Customer"
					}
				],
				"action_id": "VendorOrCustomer_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Choose whether payment is to Vendor or Customer:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the name of the Vendor or Customer. If it's a Vendor, the phone number will be set at 0000000000."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomerName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "VendorOrCustomerName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter the Vendor or Customer's Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a VERY short (like 2 or 3 words) description of the product name (like Google Voice)."
				}
			]
		},
		{
			"type": "input",
			"block_id": "ProductName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "ProductName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Product Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What type of transaction is this?"
				}
			]
		},
		{
			"type": "input",
			"block_id": "TransactionType_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an option...",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Advertising & Promotion",
							"emoji": true
						},
						"value": "160"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Office Supplies",
							"emoji": true
						},
						"value": "169"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Reimbursement",
							"emoji": true
						},
						"value": "185"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Computer and Internet Expenses",
							"emoji": true
						},
						"value": "163"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Other (Uncategorized Expense)",
							"emoji": true
						},
						"value": "199"
					}
				],
				"action_id": "TransactionType_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select the type of this transaction:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Select whether payment is in cash or credit card:"
			}
		},
		{
			"type": "actions",
			"block_id": "selectingRadioButtons_BlockID",
			"elements": [
				{
					"type": "radio_buttons",
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "Credit Card",
								"emoji": true
							},
							"value": "CreditCard"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Cash",
								"emoji": true
							},
							"value": "Cash"
						}
					],
					"action_id": "selectingRadioButtons_ActionID"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Add any optional images by linking to a Google Drive Image or Folder"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Please make sure that your image links are viewable publicly (meaning not signed into a Google Account). Suggestion is to use Google Drive, but make sure the image is set to be viewable by anyone with link; you can find a guide for Google Drive Sharing here: \n[https://slack-requestapp.herokuapp.com/slack/help/GoogleDriveImagePerms]"
				}
			]
		},
		{
			"type": "input",
			"block_id": "imageLink_BlockID",
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"placeholder": {
					"type": "plain_text",
					"text": "Paste Link to Image or Folder",
					"emoji": true
				},
				"action_id": "imageLink_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Paste Google Drive Link",
				"emoji": true
			}
		}
	]
};
var requestApp_CreateRequestModalView_test_cash = {
	"type": "modal",
	"callback_id": "createExpenseRequest-callback-test",
	"title": {
		"type": "plain_text",
		"text": "Slack-RequestApp (Test)",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Throughout the form, anywhere where you can input text, avoid using quotation marks, if possible. Use alternatives like parentheses, or brackets.\nAlso, do NOT use the \\ symbol. If you do, your request will be automatically rejected, and you will have to create another request without that character."
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a short, descriptive description about what this request is for. It will be passed on to the accountants so they know what to pay for. This description will also be stored as the memo of this expense."
				}
			]
		},
		{
			"type": "input",
			"block_id": "Description_BlockID",
			"element": {
				"type": "plain_text_input",
				"multiline": true,
				"action_id": "Description_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Description",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the cost of the request. You should not include the dollar ($) sign, but it's fine if you do.\nThere is no strict format, other than using only numbers and a single decimal point, but try to express dollar amounts as you would normally like: \"1.00\", \"10\" or even \"1.0\".\nUsage of characters that result in something that isn't a number will result in your request being automatically denied, and you being asked to re-fill out the form"
				}
			]
		},
		{
			"type": "input",
			"block_id": "Cost_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "Cost_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Cost",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What date must the payment be made by, if approved?"
				}
			]
		},
		{
			"type": "input",
			"block_id": "paymentDueByDate_BlockID",
			"element": {
				"type": "datepicker",
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "paymentDueByDate_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select Date",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Select whether this payment is being made to a Vendor (like Google), or a Customer. You can also opt for employee, but payment should be logged as a Vendor. Ensure you're making clear that the payment is for an employee reimbursement, and not a Vendor."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomer_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select Vendor or Customer",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Vendor",
							"emoji": true
						},
						"value": "Vendor"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Customer",
							"emoji": true
						},
						"value": "Customer"
					}
				],
				"action_id": "VendorOrCustomer_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Choose whether payment is to Vendor or Customer:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter the name of the Vendor or Customer. If it's a Vendor, the phone number will be set at 0000000000."
				}
			]
		},
		{
			"type": "input",
			"block_id": "VendorOrCustomerName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "VendorOrCustomerName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter the Vendor or Customer's Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Enter a VERY short (like 2 or 3 words) description of the product name (like Google Voice)."
				}
			]
		},
		{
			"type": "input",
			"block_id": "ProductName_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "ProductName_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Product Name",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "What type of transaction is this?"
				}
			]
		},
		{
			"type": "input",
			"block_id": "TransactionType_BlockID",
			"element": {
				"type": "static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select an option...",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "Advertising & Promotion",
							"emoji": true
						},
						"value": "160"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Office Supplies",
							"emoji": true
						},
						"value": "169"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Reimbursement",
							"emoji": true
						},
						"value": "185"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Computer and Internet Expenses",
							"emoji": true
						},
						"value": "163"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "Other (Uncategorized Expense)",
							"emoji": true
						},
						"value": "199"
					}
				],
				"action_id": "TransactionType_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Select the type of this transaction:",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Select whether payment is in cash or credit card:"
			}
		},
		{
			"type": "actions",
			"block_id": "selectingRadioButtons_BlockID",
			"elements": [
				{
					"type": "radio_buttons",
					"options": [
						{
							"text": {
								"type": "plain_text",
								"text": "Credit Card",
								"emoji": true
							},
							"value": "CreditCard"
						},
						{
							"text": {
								"type": "plain_text",
								"text": "Cash",
								"emoji": true
							},
							"value": "Cash"
						}
					],
					"action_id": "selectingRadioButtons_ActionID"
				}
			]
		},
		{
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": "Additional Info for Cash Payments",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "AccountName_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "AccountName_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Account Name:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "BankName_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "BankName_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Bank Name:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "AccountNumber_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "AccountNumber_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Account Number:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "RoutingNumber_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "RoutingNumber_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter Routing Number:",
				"emoji": true
			}
		},
		{
			"type": "input",
			"block_id": "SWIFTCode_Cash_BlockID",
			"element": {
				"type": "plain_text_input",
				"action_id": "SWIFTCode_Cash_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Enter SWIFT Code (for international transactions):",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Add any optional images by linking to a Google Drive Image or Folder"
			}
		},
		{
			"type": "context",
			"elements": [
				{
					"type": "mrkdwn",
					"text": "Please make sure that your image links are viewable publicly (meaning not signed into a Google Account). Suggestion is to use Google Drive, but make sure the image is set to be viewable by anyone with link; you can find a guide for Google Drive Sharing here: \n[https://slack-requestapp.herokuapp.com/slack/help/GoogleDriveImagePerms]"
				}
			]
		},
		{
			"type": "input",
			"block_id": "imageLink_BlockID",
			"optional": true,
			"element": {
				"type": "plain_text_input",
				"placeholder": {
					"type": "plain_text",
					"text": "Paste Link to Image or Folder",
					"emoji": true
				},
				"action_id": "imageLink_ActionID"
			},
			"label": {
				"type": "plain_text",
				"text": "Paste Google Drive Link",
				"emoji": true
			}
		}
	]
};

//export the modal view
module.exports = {
    modalForm: requestAppModalView,
    createRequestView: requestApp_CreateRequestModalView,
	createRequestView_test: requestApp_CreateRequestModalView_test,
	requestApp_CreateRequestModalView_test_cash,
	createRequestView_Cash: requestApp_CreateRequestModalView_paymentMethod_cash_View,
	testModeModal: requestApp_showApplicationInTestMode,
	RequestAddReplyView: requestApp_RequestAddReplyView,
	checkTestStatus: requestApp_checkTestStatus
};