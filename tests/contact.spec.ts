import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("should load contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Get In Touch");
  });

  test("should submit contact form", async ({ page }) => {
    await page.goto("/contact");
    
    // Fill form
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="subject"]', "Test Subject");
    await page.fill('textarea[name="message"]', "This is a test message");
    
    // Mock the API response
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator("text=Message sent successfully")).toBeVisible();
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/contact");
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator("text=Name must be at least")).toBeVisible();
  });
});

