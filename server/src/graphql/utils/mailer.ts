import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

async function createTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 25,
      secure: false,
      auth: {
        user: 'mailerceshi@163.com',
        pass: 'motao123456'
      }
    })
  }
  try {
    await transporter.verify()
  } catch (error) {
    return new Error('连接邮件服务器失败')
  }
}
/**
 * 发送重置密码邮件
 * @param address
 * @param url 
 * @returns 
 */
export async function sendRestEmail(address: string, url: string) {
  try {
    await createTransporter()
    const email = {
      from: '"夏至 重置密码"<mailerceshi@163.com>',
      to: address,
      subject: '重置密码',
      html: `
        <p>夏至多语言词库平台密码重置</p>
        <p><span>点击</span><a href="${url}">${url}</a><span>重置密码</span></p>
      `
    }
    await transporter.sendMail(email)
    return true
  } catch (error) {
    return false
  }
}
