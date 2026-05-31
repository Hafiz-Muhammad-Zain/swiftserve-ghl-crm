// Parses OpenAI response and extracts score/tier/recommendation
// Strips markdown code blocks that OpenAI sometimes returns

const data = $input.first().json;
const raw = data.output[0].content[0].text;
const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
const parsed = JSON.parse(clean);

return {
  score: parsed.score,
  tier: parsed.tier,
  recommendation: parsed.recommendation,
  contact_id: $('Webhook').first().json.body.id
};
