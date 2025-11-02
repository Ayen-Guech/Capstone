import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET

@csrf_exempt
@require_GET
def proxy_view(request):
    url = request.GET.get("url")
    if not url:
        return JsonResponse({"error": "Missing URL"}, status=400)

    # ✅ Get allowed domains from settings.py
    allowed_domains = getattr(settings, "ALLOWED_PROXY_DOMAINS", [])

    # ✅ Extract and validate domain
    domain = urlparse(url).netloc.lower()
    if not any(allowed in domain for allowed in allowed_domains):
        return JsonResponse(
            {"error": f"Domain '{domain}' not allowed."}, status=403
        )

    try:
        headers = {"User-Agent": "CycleSafeProxy/1.0"}
        response = requests.get(url, headers=headers, timeout=10)

        # ✅ Validate response type
        content_type = response.headers.get("Content-Type", "")
        if "text/html" not in content_type:
            return JsonResponse(
                {"error": f"Unsupported content type: {content_type}"},
                status=400,
            )

        soup = BeautifulSoup(response.text, "html.parser")

        # ✅ Remove unsafe/unnecessary sections
        for tag in soup(["script", "style", "header", "footer", "nav", "aside", "form", "noscript", "iframe"]):
            tag.decompose()

        # ✅ Extract main meaningful section
        main = soup.find("main") or soup.find("article") or soup.find("body") or soup

        # ✅ Ensure links open safely in new tabs
        for a in main.find_all("a", href=True):
            a["target"] = "_blank"
            a["rel"] = "noopener noreferrer"

        # ✅ Simple inline CSS for readability
        clean_html = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {{
                    font-family: 'Poppins', 'Segoe UI', sans-serif;
                    color: #333;
                    background-color: #fff;
                    line-height: 1.7;
                    padding: 1.5rem;
                    max-width: 850px;
                    margin: auto;
                }}
                h1, h2, h3 {{
                    color: #B00059;
                }}
                a {{
                    color: #D81B60;
                    text-decoration: none;
                }}
                a:hover {{
                    text-decoration: underline;
                }}
                img {{
                    max-width: 100%;
                    border-radius: 10px;
                    margin: 1rem 0;
                }}
            </style>
        </head>
        <body>
            {main.prettify()}
        </body>
        </html>
        """

        #  Build and return safe response
        res = HttpResponse(clean_html, content_type="text/html")
        res["X-Frame-Options"] = "ALLOWALL"  # allows iframe display
        res["Cache-Control"] = "no-store"
        res["Access-Control-Allow-Origin"] = "*"
        return res

    except requests.exceptions.Timeout:
        return JsonResponse({"error": "Request timed out"}, status=504)

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
