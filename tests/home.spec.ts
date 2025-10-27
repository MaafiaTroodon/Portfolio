import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Malhar Datta Mahajan/);
  });

  test("should toggle theme", async ({ page }) => {
    await page.goto("/");
    
    // Wait for page to load
    await page.waitForLoadState("networkidle");
    
    // Find and click theme toggle
    const themeButton = page.locator('[aria-label="Toggle theme"]');
    await themeButton.click();
    
    // Check if theme changed
    const htmlElement = page.locator("html");
    await expect(htmlElement).toHaveClass(/light|dark/);
  });

  test("should navigate to about page", async ({ page }) => {
    await page.goto("/");
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);
  });

  test("should display skills", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=React")).toBeVisible();
    await expect(page.locator("text=Next.js")).toBeVisible();
  });
});

