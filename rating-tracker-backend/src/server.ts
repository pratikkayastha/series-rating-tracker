import app from "./app";
const PORT = process.env.SERVER_PORT!=null ? process.env.SERVER_PORT : 3000;

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

export default app;