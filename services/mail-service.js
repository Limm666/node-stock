import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';
import email_notify from '../middlewares/email_notify'


exports.mailNotifier = async (recipient, subject,stockInfo)=>{
    let code = stockInfo.code;
    let data =`
        <html>
        <head>
        <title>${subject}</title>
        </head>
        <body>
            <h1>主题：${code}异常，请关注</h1>
        </body>
        </html>`
   await email_notify(recipient,subject,data)
}