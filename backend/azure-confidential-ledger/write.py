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
append_result = ledger_client.append_to_ledger(entry_contents="Hello world by python SDK")
print(append_result.transaction_id)
  
# Wait until transaction is committed on the ledger
print("# Wait until transaction is committed on the ledger")
while True:
    commit_result = ledger_client.get_transaction_status(append_result.transaction_id)
    print(commit_result.state)
    if (commit_result.state == TransactionState.COMMITTED):
        break
    time.sleep(1)

print('Data was successfully commited')