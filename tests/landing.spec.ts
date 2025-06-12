import { test, expect } from '@playwright/test';

test.describe('Landing Page and Event Route Tests', () => {
  test('landing page loads successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page loaded successfully
    await expect(page).toHaveTitle(/Hula/);
    
    // Check for main content elements
    await expect(page.locator('main')).toBeVisible();
  });

  test('event page loads successfully', async ({ page }) => {
    await page.goto('/event');
    
    // Check if the event page loaded successfully
    await expect(page).toHaveTitle(/Event/);
    
    // Check for event page specific content
    await expect(page.locator('main')).toBeVisible();
    
    // Add more specific assertions based on your event page content
    // For example:
    // await expect(page.locator('h1')).toContainText('Events');
  });

  test('navigation between landing and event pages works', async ({ page }) => {
    // Start at landing page
    await page.goto('/');
    
    // Find and click the event link/navigation
    // Note: Update the selector based on your actual navigation element
    await page.getByRole('link', { name: /event/i }).click();
    
    // Verify we're on the event page
    await expect(page).toHaveURL(/.*event/);
    
    // Navigate back to home
    await page.getByRole('link', { name: /home/i }).click();
    
    // Verify we're back on the landing page
    await expect(page).toHaveURL('/');
  });
}); 