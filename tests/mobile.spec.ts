import { expect, test, type Page } from "@playwright/test";

async function expectInsideViewport(page: Page, selector: string) {
  const result = await page.locator(selector).evaluateAll((elements) => {
    const viewportWidth = document.documentElement.clientWidth;
    return elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return style.display !== "none" && rect.width > 0;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, width: rect.width, viewportWidth };
      });
  });

  for (const box of result) {
    expect(box.left).toBeGreaterThanOrEqual(-1);
    expect(box.right).toBeLessThanOrEqual(box.viewportWidth + 1);
    expect(box.width).toBeLessThanOrEqual(box.viewportWidth + 1);
  }
}

test.describe("Site-wide mobile layout", () => {
  test("keeps every primary route inside narrow phone viewports", async ({ page }) => {
    for (const width of [320, 375, 430]) {
      await page.setViewportSize({ width, height: 844 });
      for (const route of ["/", "/experience/portucana", "/projects/bullishai"]) {
        await page.goto(route);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
        await expectInsideViewport(page, "main article, main [data-case-stage], main [data-bullish-stage]");
      }
    }
  });

  test("fits every homepage carousel image and both arrow controls at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");
    const carousels = page.locator('section[aria-roledescription="carousel"]');
    const count = await carousels.count();
    expect(count).toBeGreaterThanOrEqual(4);

    for (let index = 0; index < count; index += 1) {
      const carousel = carousels.nth(index);
      const box = await carousel.boundingBox();
      const previous = await carousel.getByRole("button", { name: "Show previous image" }).boundingBox();
      const next = await carousel.getByRole("button", { name: "Show next image" }).boundingBox();
      expect(box).not.toBeNull();
      expect(previous).not.toBeNull();
      expect(next).not.toBeNull();
      expect(previous!.x).toBeGreaterThanOrEqual(box!.x - 1);
      expect(next!.x + next!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
    }
  });

  test("keeps both case-study mobile media and the SharePoint records readable", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/projects/bullishai");
    const bullishCarousel = page.getByRole("region", { name: "BullishAI product tour" });
    await expect(bullishCarousel).toBeVisible();
    await expectInsideViewport(page, '[aria-label="BullishAI product tour"]');
    await bullishCarousel.getByRole("button", { name: /Enlarge/ }).click();
    await expectInsideViewport(page, '[role="dialog"]');
    await page.keyboard.press("Escape");

    await page.goto("/experience/portucana");
    const dataTable = page.getByRole("table", { name: "Illustrative time-off request records" });
    await expect(dataTable).toContainText("VR-0241");
    await expect(dataTable).toContainText("Employee A · Vacation");
    await expect(dataTable).toContainText("Approved");
    await expect(dataTable).toContainText("Rejected");
    await expect(dataTable.getByText("Rejected")).toHaveClass(/text-rose-200/);
    await expectInsideViewport(page, '[aria-label="Animated SharePoint operational data preview"]');
  });

  test("shows the complete mobile menu and uses iPhone-safe form controls", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("paragraph").filter({ hasText: /^Case Studies$/ })).toBeVisible();
    await expect(page.locator('a[href="/experience/portucana"]').filter({ hasText: "Systems & Data Analyst Co-op" })).toBeVisible();
    await expect(page.locator('a[href="/projects/bullishai"]').filter({ hasText: "BullishAI" })).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();

    await page.locator("#contact").scrollIntoViewIfNeeded();
    for (const control of [page.locator("#name"), page.locator("#email"), page.locator("#subject"), page.locator("#message")]) {
      await expect(control).toBeVisible();
      expect(await control.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
    }
  });
});
