import app from "./app.js";
import { connectDB } from "./db/connection.js";
connectDB()
    .then(() => {
    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000");
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map