from django.views.decorators.http import require_GET
from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
import logging
import re
from openai import OpenAI

logger = logging.getLogger(__name__)

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def clean_ai_text(text: str) -> str:
    """Clean AI output by removing markdown, emojis, and extra spaces."""
    if not text:
        return ""
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\*(.*?)\*", r"\1", text)
    text = re.sub(r"[\U0001F300-\U0001FAFF\u2600-\u27BF]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


@require_GET
def search_view(request):
    query = request.GET.get("q", "").strip()
    if not query:
        return JsonResponse({"error": "Missing query parameter 'q'."}, status=400)

    # ✅ Only allow menstrual or hygiene-related topics
    menstrual_keywords = [
        "menstrual", "period", "hygiene", "puberty", "pads", "tampons", "cramps",
        "menstruation", "menstrual cup", "flow", "sanitation", "school", "wash",
        "cycle", "reproductive health", "menstrual hygiene", "menstrual health",
        "period pain", "pain relief", "period care", "period hygiene"
    ]

    if not any(word in query.lower() for word in menstrual_keywords):
        return JsonResponse({
            "query": query,
            "allowed": False,
            "message": "This search topic is outside menstrual health and hygiene education. "
                       "Please ask about periods, menstrual care, puberty, or hygiene."
        }, status=403)

    cache_key = f"search:{query.lower()}"
    cached = cache.get(cache_key)
    if cached:
        return JsonResponse({"query": query, **cached, "cached": True})

    results = []
    summary = ""

    # 🧠 1) Generate a main AI summary (teacher tone)
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a friendly health educator writing for girls aged 10–16. "
                        "Write in a gentle, natural, and clear tone — like a nurse or teacher. "
                        "Avoid complex medical terms, markdown, or emojis."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Explain clearly and kindly about '{query}'. "
                        "Keep it under 100 words and finish with a short encouraging message."
                    ),
                },
            ],
            temperature=0.6,
            max_tokens=220,
        )
        summary = clean_ai_text(completion.choices[0].message.content.strip())
    except Exception as e:
        logger.warning("AI summary generation failed: %s", e, exc_info=True)
        summary = "We couldn’t generate a summary right now. Please try again later."

    # 🩸 2) Generate 3–4 short educational cards
    try:
        card_prompt = (
            f"Create 3 to 4 short educational lessons (each 3–5 sentences) about '{query}'. "
            f"Each lesson should focus on a single topic — meaning, hygiene, tips, or comfort. "
            f"Write in plain English that 13-year-old girls can understand. "
            f"Use a calm, caring tone. Return each card separated by '---'."
        )

        card_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a menstrual health educator writing for teens."},
                {"role": "user", "content": card_prompt},
            ],
            temperature=0.7,
            max_tokens=450,
        )

        ai_cards = clean_ai_text(card_response.choices[0].message.content.strip()).split("---")

        # Attach trusted references for "Read More"
        trusted_links = [
            {
                "title": "WHO: Menstrual Health Overview",
                "url": "https://www.who.int/health-topics/menstrual-health",
                "source": "World Health Organization",
            },
            {
                "title": "World Bank: Menstrual Hygiene in Schools",
                "url": "https://data360.worldbank.org/en/indicator/WB_GS_SG_MHG_PPDP_ZS",
                "source": "World Bank Data",
            },
            {
                "title": "PubMed: Menstrual Health Studies",
                "url": "https://pubmed.ncbi.nlm.nih.gov/?term=menstrual+health",
                "source": "PubMed",
            },
        ]

        for i, text in enumerate(ai_cards[:4]):
            link = trusted_links[i % len(trusted_links)]
            results.append({
                "title": f"{query.capitalize()} – Lesson {i + 1}",
                "snippet": text.strip(),
                "source": link["source"],
                "url": link["url"],
                "type": "educational",
                "published": None,
            })

    except Exception as e:
        logger.warning("AI card generation failed: %s", e)
        results = []

    # 🧹 3) Deduplicate & cache
    seen = set()
    deduped = []
    for item in results:
        if item["url"] not in seen:
            deduped.append(item)
            seen.add(item["url"])

    response_data = {
        "query": query,
        "allowed": True,
        "summary": summary,
        "results": deduped,
    }

    cache.set(cache_key, response_data, 60 * 60)  # Cache for 1 hour
    return JsonResponse(response_data)
