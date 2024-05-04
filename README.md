***資料庫設定***

第一次run專案的時候，請到express -> .env內，把DB_USER, DB_PASSWORD, DB_DATABASE改成自己本機的資料


內的user, password 改成自己MySQL的使用者名稱和密碼。

database的部分，可以把'recippy'改成自己本地已經建立的資料庫名稱，只要確定這個資料庫是空的就好。

也可以用workbench建立一個空的資料庫，再把上面的名稱改成新建的資料庫名稱就好。

如果要用terminal來建立：
先用 cd 導航到database，假設你的檔案存在mac的桌面，指令會像：
% cd ~/Desktop/DB_Management/database

接著登入mysql
% mysql -u root
如果有密碼的話：
% mysql -u root -p 你的密碼

然後會跳到mysql的編譯器，接著執行
CREATE DATABASE recippy;
SOURCE users.sql
exit;

***後端伺服器開啟***

完成了之後再cd到express檔案夾
% cd ~/Desktop/DB_Management/express
% node app.js
後端就開始run了

***前端框架開啟***

前端的話是先cd到專案
% cd ~/Desktop/DB_Management

第一次跑的話要先安裝npm套件
% npm install

然後開啟前端框架
% npm run start
