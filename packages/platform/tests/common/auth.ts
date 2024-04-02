import type { Page } from '@playwright/test'

export const authPhone = '13512345678'
export const authPassword = 'zz123456'

export async function login(page: Page) {
  await page.goto('/login')
  await page.getByPlaceholder('请输入手机号').fill(authPhone)
  await page.getByPlaceholder('请输入密码').fill(authPassword)
  await page.getByText('登 录').click()
}
