# Copy from https://docs.microsoft.com/ja-jp/azure/confidential-ledger/quickstart-python?tabs=azure-cli

import time
from azure.identity import DefaultAzureCredential

## Import control plane sdk

from azure.mgmt.confidentialledger import ConfidentialLedger as ConfidentialLedgerAPI
from azure.mgmt.confidentialledger.models import ConfidentialLedger

# import data plane sdk

from azure.confidentialledger import ConfidentialLedgerClient
from azure.confidentialledger.identity_service import ConfidentialLedgerIdentityServiceClient
from azure.confidentialledger import TransactionState

# Set variables

rg = "inol"
ledger_name = "inol-test"
subscription_id = "589247e3-867c-4255-be94-035ed9ac7a97"

identity_url = "https://identity.confidential-ledger.core.azure.com"
ledger_url = "https://" + ledger_name + ".confidential-ledger.azure.com"

# Authentication

# Need to do az login to get default credential to work
print("# Authentication")
credential = DefaultAzureCredential()

# Control plane (azure.mgmt.confidentialledger)
# 
# initialize endpoint with credential and subscription

print("# initialize endpoint with credential and subscription")
confidential_ledger_mgmt = ConfidentialLedgerAPI(
    credential, subscription_id
)

# Create properties dictionary for begin_create call 

# properties = {
#     "location": "eastus",
#     "tags": {},
#     "properties": {
#         "ledgerType": "Public",
#         "aadBasedSecurityPrincipals": [],
#     },
# }

# ledger_properties = ConfidentialLedger(**properties)

# # Create a ledger

# foo = confidential_ledger_mgmt.ledger.begin_create(rg, ledger_name, ledger_properties)
  
# # wait until ledger is created
# foo.wait()

# # Get the details of the ledger you just created

# print(f"{rg} / {ledger_name}")
 
# print("Here are the details of your newly created ledger:")
# myledger = confidential_ledger_mgmt.ledger.get(rg, ledger_name)

# print (f"- Name: {myledger.name}")
# print (f"- Location: {myledger.location}")
# print (f"- ID: {myledger.id}")

# Data plane (azure.confidentialledger)
#
# Create a CL client

print("# Create a CL client")
identity_client = ConfidentialLedgerIdentityServiceClient(identity_url)
network_identity = identity_client.get_ledger_identity(
     ledger_id=ledger_name
)

ledger_tls_cert_file_name = "networkcert.pem"
with open(ledger_tls_cert_file_name, "w") as cert_file:
    cert_file.write(network_identity.ledger_tls_certificate)


ledger_client = ConfidentialLedgerClient(
     endpoint=ledger_url, 
     credential=credential,
     ledger_certificate_path=ledger_tls_cert_file_name
)

# Write to the ledger
print("# Write to the ledger")
append_result = ledger_client.append_to_ledger(entry_contents="Hello world!")
print(append_result.transaction_id)
  
# Wait until transaction is committed on the ledger
print("# Wait until transaction is committed on the ledger")
while True:
    commit_result = ledger_client.get_transaction_status(append_result.transaction_id)
    print(commit_result.state)
    if (commit_result.state == TransactionState.COMMITTED):
        break
    time.sleep(1)

# Read from the ledger
print("# Read from the ledger")
# entry = ledger_client.get_ledger_entry(transaction_id=append_result.transaction_id)
entries = ledger_client.get_ledger_entries()
for entry in entries:
    print(entry.contents)