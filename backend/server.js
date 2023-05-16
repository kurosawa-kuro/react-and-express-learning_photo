// path: backend\server.js

import app from "./src/app/index.js";

const port = process.env.PORT || 8080;

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
