import asyncio
import time
from playwright import async_api
from playwright.async_api import expect


TARGET_URL = "https://green-salmon-152072.hostingersite.com"


async def run_test():
    pw = None
    browser = None
    context = None

    try:
        pw = await async_api.async_playwright().start()
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process",
            ],
        )
        context = await browser.new_context(viewport={"width": 1280, "height": 720})
        context.set_default_timeout(20000)
        page = await context.new_page()

        await page.goto(TARGET_URL, wait_until="domcontentloaded")

        await expect(page.locator(".brand img")).to_be_visible()
        await expect(page.get_by_role("heading", name="Encuentra el Entire® ideal para ti")).to_be_visible()
        await expect(page.get_by_role("link", name="Comprar Ahora")).to_be_visible()
        await expect(page.get_by_role("link", name="Descubre cual Entire® es para ti")).to_be_visible()

        await page.get_by_role("link", name="Descubre cual Entire® es para ti").first.click()
        await expect(page.get_by_role("heading", name="¿Qué Entire® es para ti?")).to_be_visible()

        await expect(page.locator("label").filter(has_text="¿Qué edad tienes?")).to_be_visible()
        await expect(page.locator("label").filter(has_text="¿Cuál es tu objetivo?")).to_be_visible()
        await expect(page.locator("label").filter(has_text="¿Realizas actividad física?")).to_be_visible()
        await expect(page.locator("label").filter(has_text="¿Tienes alguna condición especial?")).to_be_visible()

        await page.locator("#age").select_option("master")
        await page.locator("#goal").select_option("master")
        await page.locator("#activity").select_option("high")
        await page.locator("#condition").select_option("none")

        await expect(page.locator("#result-name")).to_contain_text("Entire® Master")
        await expect(page.locator("#result-reason")).to_be_visible()
        await expect(page.locator("#result-action")).to_be_visible()
        await expect(page.locator("#result-link")).to_be_visible()

        unique_email = f"testsprite-vive-entire-{int(time.time())}@example.com"
        await page.locator("#lead-name").fill("Test Usuario")
        await page.locator("#lead-email").fill(unique_email)
        await page.locator("#lead-consent").check()
        await page.get_by_role("button", name="Suscribirme").click()
        await expect(page.locator("#newsletter-status")).to_contain_text(
            "Listo. Te suscribiste correctamente."
        )

        await page.set_viewport_size({"width": 390, "height": 844})
        await page.wait_for_timeout(800)

        mobile_bar = page.locator(".mobile-sticky-cta")
        await expect(mobile_bar).to_be_visible()
        await expect(mobile_bar.get_by_role("link", name="Comprar Entire®")).to_be_visible()
        await expect(mobile_bar.get_by_role("link", name="Descubrir mi fórmula")).to_be_visible()

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()


asyncio.run(run_test())
