# Source - https://stackoverflow.com/a/69123002
# Posted by mklement0
# Retrieved 2026-07-24, License - CC BY-SA 4.0

# The commands to submit - note that each statement must be ";"-terminated.
cmds='
create table db (o_link, s_link, time); 
'

# Pipe the commands to `sqlite3` while also passing the database file path.
echo "$cmds" | sqlite3 ./shorten.db
