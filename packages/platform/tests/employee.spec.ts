import { tableHeaderCell } from '@hjfc/playwright-utils'
import { test, expect, type Page } from '@playwright/test'

import { login } from './common/auth'

test.describe.configure({ mode: 'serial' })

let page: Page

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage()
  await login(page)
  const menu = page.locator('.ant-menu')
  await menu.getByText('员工管理').click()
  await expect(menu.getByText('员工管理')).toHaveCSS(
    'color',
    'rgb(0, 101, 254)',
  )
})

test.afterAll(async () => {
  page.close()
})

test.describe('employee management list page', () => {
  test('employee list', async () => {
    // 1. 新增按钮
    await expect(page.getByText('新增员工')).toBeAttached()
    // 2. 表头
    await expect(tableHeaderCell(page, '手机号')).toBeAttached()
    // 3. 分页器
    await expect(page.getByText(/共(.*)条记录/)).toBeAttached()
  })
})
