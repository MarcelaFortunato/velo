import { test } from '@playwright/test'
import { generateOrderCode } from '../support/helpers';
import { Navbar } from '../support/components/Navbar';
import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'

///AAA - Arrange, Act e Assert
///PAV - Preparar, Agir e Verificar

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-EYECJI',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Marcela Fortunato',
        email: 'marcela@velo.com.br'
      },
      payment: 'À Vista'
    };

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-LEUSXD',
      status: 'REPROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    };

   await orderLockupPage.searchOrder(order.number)
   await orderLockupPage.validateOrderDetails(order)
   await orderLockupPage.validateStatusBadge(order.status)
 })

 test('deve consultar um pedido em analise', async ({ page }) => {
  const order: OrderDetails = {
      number: 'VLO-TD0A52',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Martina Ferrari',
        email: 'martina@ferrari.com'
      },
      payment: 'À Vista'
    };

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()
    
    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })

    test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await orderLockupPage.searchOrder(orderCode)
    await orderLockupPage.validateOrderNotFound()
  })
})