# The commands to submit - note that each statement must be ";"-terminated.
cmds='
create table db (s_link, o_link, time); 
'

# Pipe the commands to `sqlite3` while also passing the database file path.
echo "$cmds" | sqlite3 ./shorten.db
