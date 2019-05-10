import nodemailer from '../node_modules/nodemailer'
import mailConfig from '../config/mail_config'

var sendMail = async function (recipient, subject, data) {
    const smtTransport = nodemailer.createTransport({
        service: mailConfig.email.service,
        auth: {
            user: mailConfig.email.user,
            pass: mailConfig.email.pass
        }
    });
    await smtTransport.sendMail({
        from: mailConfig.email.user,
        to: recipient,
        subject: subject,
        html: data
    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        console.log('发送成功')
    });
}
module.exports = sendMail;
