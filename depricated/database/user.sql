-- ********************************************************************************
-- This script creates the database users and grants them the necessary permissions
-- ********************************************************************************

CREATE USER cwm_owner
WITH PASSWORD 'climbwithme';

GRANT ALL
ON ALL TABLES IN SCHEMA public
TO cwm_owner;

GRANT ALL
ON ALL SEQUENCES IN SCHEMA public
TO cwm_owner;

CREATE USER cwm_appuser
WITH PASSWORD 'climbwithme';

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO cwm_appuser;

GRANT USAGE, SELECT
ON ALL SEQUENCES IN SCHEMA public
TO cwm_appuser;
