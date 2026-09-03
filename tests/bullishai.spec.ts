import { expect, test } from "@playwright/test";

test.describe("BullishAI engineering case study", () => {
  test("hydrates without missing route chunks and mounts the animated rings background", async ({ page }) => {
    const failedChunks: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400 && response.url().includes("/_next/static/chunks/")) failedChunks.push(`${response.status()} ${response.url()}`);
    });
    page.on("requestfailed", (request) => {
      if (request.url().includes("/_next/static/chunks/")) failedChunks.push(request.url());
    });

    await page.goto("/projects/bullishai");
    await expect(page.getByRole("heading", { level: 1, name: "BullishAI" })).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(1, { timeout: 10000 });
    expect(failedChunks).toEqual([]);
  });

  test("homepage CTA opens the dedicated case study and preserves project actions", async ({ page }) => {
    await page.goto("/#projects");
    const caseStudyLink = page.locator('a[href="/projects/bullishai"]');
    await expect(caseStudyLink).toHaveText(/Explore Full Case Study/);
    await Promise.all([
      page.waitForURL(/\/projects\/bullishai$/),
      caseStudyLink.click(),
    ]);

    await expect(page.getByRole("heading", { level: 1, name: "BullishAI" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Live Project" }).first()).toHaveAttribute("href", "https://bullishai.netlify.app/");
    await expect(page.locator('a[href="https://github.com/MaafiaTroodon/BullishAI"]').first()).toHaveAccessibleName("GitHub");
    await expect(page.getByRole("link", { name: "Watch Demo" }).first()).toHaveAttribute("href", "https://youtu.be/EM9nBk9edVA");
    await expect(page.getByTitle("BullishAI product deep-dive video")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/EM9nBk9edVA");
  });

  test("provides stage navigation and the complete engineering timeline", async ({ page }) => {
    await page.goto("/projects/bullishai");
    await expect(page.locator("[data-bullish-stage]")).toHaveCount(12);
    await expect(page.locator('#stage-03')).toContainText("One market view, many data providers");
    await expect(page.locator('#stage-06')).toContainText("The model does not fetch market data by itself");
    await expect(page.locator('#stage-08')).toContainText("Live value without rewriting cost basis");
    await expect(page.locator('a[href="#stage-12"]').last()).toBeVisible();
  });

  test("supports manual carousel controls and the shared image lightbox", async ({ page }) => {
    await page.goto("/projects/bullishai");
    const carousel = page.getByRole("region", { name: "BullishAI product tour" });
    await carousel.getByRole("button", { name: "Show image 2: USA & Canada Markets" }).click();
    await expect(carousel).toHaveAttribute("data-active-index", "1");
    await carousel.getByRole("button", { name: "Enlarge USA & Canada Markets" }).click();
    await expect(page.getByRole("dialog", { name: "USA & Canada Markets" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "USA & Canada Markets" })).toBeHidden();
  });

  test("places the walkthrough directly after the hero and advances images every three seconds", async ({ page }) => {
    await page.goto("/projects/bullishai");
    const walkthrough = page.getByRole("heading", { name: "See BullishAI in action" });
    const productTour = page.getByRole("heading", { name: "One product, several connected views" });
    await expect(walkthrough).toBeVisible();
    expect(await walkthrough.evaluate((heading, nextHeading) => Boolean(heading.compareDocumentPosition(nextHeading as Node) & Node.DOCUMENT_POSITION_FOLLOWING), await productTour.elementHandle())).toBe(true);

    const chart = page.getByLabel("Interactive illustrative bullish candlestick chart");
    await expect(chart).toBeVisible();
    await chart.getByRole("button", { name: /Candle 1/ }).hover();
    await expect(chart).toContainText("+1.2%");

    const carousel = page.getByRole("region", { name: "BullishAI product tour" });
    await carousel.getByRole("button", { name: "Show image 1: BullishAI Home" }).click();
    await expect(carousel).toHaveAttribute("data-active-index", "0");
    await expect(carousel).toHaveAttribute("data-active-index", "1", { timeout: 4200 });
  });

  test("keeps the case study within a mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/projects/bullishai");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.getByRole("navigation", { name: "BullishAI case study stages" })).toBeVisible();
  });
});
