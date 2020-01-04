# How to make it work ?

<b>(Assuming you have nodejs , xampp(or equivalent tool) installed)</b>
<br><br>
Step 1 : Clone or download the repo and unpack it <br>
Step 2 : Import the sql file at ./db_export_file/nodemysql.sql to a newly created database (prefferred name = "nodemysql")<br>
Step 3 : If name of db changed then it should be changed at ./config/connect.js line 20<br>
Step 4 : then from the root directory execute the commands : <br>
        * <b>npm install</b><br>
        * <b>npm run dev</b>
<br><br>

<b>Your app will be up and running at localhost:3000</b>
