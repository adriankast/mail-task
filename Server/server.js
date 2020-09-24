const mongoose = require("mongoose")
const express = require("express")
const config = require("./config.js")
const mailClient = require("node-mail-client")
const credentials = require("./auth.js")
const imaps = require("imap-simple")
const Imap = require("node-imap"),
    inspect = require("util").inspect

const auth = credentials.imap
const smtp = credentials.smtp


const imap = new Imap({
    user: auth.user,
    password: auth.pass,
    host: auth.imap[0],
    port: 993,
    tls: true
})

function openInbox(cb) {
    imap.openBox("INBOX", true, cb)
}



imap.once("error", function(err) {
    console.error(err)
})

imap.once("end", function() {
    console.log("Imap Connection ended")
})

// imap.connect()


// these methods all returned promise
// checkAuth will auto invoke and it will check smtp auth

const mail = new mailClient(smtp)
// pass checkAuth check
// mail.check=1  // 0: init  1:pass  2:fail
/* // receive
mail.receive("1:10").then(result=>{
    // do something
    console.log(result.toString())
}).catch(err=>{
    console.log(err)
}) */

// send
// mail.send({ to:"adriankast@hotmail.de", subject:"Test", text:"asdf", html:"html" }).then(info=>{console.log(info)})
//    .catch(console.error)


// send or receive


// Server setup
const server = express()

server.use(express.json())
server.use((req, res, next) => {
    if (config.allowHosts.some( allowName => (allowName === req.headers.origin))) {
        res.header("Access-Control-Allow-Origin", req.headers.origin)
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    }

    next()
})

/**
 * fetch all existing mails
 */
server.get("/mails", function (req, res) {
    console.log("read mails: ")
    const myMails = []
    imap.once("ready", function() {
        openInbox(function(err, box) {
            if (err) throw err
            const f = imap.seq.fetch("1:3", {
                bodies: "HEADER.FIELDS (FROM TO SUBJECT DATE)",
                struct: true
            })
            f.on("message", function(msg, seqno) {
                console.log("Message #%d", seqno)
                const prefix = "(#" + seqno + ") "
                msg.on("body", function(stream, info) {
                    let buffer = ""
                    stream.on("data", function(chunk) {
                        buffer += chunk.toString("utf8")
                    })
                    stream.once("end", function() {
                        const myheader = Imap.parseHeader(buffer)
                        console.log(prefix + "Parsed header: %s", inspect(myheader))
                        myMails.push(myheader)
                    })
                })
                msg.once("attributes", function(attrs) {
                    console.log(prefix + "Attributes: %s", inspect(attrs, false, 8))
                })
                msg.once("end", function() {
                    console.log(prefix + "Finished")
                })
            })
            f.once("error", function(newerr) {
                console.log("Fetch error: " + newerr)
            })
            f.once("end", function() {
                console.log("Done fetching all messages!")
                imap.end()
                res.status(200).send(myMails)
            })
        })
    })
    imap.connect()
})

server.get("/mails/:id", function (req, res) {
    console.log("read one mail: ", req.params.id)
    res.status(200).send()
    // TODO: fetch one mail details
})

/**
 * send a new mail
 */
server.post("/mails", function (req, res) {
    console.log("write mail: ", req.body)
    mail.send({ to: req.body.to, subject: req.body.subject, text: req.body.text, html: req.body.html }).then( info => {
        console.log(info)
    }, err => console.error(err))
    res.status(200).send()
})

// go live
server.listen(config.serverPort, () => {
    console.log("Server started on Port ", config.serverPort)
    console.log("http://localhost:" + config.serverPort)
})

