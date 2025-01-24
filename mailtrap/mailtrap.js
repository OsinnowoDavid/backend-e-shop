import { MailerSend } from "mailersend"
import { Recipient } from "mailersend"
import { EmailParams } from "mailersend"
const mailersend = new mailersend({
  apikey:"mlsn.437324b8a20facce120c7d8ea25e1c4f4409ebad9108969c521979e9c33d2b4d"
})
const recipients = [new Recipient ("davidadewale151@gmail.com", "Recipient")]

const emailparems = EmailParams()
.set0