import { expect, test } from "@playwright/test";

test.describe("Primary navigation", () => {
  test("links directly to Work Experience and exposes both case studies on hover", async ({ page }) => {
    await page.goto("/");

    const workExperienceLink = page.getByRole("link", { name: "Work Experience", exact: true });
    await expect(workExperienceLink).toBeVisible();
    await expect(workExperienceLink).toHaveAttribute("href", "/#work-experience");

    const caseStudiesButton = page.getByRole("button", { name: "Case Studies", exact: true });
    await caseStudiesButton.hover();
    const caseStudiesMenu = page.getByRole("menu", { name: "Case Studies" });
    await expect(caseStudiesMenu).toBeVisible();
    await expect(caseStudiesMenu.getByRole("menuitem", { name: /Systems & Data Analyst Co-op/ })).toHaveAttribute("href", "/experience/portucana");
    await expect(caseStudiesMenu.getByRole("menuitem", { name: /BullishAI/ })).toHaveAttribute("href", "/projects/bullishai");

    await workExperienceLink.click();
    await expect(page).toHaveURL(/#work-experience$/);
    await expect(page.locator("#work-experience")).toBeInViewport();
  });

  test("provides Work Experience and both case studies in the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();

    await expect(page.getByRole("link", { name: "Work Experience", exact: true })).toBeVisible();
    await expect(page.locator('a[href="/experience/portucana"]').filter({ hasText: "Portucana engineering case study" })).toBeVisible();
    await expect(page.locator('a[href="/projects/bullishai"]').filter({ hasText: "Independent engineering case study" })).toBeVisible();
  });

  test("keeps the full navigation available on both case-study routes", async ({ page }) => {
    for (const route of ["/projects/bullishai", "/experience/portucana"]) {
      await page.goto(route);
      const navbar = page.locator("nav.fixed").first();
      await expect(navbar.getByRole("link", { name: "Work Experience", exact: true })).toBeVisible();
      await expect(navbar.getByRole("button", { name: "Case Studies", exact: true })).toBeVisible();
      await expect(navbar.getByRole("link", { name: "GitHub", exact: true })).toBeVisible();
      await expect(navbar.getByRole("link", { name: "LinkedIn", exact: true })).toBeVisible();
    }
  });
});
