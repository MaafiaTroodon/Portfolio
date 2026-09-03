import { test, expect } from "@playwright/test";

test.describe("Professional portfolio", () => {
  test("loads without browser runtime errors", async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    await page.goto("/");
    await page.waitForTimeout(1000);
    expect(runtimeErrors).toEqual([]);
  });

  test("renders the updated positioning, education, and experience hierarchy", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Software Developer & Systems Analyst/);
    await expect(page.getByRole("heading", { name: "Malhar Datta Mahajan" })).toBeVisible();
    await expect(page.getByText("Software Developer • Systems & Data Analyst • IT Support")).toBeVisible();
    await expect(page.getByText("Expected May 2027")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Computer Science at Dalhousie" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Software & Backend Development" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Systems & Low-Level Computing" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Data, Databases & Analysis" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Computer Science Foundations" })).toBeVisible();
    await expect(page.getByText("Learning in Practice")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Systems & Data Analyst Co-op" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Student Support Desk Technician" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Help Desk & Front Desk Assistant" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Classroom Technology Support" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Back End Developer / Backend Team Lead" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Community Safety Team Member" })).toBeVisible();
    await expect(page.getByTestId("experience-entry")).toHaveCount(6);
    await expect(page.getByAltText("MyWorship logo")).toBeVisible();
    await expect(page.getByRole("heading", { name: "I like building things that have to work in the real world." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Aramark Canada" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Butcher’s Block Bar and Grill" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "KFC", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "McDonald’s" })).toBeVisible();
    await expect(page.getByTestId("earlier-experience")).toHaveCount(4);
  });

  test("uses a photo-first Portucana layout with concrete data work", async ({ page }) => {
    await page.goto("/#about");
    const carousel = page.getByRole("region", { name: "Portucana professional photos" });
    const roleHeading = page.getByRole("heading", { name: "Systems & Data Analyst Co-op" });
    const carouselComesFirst = await page.evaluate(() => {
      const media = document.querySelector('[aria-label="Portucana professional photos"]');
      const heading = Array.from(document.querySelectorAll("h4")).find((item) => item.textContent === "Systems & Data Analyst Co-op");
      return Boolean(media && heading && media.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(carouselComesFirst).toBe(true);
    await expect(carousel).toBeVisible();
    await expect(roleHeading).toBeVisible();
    await expect(page.getByText("Worked directly with Portucana’s CFO and owner to understand how the business operated, discuss problems in existing processes, and turn those needs into internal systems, reporting, automation, and Microsoft 365 solutions.")).toBeVisible();
    await expect(page.getByText(/QuickBooks Online data, Power Query, Excel, and Power BI/)).toBeVisible();
    await expect(page.getByText(/RAG-based information retrieval/)).toBeVisible();
  });

  test("shows the animated SharePoint data preview above the Portucana role details", async ({ page }) => {
    await page.goto("/experience/portucana");
    const dataPreview = page.getByLabel("Animated SharePoint operational data preview");
    await expect(dataPreview).toBeVisible();
    await expect(dataPreview.getByRole("table", { name: "Illustrative time-off request records" })).toBeVisible();
    const previewComesFirst = await page.evaluate(() => {
      const preview = document.querySelector('[aria-label="Animated SharePoint operational data preview"]');
      const date = Array.from(document.querySelectorAll("p")).find((item) => item.textContent === "May 2026 – August 2026");
      return Boolean(preview && date && preview.compareDocumentPosition(date) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(previewComesFirst).toBe(true);
  });

  test("previews both Portucana certificates without navigating away", async ({ page, context }) => {
    await page.goto("/#about");
    const originalUrl = page.url();
    const awesomenessButton = page.getByRole("button", { name: "Certificate of Awesomeness", exact: true });
    await awesomenessButton.scrollIntoViewIfNeeded();
    await awesomenessButton.click();
    const imageDialog = page.getByRole("dialog", { name: "Certificate of Awesomeness" });
    await expect(imageDialog).toBeVisible();
    await expect(imageDialog.getByAltText("Certificate of Awesomeness awarded to Malhar Mahajan.")).toHaveClass(/rotate-90/);
    expect(page.url()).toBe(originalUrl);
    expect(context.pages()).toHaveLength(1);
    await imageDialog.getByRole("button", { name: "Close certificate preview" }).click();
    await expect(imageDialog).toBeHidden();
    await expect(awesomenessButton).toBeFocused();

    const appreciationButton = page.getByRole("button", { name: "Certificate of Appreciation", exact: true });
    await appreciationButton.click();
    const pdfDialog = page.getByRole("dialog", { name: "Certificate of Appreciation" });
    await expect(pdfDialog).toBeVisible();
    await expect(pdfDialog.getByTitle("Certificate of Appreciation PDF preview")).toHaveAttribute("src", /Appriciation%20certificate\.pdf#view=FitH/);
    expect(page.url()).toBe(originalUrl);
    expect(context.pages()).toHaveLength(1);
    await page.keyboard.press("Escape");
    await expect(pdfDialog).toBeHidden();
    await expect(appreciationButton).toBeFocused();
  });

  test("places Beyond the Screen directly after Projects and before Resume", async ({ page }) => {
    await page.goto("/");
    const orderingIsCorrect = await page.evaluate(() => {
      const projects = document.querySelector("#projects");
      const beyond = document.querySelector("#beyond-screen");
      const resume = document.querySelector("#resume");
      if (!projects || !beyond || !resume) return false;
      return Boolean(
        projects.compareDocumentPosition(beyond) & Node.DOCUMENT_POSITION_FOLLOWING
        && beyond.compareDocumentPosition(resume) & Node.DOCUMENT_POSITION_FOLLOWING,
      );
    });
    expect(orderingIsCorrect).toBe(true);
    await expect(page.getByRole("region", { name: "Tennis photos" })).toBeVisible();
  });

  test("shows a personal tennis story with all three photos and carousel controls", async ({ page }) => {
    await page.goto("/");
    const carousel = page.getByRole("region", { name: "Tennis photos" });
    await carousel.scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "Tennis has always been part of my life." })).toBeVisible();
    await expect(page.getByText(/Tennis has been part of my life since I was a kid/)).toBeVisible();
    await expect(page.getByText(/I now work at HEADStart Tennis Centre/)).toBeVisible();
    await expect(carousel.getByRole("button", { name: "Show image 3: Still Playing" })).toBeVisible();
    await carousel.hover();
    await carousel.getByRole("button", { name: "Show image 3: Still Playing" }).click();
    await expect(carousel.getByAltText(/standing with another player and their rackets/)).toBeVisible();
    await carousel.getByRole("button", { name: "Show image 2: On Court" }).click();
    await expect(carousel.getByAltText(/competitive tennis match/)).toBeVisible();
  });

  test("publishes all project actions", async ({ page }) => {
    await page.goto("/#projects");
    const expectedLinks = [
      "https://bullishai.netlify.app/",
      "https://github.com/MaafiaTroodon/BullishAI",
      "https://youtu.be/EM9nBk9edVA",
      "https://flexbeatsx.netlify.app",
      "https://github.com/MaafiaTroodon/FlexBeats",
      "https://maafiatroodon.itch.io/urban-swat-platformer",
      "https://github.com/MaafiaTroodon/UrbanSWAT-Platformer",
      "https://malhar999clone.netlify.app/",
      "https://github.com/MaafiaTroodon/Apple_Website_Clone",
      "https://chem-ar-production.up.railway.app/",
      "https://github.com/MaafiaTroodon/chem-ar",
      "https://github.com/MaafiaTroodon/QuickTutor",
      "https://fancy-lollipop-fcb73b.netlify.app/",
      "https://github.com/MaafiaTroodon/interactive-portfolio",
    ];

    for (const href of expectedLinks) {
      const link = page.locator(`a[href="${href}"]`);
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  test("restores BullishAI as a photo-first carousel with real application screens", async ({ page }) => {
    await page.goto("/#projects");
    const carousel = page.getByRole("region", { name: "BullishAI project screenshots" });
    await expect(carousel).toBeVisible();
    await expect(carousel.getByAltText(/BullishAI home page/)).toBeVisible();
    await expect(carousel.locator('button[aria-label^="Show image "]')).toHaveCount(7);
    await expect(carousel.getByRole("button", { name: "Show image 7: Stock Watchlist" })).toBeVisible();
    await carousel.hover();
    await carousel.getByRole("button", { name: "Show image 2: AI Market Signals" }).click();
    await expect(carousel.getByAltText(/market signals dashboard/)).toBeVisible();
  });

  test("advances BullishAI and tennis every three seconds", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(1, 1);
    const tennisCarousel = page.getByRole("region", { name: "Tennis photos" });
    const bullishCarousel = page.getByRole("region", { name: "BullishAI project screenshots" });
    await expect(tennisCarousel).toHaveAttribute("data-active-index", "0");
    await expect(bullishCarousel).toHaveAttribute("data-active-index", "0");
    await expect(bullishCarousel).toHaveAttribute("data-active-index", "1", { timeout: 5000 });
    await expect(tennisCarousel).toHaveAttribute("data-active-index", "1", { timeout: 5000 });
  });

  test("allows manual Portucana carousel navigation", async ({ page }) => {
    await page.goto("/#about");
    const carousel = page.getByRole("region", { name: "Portucana professional photos" });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.hover();
    await carousel.getByRole("button", { name: /Show image 1:/ }).click();
    await expect(carousel.getByAltText(/holding a co-op recognition certificate/)).toBeVisible();
    await carousel.getByRole("button", { name: /Show image 2:/ }).click();
    await expect(carousel).toHaveAttribute("data-active-index", "1");
    await expect(carousel.getByAltText(/visiting a Portucana construction project/)).toBeVisible();
  });

  test("runs the Portucana slideshow continuously every three seconds, including while hovered", async ({ page }) => {
    await page.goto("/#about");
    const carousel = page.getByRole("region", { name: "Portucana professional photos" });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.hover();
    await carousel.getByRole("button", { name: /Show image 2:/ }).click();
    await carousel.getByRole("button", { name: /Show image 1:/ }).click();
    await expect(carousel).toHaveAttribute("data-active-index", "0");
    await expect(carousel).toHaveAttribute("data-active-index", "1", { timeout: 5000 });
    await expect(carousel.getByAltText(/visiting a Portucana construction project/)).toBeVisible();
    await expect(carousel).toHaveAttribute("data-active-index", "2", { timeout: 5000 });
    await expect(carousel.getByAltText(/with Portucana team members/)).toBeVisible();
  });

  test("advances the MyWorship carousel automatically every three seconds", async ({ page }) => {
    await page.goto("/");
    await page.mouse.move(1, 1);
    const carousel = page.getByRole("region", { name: "MyWorship platform media" });
    await expect(carousel).toHaveAttribute("data-active-index", "0");
    await expect(carousel).toHaveAttribute("data-active-index", "1", { timeout: 5000 });
    await expect(carousel.getByAltText(/administrator dashboard/)).toBeVisible();
  });

  test("presents MyWorship as a wide technical experience with ordered media and a reusable certificate dialog", async ({ page, context }) => {
    await page.goto("/#about");
    const experience = page.locator('[data-experience="myworship"]');
    const carousel = experience.getByRole("region", { name: "MyWorship platform media" });
    await expect(experience).toBeVisible();
    await expect(carousel.getByAltText(/Mobile MyWorship dashboard/)).toBeVisible();
    await expect(carousel.getByRole("button", { name: "Show image 2: Admin Dashboard" })).toBeVisible();
    await expect(carousel.getByRole("button", { name: "Show image 3: Recognition & Completion" })).toBeVisible();

    await carousel.hover();
    await carousel.getByRole("button", { name: "Show image 2: Admin Dashboard" }).click();
    await expect(carousel.getByAltText(/administrator dashboard/)).toBeVisible();
    await carousel.getByRole("button", { name: "Show image 3: Recognition & Completion" }).click();
    await expect(carousel.getByAltText(/appreciation letter/)).toBeVisible();

    const originalUrl = page.url();
    const certificateButton = experience.getByRole("button", { name: "View Certificate" });
    await certificateButton.click();
    const dialog = page.getByRole("dialog", { name: "MyWorship Recognition & Completion" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByAltText(/appreciation letter/)).not.toHaveClass(/rotate-90/);
    expect(page.url()).toBe(originalUrl);
    expect(context.pages()).toHaveLength(1);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(certificateButton).toBeFocused();
  });

  test("groups the four earlier customer roles in one blue hospitality panel", async ({ page }) => {
    await page.goto("/#about");
    const hospitality = page.getByTestId("hospitality-experience");
    await expect(hospitality).toBeVisible();
    await expect(hospitality).toHaveClass(/from-blue-950/);
    await expect(hospitality.getByTestId("earlier-experience")).toHaveCount(4);
  });

  test("opens the Portucana case study and exposes certificate actions", async ({ page }) => {
    await page.goto("/");
    const caseStudyLink = page.locator('a[href="/experience/portucana"]');
    await caseStudyLink.scrollIntoViewIfNeeded();
    await Promise.all([
      page.waitForURL(/\/experience\/portucana$/),
      caseStudyLink.click(),
    ]);
    await expect(page.getByRole("heading", { level: 1, name: "Systems & Data Analyst Co-op" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How the system came together" })).toBeVisible();
    await expect(page.getByText("From spotting an internal process problem to designing and building the system that replaced it.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Before there was an app, there was a problem." })).toBeVisible();
    await expect(page.getByRole("button", { name: "Certificate of Awesomeness" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Certificate of Appreciation" })).toBeVisible();

    const architecturePreview = page.getByRole("button", { name: "Enlarge Main Request Processing Workflow" });
    await architecturePreview.scrollIntoViewIfNeeded();
    await architecturePreview.click();
    await expect(page.getByRole("dialog", { name: "Main Request Processing Workflow" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Main Request Processing Workflow" })).toBeHidden();

    const certificateButton = page.getByRole("button", { name: "Certificate of Awesomeness" });
    await certificateButton.click();
    await expect(page.getByRole("dialog", { name: "Certificate of Awesomeness" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(certificateButton).toBeFocused();
  });

  test("keeps the slideshow running with instant transitions when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#about");
    const carousel = page.getByRole("region", { name: "Portucana professional photos" });
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel).toHaveAttribute("data-active-index", "0");
    await expect(carousel).toHaveAttribute("data-active-index", "1", { timeout: 5000 });
    await expect(carousel.getByAltText(/visiting a Portucana construction project/)).toBeVisible();
  });

  test("keeps the mobile homepage within the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("resume controls are manual", async ({ page }) => {
    await page.goto("/#resume");
    const openResume = page.getByRole("link", { name: "Open Resume" });
    const downloadResume = page.getByRole("link", { name: "Download PDF" });
    await expect(openResume).toHaveAttribute("href", "/Data_Analyst%20_Resume.pdf");
    await expect(downloadResume).toHaveAttribute("download", "");

    await page.getByRole("button", { name: "Software Resume" }).click();
    await expect(openResume).toHaveAttribute("href", "/Software_Resume.pdf");
    await expect(downloadResume).toHaveAttribute("href", "/Software_Resume.pdf");
  });
});
