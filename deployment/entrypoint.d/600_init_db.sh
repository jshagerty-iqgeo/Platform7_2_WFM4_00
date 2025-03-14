#!/bin/bash

#assumes database was created (300-ensure-database script)

# START SECTION db init - if you edit these lines manually note that your change will get lost if you run the IQGeo Project Update tool
if ! myw_db $MYW_DB_NAME list versions --layout keys | grep myw_comms_schema | grep version=; then myw_db $MYW_DB_NAME install comms; fi
if ! myw_db $MYW_DB_NAME list versions --layout keys | grep mywmywwfm_schema | grep version=; then myw_db $MYW_DB_NAME install workflow_manager; fi
if ! myw_db $MYW_DB_NAME list versions --layout keys | grep groups | grep version=; then myw_db $MYW_DB_NAME install groups; fi
if ! myw_db $MYW_DB_NAME list versions --layout keys | grep iqg_comsof_schema | grep version=; then myw_db $MYW_DB_NAME install comsof; fi
# END SECTION