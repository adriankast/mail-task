const development = {
    dbPath: "mongodb://127.0.0.1/demodesk",
    serverInfo: {
        name: "trialApp",
        version: "1.0.0"
    },
    serverPort: 8081,
    allowHosts: ["http://127.0.0.1:8080", "http://localhost:8080"]
}

const production = {
    // TODO:
}

module.exports = development