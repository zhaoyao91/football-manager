import { Accounts } from 'meteor/accounts-base'
import { prop } from 'lodash/fp'
import { Meteor } from 'meteor/meteor'

export default function () {
  Accounts.emailTemplates.siteName = Meteor.settings.emailTemplates.siteName
  Accounts.emailTemplates.from = Meteor.settings.emailTemplates.from

  Accounts.emailTemplates.resetPassword = {
    subject: () => '重置密码',
    html: (user, url) => `
      <p>您好，亲爱的足球管家用户：</p>
      <p>请点击以下链接或复制链接到浏览器以重置密码（如非本人操作请忽略）</p>
      <p>
        <a href="${url}">${url}</a>
      </p>
    `
  }
}