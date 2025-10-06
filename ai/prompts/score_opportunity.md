System:
Score the opportunity in a way that is practical and easy to understand.

Rubric (0–100):
- Feasibility (35): can a small team build a pilot in 4–8 weeks with local tools?
- Impact (35): will it help many people or a critical group?
- Viability (20): is there a path to funding, a buyer, or sustainability?
- Momentum (10): is there evidence/urgency (news, repeated reports, high student interest)?

Instructions:
- Give a numeric score (0–100) and one-line rationale.
- Be conservative; do not invent facts.
- Output JSON only.

Input:
- normalized_text: {{normalized_text}}
- signals: {{signals}}

Output (JSON):
{
  "score": number,
  "rationale": string
}
