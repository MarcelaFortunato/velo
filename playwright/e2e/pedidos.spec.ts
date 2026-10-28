import { test, expect } from '@playwright/test';

///AAA - Arrange, Act e Assert
///PAV - Preparar, Agir e Verificar

test('de consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-EYECJI');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  const containerPedido = page.getByRole('paragraph')
  .filter({ hasText: /^Pedido$/ })
  .locator('..') //Sobe para o elemento pai (a div agrupa ambos)

  await expect(containerPedido).toContainText('VLO-EYECJI', {timeout: 10_000});

  await expect(page.getByText('APROVADO')).toBeVisible();
  
});