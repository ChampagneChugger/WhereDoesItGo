import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ fetch, request }) => {
        const form = await request.formData()

        let url: any = form.get("url")

        try {
            const res = await fetch(url)

            if (res.redirected) {
                const page = await fetch(res.url)
                const data = await page.text()

                return {
                    newUrl: res.url,
                    web_code: data
                }
            } else {
                const page = await res.text()

                return {
                    url: url,
                    web_code: page
                }
            }
        } catch {
            return {
                error: "This website does not exist."
            }
        }
    }
}