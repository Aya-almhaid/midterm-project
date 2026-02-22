import express from "express"

import { getAllMessages, createMessage, updateMessageStatus } from "../controllers/messages.Controller.js"
import { adminOnly } from "../middleware/admin.Middleware.js"

const router = express.Router()

router.get("/admin/messages", getAllMessages)

router.post("/message", createMessage)

router.put("/message/:id", updateMessageStatus)

export default router